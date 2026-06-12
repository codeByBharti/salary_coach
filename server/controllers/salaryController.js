const Search = require('../models/Search');
const SalaryBenchmark = require('../models/SalaryBenchmark');

// ─────────────────────────────────────────
// HELPER — Get Experience Range Label
// ─────────────────────────────────────────
const getExperienceRange = (years) => {
  if (years <= 1) return '0-1';
  if (years <= 3) return '1-3';
  if (years <= 5) return '3-5';
  if (years <= 8) return '5-8';
  return '8+';
};

// ─────────────────────────────────────────
// HELPER — Sanitize raw JSON string
// Fixes real newlines inside string values
// ─────────────────────────────────────────
const sanitizeJSON = (raw) => {
  // Remove markdown fences if present
  let cleaned = raw
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim();

  // Fix unescaped real newlines INSIDE JSON string values
  // Strategy: replace \n and \r that appear inside quoted strings
  cleaned = cleaned.replace(
    /"((?:[^"\\]|\\.)*)"/gs,
    (match) => {
      return match
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
    }
  );

  return cleaned;
};

// ─────────────────────────────────────────
// HELPER — Extract & Parse JSON robustly
// ─────────────────────────────────────────
const extractJSON = (rawText) => {
  console.log('─── RAW GROQ RESPONSE ───');
  console.log(rawText);
  console.log('─────────────────────────');

  // Step 1: Sanitize first
  const sanitized = sanitizeJSON(rawText);

  // Step 2: Try parsing sanitized text
  try {
    return JSON.parse(sanitized);
  } catch (e) {
    console.log('Step 2 failed:', e.message);
  }

  // Step 3: Extract JSON block by braces
  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonBlock = rawText.substring(firstBrace, lastBrace + 1);
    const sanitizedBlock = sanitizeJSON(jsonBlock);
    try {
      return JSON.parse(sanitizedBlock);
    } catch (e) {
      console.log('Step 3 failed:', e.message);
    }
  }

  throw new Error(`JSON extraction failed. Raw:\n${rawText}`);
};

// ─────────────────────────────────────────
// HELPER — Call Groq API
// ─────────────────────────────────────────
const callGroqAPI = async (prompt) => {
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are a world-class salary negotiation coach and career strategist specializing in the Indian IT and corporate job market. You have 15+ years of experience helping professionals in companies like TCS, Infosys, Google India, Flipkart, Swiggy, Razorpay and top startups negotiate their salaries successfully. You have deep knowledge of: Exact salary bands across all Indian cities, How different company types pay, Which skills command premium salaries in 2024-25, Psychological tactics that work in Indian HR negotiations, Legal aspects of offer letters in India. Respond with ONLY raw JSON. No markdown. No backticks. No extra text before or after. All string values must be on a single line. Use \\n inside strings for line breaks.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Groq API Error:', JSON.stringify(errorData, null, 2));
    throw new Error(errorData?.error?.message || 'Groq API call failed');
  }

  const data = await response.json();
  console.log('Groq tokens used:', data.usage);

  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) throw new Error('Groq returned empty response');

  return rawText;
};

// ─────────────────────────────────────────
// HELPER — Update Salary Benchmark
// ─────────────────────────────────────────
const updateBenchmark = async (role, city, experience, midSalary) => {
  try {
    const experienceRange = getExperienceRange(experience);
    const existing = await SalaryBenchmark.findOne({
      role: role.toLowerCase(),
      city: city.toLowerCase(),
      experienceRange,
    });

    if (existing) {
      const newTotal = existing.totalSearches + 1;
      const newAvg = Math.round(
        (existing.averageSalary * existing.totalSearches + midSalary) / newTotal
      );
      await SalaryBenchmark.findOneAndUpdate(
        { role: role.toLowerCase(), city: city.toLowerCase(), experienceRange },
        { averageSalary: newAvg, totalSearches: newTotal, lastUpdated: new Date() }
      );
    } else {
      await SalaryBenchmark.create({
        role: role.toLowerCase(),
        city: city.toLowerCase(),
        experienceRange,
        averageSalary: midSalary,
        minSalary: midSalary * 0.8,
        maxSalary: midSalary * 1.2,
        totalSearches: 1,
      });
    }
  } catch (err) {
    console.error('Benchmark update failed (non-critical):', err.message);
  }
};

