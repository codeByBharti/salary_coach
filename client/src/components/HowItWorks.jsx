import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: '📋',
    title: 'Enter Your Details',
    desc: 'Tell us your role, experience, city, skills, and current salary. Takes less than 60 seconds.',
    borderColor: 'border-[#F87171]/40',
    glowClass: 'hover:shadow-[0_0_30px_rgba(248,113,113,0.2)]',
    iconBg: 'bg-[#F87171]/15 border-[#F87171]/35',
    iconGlow: 'drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]',
    numberColor: 'text-[#F87171]/[0.04]',
    hoverBorder: 'hover:border-[#F87171]/70',
  },
  {
    number: '02',
    icon: '🤖',
    title: 'AI Benchmarks Your Worth',
    desc: 'Our AI scans thousands of real salary data points and calculates your true market range.',
    borderColor: 'border-[#FB923C]/40',
    glowClass: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]',
    iconBg: 'bg-[#FB923C]/15 border-[#FB923C]/35',
    iconGlow: 'drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]',
    numberColor: 'text-[#FB923C]/[0.04]',
    hoverBorder: 'hover:border-[#FB923C]/70',
  },
  {
    number: '03',
    icon: '💬',
    title: 'Get Your Script',
    desc: 'Receive a personalized, word-for-word negotiation script ready to send to HR.',
    borderColor: 'border-[#FB7185]/40',
    glowClass: 'hover:shadow-[0_0_30px_rgba(251,113,133,0.2)]',
    iconBg: 'bg-[#FB7185]/15 border-[#FB7185]/35',
    iconGlow: 'drop-shadow-[0_0_10px_rgba(251,113,133,0.6)]',
    numberColor: 'text-[#FB7185]/[0.04]',
    hoverBorder: 'hover:border-[#FB7185]/70',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[100px] px-[24px] bg-[#130608] relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#F87171]/4 blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-[64px]">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/30 rounded-[99px] px-[16px] py-[8px] mb-[18px]">
            <span className="text-[12px] font-[800] tracking-[0.15em] text-[#FECACA] uppercase">How It Works</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[48px] font-[900] text-white tracking-tight uppercase leading-none mb-[14px]">
            Three Steps to Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185]">
              Dream Salary
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-[17px] text-[#FECACA]/50 max-w-[500px] mx-auto font-[500]">
            No fluff, no sign-up, no credit card. Just results in seconds.
          </motion.p>
        </div>

        {/* Gradient connector line */}
        <div className="hidden md:block absolute top-[310px] left-[calc(16.66%-60px)] right-[calc(16.66%-60px)] h-[2px] z-0"
          style={{ background: 'linear-gradient(90deg, #F87171, #FB923C, #FB7185)' }} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative bg-[#1F0E0E]/70 border-[2px] ${step.borderColor} ${step.hoverBorder} rounded-[24px] p-[40px] text-center group hover:-translate-y-[8px] transition-all duration-300 ${step.glowClass} overflow-hidden`}
            >
              {/* Number watermark */}
              <div className={`absolute -right-[10px] -top-[10px] text-[130px] font-[900] leading-none ${step.numberColor} pointer-events-none select-none`}>
                {step.number}
              </div>

              {/* Icon circle */}
              <div className={`w-[72px] h-[72px] rounded-full ${step.iconBg} border flex items-center justify-center mx-auto mb-[22px] text-[32px] ${step.iconGlow} transition-all duration-300`}>
                {step.icon}
              </div>

              <h3 className="text-[19px] font-[900] text-white mb-[12px] uppercase tracking-tight">{step.title}</h3>
              <p className="text-[14px] text-[#FECACA]/55 leading-[1.75] font-[500]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
