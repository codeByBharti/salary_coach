import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Copy, Share2, ChevronRight, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { formatSalary } from '../utils/formatters';

const CopyBtn = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className={`absolute top-[12px] right-[12px] flex items-center gap-[5px] rounded-[8px] px-[10px] py-[5px] text-[11px] font-[800] cursor-pointer transition-all border uppercase tracking-wider ${
        copied ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-[#2B1212] border-[#F87171]/25 text-[#FECACA]/60 hover:text-white hover:border-[#F87171]'
      }`}>
      {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> {label}</>}
    </button>
  );
};

const Skeleton = () => (
  <div className="min-h-screen pt-[100px] pb-[120px] px-[24px] bg-[#130608] animate-pulse">
    <div className="max-w-[700px] mx-auto space-y-[20px]">
      <div className="h-[32px] w-[120px] bg-[#1F0E0E] rounded-[10px]" />
      <div className="h-[80px] w-full bg-[#1F0E0E] rounded-[20px]" />
      {[1,2,3].map(i => <div key={i} className="h-[200px] bg-[#1F0E0E] border border-[#F87171]/10 rounded-[20px]" />)}
    </div>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-[#1F0E0E]/70 backdrop-blur-xl border-[2px] border-[#F87171]/22 rounded-[24px] p-[30px] mb-[18px] shadow-[0_0_28px_rgba(248,113,113,0.07)] ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ icon, children }) => (
  <h3 className="flex items-center gap-[10px] text-[17px] font-[900] text-white uppercase tracking-tight mb-[22px]">
    <span className="text-[20px]">{icon}</span>{children}
  </h3>
);

const ScriptLabel = ({ children }) => (
  <p className="text-[11px] font-[800] tracking-[0.15em] uppercase text-[#FECACA]/40 mb-[8px]">{children}</p>
);

const ScriptBox = ({ text, accentColor, bgColor, label }) => (
  <div className="mb-[14px]">
    <ScriptLabel>{label}</ScriptLabel>
    <div className="relative rounded-[12px] px-[20px] py-[16px] text-[14px] text-slate-200 leading-[1.8] font-[600] border-[1.5px]"
      style={{ background: bgColor, borderColor: `${accentColor}28` }}>
      <CopyBtn text={text} />
      <span className="text-slate-300 italic">"{text}"</span>
    </div>
  </div>
);

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEmail, setShowEmail] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: resultData, isLoading, isError } = useQuery({
    queryKey: ['salary-result', id],
    queryFn: () => api.get(`/api/salary/${id}`)
  });

  const searchData = resultData?.data;

  /* Confetti on load */
  useEffect(() => {
    if (isLoading || isError || !searchData) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let raf;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const colors = ['#F87171', '#FB923C', '#FB7185', '#F87171', '#FECACA'];
    const particles = [];
    for (let i = 0; i < 80; i++) {
      const angle = (i < 40 ? -45 : -135) * Math.PI / 180;
      const spd = 14 + Math.random() * 14;
      particles.push({ x: i < 40 ? 0 : w, y: h, vx: Math.cos(angle) * spd + (Math.random() * 4 - 2), vy: Math.sin(angle) * spd - Math.random() * 10, r: Math.random() * 5 + 3, color: colors[Math.floor(Math.random() * colors.length)], tilt: 0, tiltInc: Math.random() * 0.07 + 0.02, opacity: 1, gravity: 0.45 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      let active = false;
      particles.forEach(p => {
        p.vy += p.gravity; p.x += p.vx; p.y += p.vy;
        p.tilt += p.tiltInc; if (p.vy > 0) p.opacity -= 0.012;
        if (p.y < h && p.opacity > 0) {
          active = true;
          ctx.save(); ctx.globalAlpha = p.opacity;
          ctx.beginPath(); ctx.lineWidth = p.r; ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + Math.sin(p.tilt) * 8, p.y);
          ctx.lineTo(p.x, p.y + p.r * 2); ctx.stroke(); ctx.restore();
        }
      });
      if (active) raf = requestAnimationFrame(draw); else canvas.remove();
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); if (canvas.parentNode) canvas.remove(); };
  }, [isLoading, isError, searchData]);

  if (isLoading) return <Skeleton />;

  if (isError || !searchData) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[24px] text-center bg-[#130608]">
      <div className="text-[48px] mb-[16px]">😕</div>
      <h2 className="text-[24px] font-[900] text-white mb-[8px] uppercase tracking-tight">Result Not Found</h2>
      <p className="text-[#FECACA]/50 mb-[28px]">We couldn't find the analysis you're looking for.</p>
      <Link to="/" className="inline-flex items-center gap-[8px] px-[24px] py-[12px] rounded-[12px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] font-[900] shadow-[0_0_18px_rgba(248,113,113,0.35)] hover:shadow-[0_0_28px_rgba(248,113,113,0.5)] hover:-translate-y-[2px] transition-all uppercase">
        <ArrowLeft size={16} /> Analyze Again
      </Link>
    </div>
  );

  const { suggestedRange, negotiationScript, beyondSalary, marketInsight, redFlags } = searchData;
  const { role: jobRole, city, experience } = searchData;

  const handleShare = () => {
    const text = `💼 I used SalaryCoach to find my market value!\nRole: ${jobRole} in ${city}\nTarget Salary: ${formatSalary(suggestedRange.mid * 100000)}\nGet your free analysis: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleCheck = (idx) => setCheckedItems(p => ({ ...p, [idx]: !p[idx] }));

  return (
    <div className="min-h-screen pt-[96px] pb-[110px] px-[24px] relative overflow-hidden bg-[#130608]">
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-[#F87171]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-0 w-[450px] h-[450px] bg-[#FB923C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[700px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-[6px] text-[13px] font-[700] text-[#FECACA]/40 hover:text-[#F87171] transition-colors mb-[22px] uppercase tracking-wider">
          <ArrowLeft size={16} /> Analyze Another Role
        </Link>

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-[22px] bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] rounded-[22px] px-[28px] py-[26px] text-[#130608] shadow-[0_0_28px_rgba(248,113,113,0.35)]">
          <div className="flex items-center gap-[8px] text-[12px] font-[800] uppercase tracking-[0.1em] opacity-70 mb-[5px]">
            <TrendingUp size={14} /> Market Analysis Complete
          </div>
          <h1 className="text-[22px] md:text-[26px] font-[900] mb-[5px] uppercase tracking-tight leading-none">{jobRole}</h1>
          <p className="text-[13px] font-[700] opacity-70 uppercase tracking-wider">{city} · {experience === 0 ? 'Fresher' : `${experience} yrs exp`}</p>
        </motion.div>

        {/* Salary Range */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardTitle icon="💰">Your Market Salary Range</CardTitle>
            <div className="h-[7px] bg-[#2B1212] rounded-[99px] mb-[22px] overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `90%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-[99px]" style={{ background: 'linear-gradient(90deg, #F87171 0%, #FB923C 50%, #FB7185 100%)' }} />
            </div>
            <div className="grid grid-cols-3 gap-[10px]">
              <div className="bg-[#F87171]/10 border border-[#F87171]/30 rounded-[14px] p-[14px] text-center">
                <div className="text-[10px] font-[800] text-[#F87171] uppercase tracking-wide mb-[5px]">Floor</div>
                <div className="text-[15px] md:text-[17px] font-[900] text-[#F87171]">{formatSalary(suggestedRange.low * 100000)}</div>
              </div>
              <div className="rounded-[16px] p-[14px] text-center shadow-[0_0_18px_rgba(248,113,113,0.3)]" style={{ background: 'linear-gradient(135deg, #F87171, #FB923C)' }}>
                <div className="text-[10px] font-[800] text-[#130608]/75 uppercase tracking-wide mb-[5px]">🎯 Target</div>
                <div className="text-[17px] md:text-[20px] font-[900] text-[#130608] leading-none">{formatSalary(suggestedRange.mid * 100000)}</div>
              </div>
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-[14px] p-[14px] text-center">
                <div className="text-[10px] font-[800] text-amber-400 uppercase tracking-wide mb-[5px]">Ceiling</div>
                <div className="text-[15px] md:text-[17px] font-[900] text-amber-400">{formatSalary(suggestedRange.high * 100000)}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Market Insight */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardTitle icon="📊">Market Intelligence</CardTitle>
            <div className="bg-[#FB923C]/8 border border-[#FB923C]/25 rounded-[12px] px-[18px] py-[14px] text-[14px] text-cyan-200 leading-[1.8] mb-[12px]">{marketInsight}</div>
            {redFlags && (
              <div className="bg-amber-400/8 border border-amber-400/25 rounded-[12px] px-[18px] py-[14px] text-[14px] text-amber-300 leading-[1.8]">
                <span className="font-[800] text-amber-400">⚠ Watch out: </span>{redFlags}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Negotiation Script */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardTitle icon="🎯">Your Negotiation Script</CardTitle>
            <ScriptBox label="Opening Line" text={negotiationScript.firstLine} accentColor="#F87171" bgColor="rgba(248,113,113,0.06)" />
            <ScriptBox label="Counter Offer" text={negotiationScript.counterOffer} accentColor="#FB923C" bgColor="rgba(251,146,60,0.06)" />
            <ScriptBox label="Final Accept" text={negotiationScript.finalAccept} accentColor="#FB7185" bgColor="rgba(251,113,133,0.06)" />
            <button onClick={() => setShowEmail(!showEmail)}
              className="w-full flex items-center justify-between px-[16px] py-[12px] mt-[8px] rounded-[12px] border-[1.5px] border-[#F87171]/25 bg-[#2B1212] text-[13px] font-[700] text-[#FECACA] hover:border-[#F87171] hover:text-white transition-all">
              <span>📧 Email Template</span>
              <ChevronRight size={15} className={`transition-transform duration-200 ${showEmail ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
              {showEmail && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="relative mt-[10px]">
                    <CopyBtn text={negotiationScript.emailTemplate} label="Copy Email" />
                    <pre className="bg-[#130608] border border-[#F87171]/22 rounded-[12px] px-[18px] py-[18px] text-[12px] font-mono text-slate-300 leading-[1.9] whitespace-pre-wrap overflow-x-auto">
                      {negotiationScript.emailTemplate}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Beyond Salary */}
        {beyondSalary?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardTitle icon="⚡">Also Negotiate These</CardTitle>
              <div className="flex flex-col gap-[8px]">
                {beyondSalary.map((item, idx) => {
                  const checked = checkedItems[idx];
                  return (
                    <div key={idx} onClick={() => toggleCheck(idx)}
                      className={`flex items-center gap-[14px] px-[14px] py-[12px] rounded-[12px] cursor-pointer border-[1.5px] transition-all ${checked ? 'bg-[#F87171]/10 border-[#F87171]/40' : 'border-[#F87171]/18 hover:border-[#F87171]/45 hover:bg-[#2B1212]'}`}>
                      <div className={`w-[22px] h-[22px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${checked ? 'bg-[#F87171] border-[#F87171]' : 'border-[#F87171]/30'}`}>
                        {checked && <Check size={13} strokeWidth={3} className="text-[#130608]" />}
                      </div>
                      <span className={`text-[14px] font-[600] transition-all ${checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>{item}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#130608]/90 backdrop-blur-xl border-t border-[#F87171]/15 px-[20px] py-[13px] flex justify-center gap-[10px] flex-wrap z-40">
        <button onClick={() => { navigator.clipboard.writeText(`${negotiationScript.firstLine}\n\n${negotiationScript.counterOffer}\n\n${negotiationScript.finalAccept}`); toast.success('Full script copied!'); }}
          className="flex items-center gap-[8px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] rounded-[10px] px-[20px] py-[10px] text-[13px] font-[900] shadow-[0_0_14px_rgba(248,113,113,0.35)] hover:shadow-[0_0_22px_rgba(248,113,113,0.55)] hover:-translate-y-[1px] transition-all uppercase">
          <Copy size={14} /> Copy Full Script
        </button>
        <button onClick={handleShare}
          className="flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/25 text-[#FECACA] rounded-[10px] px-[18px] py-[10px] text-[13px] font-[800] hover:bg-[#F87171] hover:text-[#130608] transition-all uppercase">
          <Share2 size={14} /> Share
        </button>
        <Link to="/"
          className="flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/25 text-[#FECACA] rounded-[10px] px-[18px] py-[10px] text-[13px] font-[800] hover:bg-[#F87171] hover:text-[#130608] transition-all uppercase">
          <ArrowLeft size={14} /> New Analysis
        </Link>
      </div>
    </div>
  );
}
