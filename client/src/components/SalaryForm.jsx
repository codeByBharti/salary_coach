import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { formatSalary } from '../utils/formatters';

const COMMON_ROLES = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'Data Analyst', 'Data Scientist',
  'Product Manager', 'DevOps Engineer', 'UI/UX Designer',
  'QA Engineer', 'Business Analyst', 'React Developer',
  'Node.js Developer', 'Python Developer', 'Java Developer'
];

const getSuggestedSkills = (role) => {
  if (!role) return ['JavaScript', 'Python', 'SQL', 'Git', 'Agile'];
  const r = role.toLowerCase();
  if (r.includes('react') || r.includes('frontend')) return ['React', 'JavaScript', 'TypeScript', 'Redux', 'CSS', 'Tailwind CSS'];
  if (r.includes('node') || r.includes('backend')) return ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'];
  if (r.includes('data') || r.includes('scientist')) return ['Python', 'SQL', 'Machine Learning', 'Pandas', 'TensorFlow', 'Tableau'];
  if (r.includes('manager')) return ['Product Strategy', 'Agile', 'Scrum', 'Jira', 'Stakeholder Management'];
  return ['JavaScript', 'Python', 'SQL', 'Git', 'Agile', 'AWS'];
};

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Noida', 'Gurgaon', 'Kochi',
  'Chandigarh', 'Indore', 'Lucknow'
];

const COMPANY_TYPES = [
  { id: 'startup', icon: '🚀', title: 'Startup', desc: 'Early-stage' },
  { id: 'mnc', icon: '🏢', title: 'MNC', desc: 'Large Corp' },
  { id: 'unicorn', icon: '🦄', title: 'Unicorn', desc: 'Funded' },
  { id: 'govt', icon: '🏛️', title: 'Govt / PSU', desc: 'Public sector' }
];

const EDUCATION_OPTIONS = [
  'High School', 'Diploma', 'B.Tech / B.E.', 'BCA / B.Sc (CS)', 'MBA', 'M.Tech / M.S.', 'Other Graduate', 'Other Post Graduate'
];

const Label = ({ children, required }) => (
  <label className="block text-[13px] font-[800] text-[#CBD5E1] mb-[8px] uppercase tracking-[0.08em]">
    {children} {required && <span className="text-[#F87171] font-[800]">*</span>}
  </label>
);