// ─────────────────────────────────────────
// CONTROLLER 1 — Analyze Salary
// POST /api/salary/analyze
// ─────────────────────────────────────────
const analyzeSalary = async (req, res, next) => {
  try {
    const {
      role,
      skills = [],
      experience = 0,
      city,
      companyType = 'other',
      currentSalary = 0,
      education = 'Not specified',
    } = req.body;

    // ── Validation ──────────────────────────
    if (!role?.trim()) {
      return res.status(400).json({ success: false, message: 'Job role is required.' });
    }
    if (!city?.trim()) {
      return res.status(400).json({ success: false, message: 'City is required.' });
    }
    if (!skills || skills.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one skill is required.' });
    }
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY missing from .env');
      return res.status(500).json({ success: false, message: 'Server config error: API key missing.' });
    }

    // ── Build Prompt ─────────────────────────
    const salaryDisplay =
      currentSalary === 0
        ? 'Fresher'
        : `${(currentSalary / 100000).toFixed(1)} LPA`;

    const prompt = `
Analyze this candidate for the Indian job market and provide a HIGHLY DETAILED salary negotiation assessment.

Candidate Profile:
Role: ${role}
Skills: ${skills.join(', ')}
Experience: ${experience} years
City: ${city}
Company Type: ${companyType}
Current Salary: ${salaryDisplay}
Education: ${education}

Return this EXACT JSON with detailed content:
{
  "suggestedRange": {
    "low": <realistic number in LPA>,
    "mid": <number in LPA — strong negotiation target>,
    "high": <number in LPA — best case scenario>
  },
  "confidence": "<Strong or Medium or Weak>",
  "confidenceReason": "<2-3 sentences explaining why this confidence level — mention specific skills, city demand, company type impact>",
  
  "negotiationScript": {
    "firstLine": "<A powerful, natural, confident opening sentence to say to HR. Should sound human, not robotic. Reference their specific role and market research. 2-3 sentences.>",
    "counterOffer": "<A detailed, multi-sentence response for when HR says the budget is fixed. Include: acknowledging their constraint, pivoting to value, suggesting alternatives like joining bonus or early review. 3-4 sentences.>",
    "finalAccept": "<A warm, professional acceptance that also sets a positive tone for joining. 2-3 sentences.>",
    "emailTemplate": "<A COMPLETE, PROFESSIONAL email. Must include:\\nSubject: [specific subject line]\\n\\nDear [Hiring Manager Name],\\n\\n[Opening paragraph — express excitement about the role specifically]\\n\\n[Second paragraph — present your market research and justify your ask with specific numbers and skill references]\\n\\n[Third paragraph — show flexibility and mention alternatives if needed]\\n\\n[Closing paragraph — positive, forward-looking, professional]\\n\\nWarm regards,\\n[Your Name]\\n[Phone Number]>"
  },
  
  "beyondSalary": [
    "<Specific negotiable benefit with exact numbers e.g. Joining bonus of Rs 75000 to cover notice period buyout>",
    "<Second benefit with specifics e.g. 3 days Work From Home per week mentioned in offer letter>",
    "<Third benefit e.g. Performance review at 6 months instead of standard 12 months>"
  ],
  
  "marketInsight": "<3-4 sentences of genuinely useful market intelligence. Mention: current demand trend for this role, which companies are hiring, impact of city on salary, how their skill set compares to average candidates in market>",
  
  "salaryBreakdown": {
    "monthly": <mid LPA divided by 12 rounded to nearest thousand>,
    "inHand": <estimated monthly in-hand after standard deductions in India — PF, PT, TDS>,
    "ctcVsInHand": "<explain the typical CTC vs in-hand difference for this salary range in India>"
  },
  
  "redFlags": "<An honest, specific warning if any — e.g. if their current salary seems low, if skills are becoming outdated, if the company type typically has lower pay. Be direct but constructive. 2 sentences. Return null if no concerns.>",
  
  "topSkillsToAdd": [
    "<Most impactful skill to learn with approximate salary increase like TypeScript — adds 15 to 20 percent premium in product companies>",
    "<Second skill with impact>",
    "<Third skill with impact>"
  ],
  
  "interviewTips": [
    "<Specific tip for negotiating in this type of company — startup vs MNC tactics differ greatly>",
    "<Tip about timing — when in the process to bring up salary>",
    "<Tip about what NOT to say in Indian salary negotiations>"
  ]
}
`;

    // ── Call Groq + Parse ────────────────────
    let parsed;
    try {
      const rawText = await callGroqAPI(prompt);
      parsed = extractJSON(rawText);
    } catch (err) {
      console.error('Groq/Parse error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'AI response could not be processed. Please try again.',
        debug: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }

    // ── Validate Fields ──────────────────────
    if (!parsed?.suggestedRange || !parsed?.negotiationScript) {
      console.error('Missing fields in parsed response:', parsed);
      return res.status(500).json({
        success: false,
        message: 'Incomplete AI response. Please try again.',
      });
    }

    const {
      suggestedRange,
      confidence,
      confidenceReason,
      negotiationScript,
      beyondSalary,
      marketInsight,
      salaryBreakdown,
      redFlags,
      topSkillsToAdd,
      interviewTips,
    } = parsed;

    // ── Save to MongoDB ──────────────────────
    const savedSearch = await Search.create({
      userId: req.user.id,
      role: role.trim(),
      skills,
      experience,
      city: city.trim(),
      companyType,
      currentSalary,
      education,
      suggestedRange,
      confidence,
      negotiationScript,
      beyondSalary,
      marketInsight,
      salaryBreakdown,
      interviewTips,
    });

    // ── Update Benchmark ─────────────────────
    updateBenchmark(role, city, experience, suggestedRange.mid);

    // ── Return Success ───────────────────────
    return res.status(200).json({
      success: true,
      data: {
        searchId: savedSearch._id,
        role: savedSearch.role,
        city: savedSearch.city,
        experience: savedSearch.experience,
        suggestedRange,
        confidence,
        confidenceReason,
        negotiationScript,
        beyondSalary,
        marketInsight,
        salaryBreakdown,
        redFlags: redFlags || null,
        topSkillsToAdd: topSkillsToAdd || [],
        interviewTips: interviewTips || [],
      },
    });
  } catch (err) {
    console.error('analyzeSalary unexpected error:', err);
    next(err);
  }
};

