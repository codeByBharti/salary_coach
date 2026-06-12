import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, Star } from 'lucide-react';

const testimonials = [
  { quote: "I negotiated ₹1.8L more using the exact script this tool gave me. The HR said yes immediately!", author: "Priya S.", role: "Software Engineer", company: "Bangalore", hike: "+₹1.8L", avatar: "P", color: 'from-[#F87171] to-[#FB923C]' },
  { quote: "Never knew I was underpaid by 30%. This tool opened my eyes and gave me confidence to ask for what I deserve.", author: "Rahul M.", role: "Product Manager", company: "Pune", hike: "+30%", avatar: "R", color: 'from-[#FB923C] to-[#FB7185]' },
  { quote: "The email template was perfect. Got the offer revised within 24 hours of sending it.", author: "Anjali K.", role: "Data Analyst", company: "Hyderabad", hike: "+₹80K", avatar: "A", color: 'from-[#FB7185] to-[#F87171]' },
  { quote: "The negotiation script gave me the confidence to ask for 15% more — and I got it.", author: "Karan V.", role: "Frontend Developer", company: "Noida", hike: "+15%", avatar: "K", color: 'from-[#F87171] to-[#FB7185]' },
];

const Testimonials = React.memo(() => (
  <section className="py-[96px] overflow-hidden relative bg-[#130608]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FB923C]/4 blur-[150px] pointer-events-none" />
    <div className="max-w-[1200px] mx-auto px-[24px]">
      <div className="text-center mb-[60px]">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/30 rounded-[99px] px-[16px] py-[8px] mb-[18px]">
          <span className="text-[12px] font-[800] tracking-[0.15em] text-[#FECACA] uppercase">Real Results</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[48px] font-[900] text-white tracking-tight mb-[12px] uppercase leading-none">
          What Professionals{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185]">Say</span>
        </motion.h2>
      </div>
      <style>{`.t-scroll::-webkit-scrollbar{display:none}`}</style>
      <div className="t-scroll flex gap-[22px] overflow-x-auto pb-[20px] snap-x snap-mandatory -mx-[24px] px-[24px]" style={{ scrollbarWidth: 'none' }}>
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="relative bg-[#1F0E0E]/70 border-[2px] border-[#F87171]/20 rounded-[28px] p-[34px] flex flex-col gap-[18px] min-w-[340px] md:min-w-[400px] snap-center shrink-0 hover:border-[#F87171] hover:shadow-[0_0_28px_rgba(248,113,113,0.2)] hover:-translate-y-[5px] transition-all duration-300 overflow-hidden group">
            <div className="absolute top-[22px] right-[22px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] text-[12px] font-[900] px-[13px] py-[5px] rounded-[99px]">{t.hike} hike</div>
            <Quote className="absolute -bottom-[10px] -right-[10px] w-[120px] h-[120px] text-[#F87171]/[0.04] pointer-events-none -rotate-12" />
            <div className="flex gap-[3px]">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#F87171] text-[#F87171]" />)}</div>
            <p className="text-[15px] text-slate-200 leading-[1.8] font-[600] grow">"{t.quote}"</p>
            <div className="flex items-center gap-[13px] pt-[18px] border-t border-[#F87171]/15">
              <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[#130608] text-[17px] font-[900] shrink-0 bg-gradient-to-br ${t.color}`}>{t.avatar}</div>
              <div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[15px] font-[800] text-white">{t.author}</span>
                  <CheckCircle2 size={14} className="text-[#F87171]" />
                </div>
                <span className="text-[12px] font-[600] text-[#FECACA]/40">{t.role} · {t.company}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));
Testimonials.displayName = 'Testimonials';
export default Testimonials;