export default function SalaryForm() {
  const navigate = useNavigate();
  const roleDropdownRef = useRef(null);
  const eduDropdownRef = useRef(null);

  const [role, setRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(2);
  const [currentSalary, setCurrentSalary] = useState('');
  const [city, setCity] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [education, setEducation] = useState('');

  const [roleSearch, setRoleSearch] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isEduDropdownOpen, setIsEduDropdownOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setIsRoleDropdownOpen(false);
      }
      if (eduDropdownRef.current && !eduDropdownRef.current.contains(e.target)) {
        setIsEduDropdownOpen(false);
      }
    };
    const handleFillRole = (e) => {
      if (e.detail) {
        setRole(e.detail);
        setRoleSearch(e.detail);
        setErrors(prev => ({ ...prev, role: null }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('fillRole', handleFillRole);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('fillRole', handleFillRole);
    };
  }, []);

  const filteredRoles = COMMON_ROLES.filter(r => r.toLowerCase().includes(roleSearch.toLowerCase()));

  const handleRoleSelect = (r) => {
    setRole(r); setRoleSearch(r); setIsRoleDropdownOpen(false);
    setErrors(prev => ({ ...prev, role: null }));
  };

  const addSkill = (skill) => {
    if (!skill.trim() || skills.length >= 10 || skills.includes(skill.trim())) return;
    setSkills([...skills, skill.trim()]); setSkillInput('');
    setErrors(prev => ({ ...prev, skills: null }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); }
  };

  const removeSkill = (s) => setSkills(skills.filter(sk => sk !== s));

  const suggestedSkills = getSuggestedSkills(role).filter(s => !skills.includes(s)).slice(0, 5);

  const validate = () => {
    const newErrors = {};
    if (!role) newErrors.role = 'Job Role is required';
    if (skills.length === 0) newErrors.skills = 'Add at least 1 skill';
    if (!city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fill required fields'); return; }
    setIsSubmitting(true); setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < 2 ? prev + 1 : prev));
    }, 1200);
    try {
      const payload = {
        role, skills, experience: parseFloat(experience), city,
        companyType: companyType || undefined,
        currentSalary: parseFloat(currentSalary) || 0,
        education: education || undefined
      };
      const response = await api.post('/api/salary/analyze', payload);
      if (response.success) {
        localStorage.setItem('lastResult', JSON.stringify(response.data));
        setLoadingStep(3);
        setTimeout(() => { clearInterval(interval); navigate(`/result/${response.data.searchId}`); }, 1000);
      }
    } catch (error) {
      clearInterval(interval);
      toast.error(error.message || 'Failed to analyze salary');
      setIsSubmitting(false);
    }
  };

  const renderError = (field) => errors[field] ? (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[12px] mt-[6px] font-[600]">
      ⚠ {errors[field]}
    </motion.p>
  ) : null;

  const inputBase = `w-full px-[16px] py-[13px] border-[1.5px] border-[#F87171]/25 rounded-[12px] text-[15px] font-[500] text-white bg-[#130608]/80 focus:outline-none focus:border-[#FB923C] focus:shadow-[0_0_15px_rgba(248,113,113,0.25)] placeholder:text-[#FECACA]/30 transition-all duration-200 shadow-sm`;
  const errBorder = (f) => errors[f] ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]' : '';

  return (
    <section id="analyze" className="py-[96px] px-[24px] border-t border-[#F87171]/15 relative bg-[#130608]">

      {/* Floating orbs behind form */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#FB7185]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#F87171]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Section header */}
      <div className="text-center mb-[48px] relative z-10">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[12px] font-[800] tracking-[0.15em] text-[#F87171] uppercase mb-[12px]">
          Free Analysis
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[46px] font-[900] text-white tracking-tight uppercase mb-[12px]">
          ANALYZE YOUR MARKET VALUE
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-[17px] text-[#CBD5E1] font-[500]">
          Get your salary range and negotiation script in 30 seconds
        </motion.p>
      </div>

      {/* Card (Ultra Premium Dark Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-[680px] mx-auto bg-[#1F0E0E]/70 backdrop-blur-xl border-[2px] border-[#FB923C]/30 rounded-[28px] p-[40px] shadow-[0_0_50px_rgba(248,113,113,0.15)] relative z-10"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[28px]">

          {/* Job Role */}
          <motion.div animate={errors.role ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.35 }}>
            <Label required>Job Role</Label>
            <div className="relative" ref={roleDropdownRef}>
              <input
                type="text"
                className={`${inputBase} ${errBorder('role')} pr-[56px] text-white`}
                style={{ color: '#ffffff' }}
                placeholder="e.g. Product Manager, Frontend Dev..."
                value={roleSearch}
                onChange={(e) => { setRoleSearch(e.target.value); setRole(e.target.value); setIsRoleDropdownOpen(true); }}
                onFocus={() => setIsRoleDropdownOpen(true)}
                maxLength={50}
              />
              <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[11px] font-[700] text-[#CBD5E1] pointer-events-none">
                {roleSearch.length}/50
              </span>
              <AnimatePresence>
                {isRoleDropdownOpen && filteredRoles.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    className="absolute z-50 top-full left-0 w-full mt-[8px] bg-[#1F0E0E] border border-[#FB923C]/40 rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] max-h-[240px] overflow-y-auto"
                  >
                    {filteredRoles.map(r => (
                      <li key={r}
                        className="px-[18px] py-[12px] text-[14px] font-[600] text-white hover:bg-[#F87171]/25 hover:text-white cursor-pointer border-b border-[#F87171]/10 last:border-none transition-colors first:rounded-t-[16px] last:rounded-b-[16px]"
                        onClick={() => handleRoleSelect(r)}
                      >
                        {r}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {renderError('role')}
          </motion.div>

          {/* Skills */}
          <motion.div animate={errors.skills ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.35 }}>
            <Label required>Skills</Label>
            <div className={`${errBorder('skills')} border-[1.5px] border-[#F87171]/25 focus-within:border-[#FB923C] focus-within:shadow-[0_0_15px_rgba(248,113,113,0.25)] rounded-[12px] px-[12px] py-[10px] bg-[#130608]/80 flex flex-wrap gap-[8px] min-h-[54px] items-center transition-all duration-200`}>
              {skills.map(s => (
                <span key={s} className="inline-flex items-center gap-[6px] bg-[#F87171]/20 border border-[#F87171]/40 text-white rounded-[8px] px-[12px] py-[5px] text-[13px] font-[700]" style={{ color: '#ffffff' }}>
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="text-[#F87171] hover:text-[#FB923C] transition-colors"><X size={13} /></button>
                </span>
              ))}
              <input
                type="text"
                className="flex-1 min-w-[160px] bg-transparent focus:outline-none text-[14px] font-[500] text-white placeholder:text-[#FECACA]/30"
                style={{ color: '#ffffff' }}
                placeholder={skills.length < 10 ? 'Type a skill & press Enter...' : 'Max 10 skills reached'}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                disabled={skills.length >= 10}
              />
            </div>
            {suggestedSkills.length > 0 && (
              <div className="mt-[10px] flex flex-wrap items-center gap-[6px]">
                <span className="text-[11px] font-[800] text-[#CBD5E1] uppercase tracking-wide">Suggested:</span>
                {suggestedSkills.map(s => (
                  <button key={s} type="button" onClick={() => addSkill(s)}
                    className="text-[12px] font-[700] bg-[#2B1212] border border-[#F87171]/20 text-white px-[10px] py-[4px] rounded-[8px] hover:bg-[#F87171]/20 hover:text-white hover:border-[#F87171]/40 transition-all"
                    style={{ color: '#ffffff' }}>
                    + {s}
                  </button>
                ))}
              </div>
            )}
            {renderError('skills')}
          </motion.div>

          {/* Experience */}
          <div>
            <Label>Years of Experience</Label>
            <div className="bg-[#2B1212]/60 border border-[#F87171]/25 rounded-[12px] px-[20px] py-[16px]">
              <div className="flex justify-between items-center mb-[12px]">
                <span className="text-[13px] font-[700] text-[#CBD5E1]">Experience Level</span>
                <span className="text-[16px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] to-[#FB7185]">
                  {experience === 0 ? 'Fresher 🎓' : experience === 0.5 ? '6 Months' : experience === 1 ? '1 Year' : `${experience} Years`}
                </span>
              </div>
              <input type="range" min="0" max="20" step="0.5" value={experience}
                onChange={(e) => setExperience(parseFloat(e.target.value))}
                className="w-full accent-[#F87171]" />
              <div className="flex justify-between text-[11px] font-[700] text-[#CBD5E1] mt-[8px]">
                <span>Fresher</span><span>10 Years</span><span>20+ Years</span>
              </div>
            </div>
          </div>

          {/* Current Salary */}
          <div>
            <Label>Current / Expected Salary</Label>
            <div className="relative flex items-center">
              <span className="absolute left-[16px] text-[#FECACA]/50 font-[800] text-[16px] pointer-events-none">₹</span>
              <input type="number" min="0"
                className={`${inputBase} pl-[32px] pr-[90px] text-white`}
                style={{ color: '#ffffff' }}
                placeholder="e.g. 1200000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)} />
              <span className="absolute right-[16px] text-[12px] font-[700] text-[#CBD5E1] pointer-events-none whitespace-nowrap">/ year</span>
            </div>
            <div className="flex justify-between items-center mt-[6px]">
              <span className="text-[12px] text-[#CBD5E1]">Enter 0 if you're a fresher</span>
              {currentSalary && parseFloat(currentSalary) > 0 && (
                <span className="text-[12px] font-[800] text-[#F87171]">{formatSalary(parseFloat(currentSalary))}</span>
              )}
            </div>
          </div>

          {/* City */}
          <motion.div animate={errors.city ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.35 }}>
            <Label required>City</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-[8px]">
              {CITIES.map(c => (
                <button key={c} type="button"
                  onClick={() => { setCity(c); setErrors(p => ({ ...p, city: null })); }}
                  className={`py-[10px] px-[6px] rounded-[10px] text-[13px] font-[700] text-center cursor-pointer transition-all duration-200 border-[1.5px] ${
                    city === c
                      ? 'bg-gradient-to-r from-[#F87171] to-[#FB7185] border-transparent shadow-[0_0_15px_rgba(248,113,113,0.4)]'
                      : 'border-[#F87171]/25 bg-[#130608]/80 hover:border-[#FB923C]/60'
                  }`}
                  style={{ color: city === c ? '#130608' : '#ffffff' }}
                >
                  {c}
                </button>
              ))}
            </div>
            {renderError('city')}
          </motion.div>

          {/* Company Type */}
          <div>
            <Label>Target Company Type</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
              {COMPANY_TYPES.map(type => (
                <button key={type.id} type="button"
                  onClick={() => setCompanyType(prev => prev === type.id ? '' : type.id)}
                  className={`flex flex-col items-center justify-center gap-[6px] py-[18px] px-[8px] rounded-[14px] cursor-pointer transition-all duration-200 border-[1.5px] ${
                    companyType === type.id
                      ? 'bg-[#2B1212] border-[#F87171] shadow-[0_0_15px_rgba(248,113,113,0.25)]'
                      : 'border-[#F87171]/25 bg-[#130608]/80 hover:border-[#FB923C]/50'
                  }`}
                  style={{ color: '#ffffff' }}
                >
                  <span className="text-[26px]">{type.icon}</span>
                  <span className="text-[13px] font-[800] text-white">{type.title}</span>
                  <span className="text-[11px] text-[#CBD5E1] font-[600]">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Education - Custom Dropdown */}
          <div>
            <Label>Highest Education <span className="text-[#FECACA]/40 font-[600] text-[12px] lowercase tracking-normal">(optional)</span></Label>
            <div className="relative" ref={eduDropdownRef}>
              <button
                type="button"
                onClick={() => setIsEduDropdownOpen(prev => !prev)}
                className={`${inputBase} text-left flex items-center justify-between pr-[44px] ${!education ? 'text-[#64748B]' : 'text-white'}`}
                style={{ color: education ? '#ffffff' : undefined }}
              >
                <span style={{ color: education ? '#ffffff' : undefined }}>{education || 'Select your education'}</span>
                <ChevronDown size={16} strokeWidth={2} className={`text-[#FECACA]/40 transition-transform duration-200 shrink-0 ${isEduDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isEduDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    className="absolute z-50 top-full left-0 w-full mt-[8px] bg-[#1F0E0E] border border-[#FB923C]/40 rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] max-h-[240px] overflow-y-auto"
                  >
                    {EDUCATION_OPTIONS.map(opt => (
                      <li
                        key={opt}
                        className={`px-[18px] py-[12px] text-[14px] font-[600] cursor-pointer border-b border-[#F87171]/10 last:border-none transition-colors first:rounded-t-[16px] last:rounded-b-[16px] ${
                          education === opt
                            ? 'bg-[#F87171]/20 text-white font-[800]'
                            : 'text-white hover:bg-[#F87171]/25 hover:text-white'
                        }`}
                        onClick={() => { setEducation(opt); setIsEduDropdownOpen(false); }}
                      >
                        {opt}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            className="w-full h-[56px] bg-gradient-to-r from-[#F87171] via-[#F87171] to-[#FB7185] text-white rounded-[14px] text-[16px] font-[800] cursor-pointer shadow-[0_0_20px_rgba(248,113,113,0.3)] hover:shadow-[0_0_35px_rgba(248,113,113,0.5)] hover:-translate-y-[2px] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[10px]"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /><span>Analyzing Market scales...</span></>
            ) : (
              <><Sparkles size={18} className="fill-white" /><span>ANALYZE MY MARKET VALUE →</span></>
            )}
          </button>

        </form>
      </motion.div>

      {/* Loading overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#130608]/90 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1F0E0E] max-w-md w-full p-[40px] rounded-[28px] shadow-[0_0_50px_rgba(248,113,113,0.3)] border border-[#FB923C]/30 text-center"
            >
              <div className="relative w-[80px] h-[80px] mx-auto mb-[28px]">
                <div className="absolute inset-0 rounded-full border-4 border-[#2B1212]" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F87171] border-r-[#FB7185]" />
                <div className="absolute inset-[10px] bg-[#130608] rounded-full flex items-center justify-center text-[24px]">
                  {loadingStep === 0 && '🔍'}{loadingStep === 1 && '🧠'}{loadingStep === 2 && '⚡'}{loadingStep === 3 && '🎉'}
                </div>
              </div>
              <h3 className="text-[20px] font-[800] text-white mb-[6px] uppercase tracking-tight">Analyzing Your Market</h3>
              <p className="text-[14px] text-[#374151] mb-[24px]">AI is crunching real-time tech benchmarks...</p>
              <div className="flex flex-col gap-[10px] text-left">
                {['Scanning live market benchmarks...', 'Feeding your profile to AI...', 'Crafting negotiation script...', 'Preparing your report...'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-[12px]">
                    <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0">
                      {loadingStep > idx ? <span className="text-green-400 text-[14px]">✓</span>
                        : loadingStep === idx ? <span className="w-[8px] h-[8px] rounded-full bg-[#F87171] animate-ping inline-block" />
                        : <span className="w-[6px] h-[6px] rounded-full bg-[#2B1212] inline-block" />}
                    </div>
                    <span className={`text-[14px] transition-colors ${loadingStep === idx ? 'text-white font-[600]' : loadingStep > idx ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