// ─────────────────────────────────────────
// CONTROLLER 2 — Get History
// GET /api/salary/history
// ─────────────────────────────────────────
const getHistory = async (req, res, next) => {
  try {
    const searches = await Search.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30)
      .select('role city experience suggestedRange confidence createdAt');

    return res.status(200).json({
      success: true,
      count: searches.length,
      data: searches,
    });
  } catch (err) {
    console.error('getHistory error:', err.message);
    next(err);
  }
};

// ─────────────────────────────────────────
// CONTROLLER 3 — Get Single Search
// GET /api/salary/:id
// ─────────────────────────────────────────
const getSearchById = async (req, res, next) => {
  try {
    const search = await Search.findById(req.params.id);
    if (!search) {
      return res.status(404).json({ success: false, message: 'Search not found.' });
    }
    // Check if the user is authorized to view this search
    if (search.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this search.' });
    }
    return res.status(200).json({ success: true, data: search });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid search ID.' });
    }
    console.error('getSearchById error:', err.message);
    next(err);
  }
};

// ─────────────────────────────────────────
// CONTROLLER 4 — Delete Search
// DELETE /api/salary/:id
// ─────────────────────────────────────────
const deleteSearch = async (req, res, next) => {
  try {
    const search = await Search.findById(req.params.id);
    if (!search) {
      return res.status(404).json({ success: false, message: 'Search not found.' });
    }
    if (search.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this search.' });
    }
    await Search.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Search history item deleted successfully.' });
  } catch (err) {
    console.error('deleteSearch error:', err.message);
    next(err);
  }
};

module.exports = { analyzeSalary, getHistory, getSearchById, deleteSearch };