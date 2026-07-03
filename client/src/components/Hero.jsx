import { motion } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, TrendingUp, Users, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '12,000+', label: 'Professionals Helped' },
  { icon: TrendingUp, value: '₹2.4L', label: 'Avg. Salary Hike' },
  { icon: Star, value: '4.9/5', label: 'User Rating' },
];

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#130608] py-[60px] md:py-[80px]">

      {/* Background Neon Green Glowing Orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full blur-[160px] opacity-30 floating-orb"
        style={{ background: 'radial-gradient(circle, #F87171 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[550px] h-[550px] rounded-full blur-[180px] opacity-25 floating-orb-delay"
        style={{ background: 'radial-gradient(circle, #FB923C 0%, transparent 70%)' }} />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #FB7185 0%, transparent 70%)' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Content — centered on desktop */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-[24px] flex flex-col items-center justify-center gap-[40px]">

        {/* LEFT COLUMN (text content) */}
        <div className="w-full text-center flex flex-col items-center gap-[32px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/40 text-[#FECACA] rounded-[99px] px-[18px] py-[9px] text-[12px] sm:text-[13px] font-[800] shadow-[0_0_18px_rgba(248,113,113,0.2)]"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[#F87171] live-dot" />
            FREE · AI-POWERED · BUILT FOR INDIA
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-[48px] sm:text-[64px] md:text-[78px] font-[900] text-white leading-[1.05] tracking-tight uppercase">
              KNOW YOUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] drop-shadow-[0_0_40px_rgba(248,113,113,0.5)]">
                MARKET WORTH
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[16px] sm:text-[19px] text-[#CBD5E1] font-[600] max-w-[560px] leading-[1.65]"
          >
            Get your exact salary range for any tech role in India — plus a
            word-for-word negotiation script — in under 30 seconds. Completely free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center md:justify-start gap-[14px] flex-wrap"
          >
            <button
              onClick={() => scrollToSection('analyze')}
              className="flex items-center gap-[10px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] rounded-[14px] px-[36px] py-[18px] text-[16px] font-[900] cursor-pointer shadow-[0_0_28px_rgba(248,113,113,0.5)] hover:shadow-[0_0_44px_rgba(248,113,113,0.7)] hover:-translate-y-[2px] active:scale-[0.98] transition-all duration-300"
            >
              <Zap size={18} className="fill-[#130608]" />
              ANALYZE MY SALARY
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center gap-[8px] bg-[#1F0E0E]/80 border border-[#F87171]/30 text-[#FECACA] rounded-[14px] px-[28px] py-[18px] text-[15px] font-[800] cursor-pointer hover:border-[#F87171]/70 hover:bg-[#1F0E0E] active:scale-[0.98] transition-all duration-300"
            >
              See How It Works
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center md:justify-start gap-[8px] sm:gap-[0px] flex-wrap sm:divide-x sm:divide-[#F87171]/20 mt-[8px]"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-[10px] px-[20px] sm:px-[28px] py-[10px]">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[#F87171]/10 border border-[#F87171]/25 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#F87171]" />
                </div>
                <div className="text-left">
                  <div className="text-[16px] font-[900] text-white leading-none">{value}</div>
                  <div className="text-[11px] font-[700] text-[#CBD5E1] uppercase tracking-wider mt-[2px]">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-[18px] flex-wrap justify-center md:justify-start mt-[4px]"
          >
            {[
              { icon: ShieldCheck, text: '100% Private' },
              { icon: Zap, text: 'Instant Results' },
              { icon: Star, text: 'No Signup Needed' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-[6px] text-[12px] font-[700] text-[#CBD5E1]">
                <Icon size={13} className="text-[#F87171]/50" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Soft bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#130608] to-transparent pointer-events-none" />
    </section>
  );
}
