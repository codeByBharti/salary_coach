import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#130608] flex flex-col items-center justify-center px-[24px] text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F87171 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FB923C 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 max-w-[480px] mx-auto">
        <div className="w-[100px] h-[100px] rounded-full bg-[#1F0E0E] border-[2px] border-[#F87171]/35 flex items-center justify-center mx-auto mb-[28px] shadow-[0_0_24px_rgba(248,113,113,0.2)] relative">
          <div className="absolute inset-0 rounded-full blur-[8px] bg-[#F87171]/8" />
          <SearchX size={44} className="text-[#F87171]" strokeWidth={1.5} />
        </div>

        <div className="text-[80px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] leading-none mb-[8px] tracking-tight">
          404
        </div>
        <h1 className="text-[26px] font-[900] text-white mb-[12px] uppercase tracking-tight">Page Not Found</h1>
        <p className="text-[15px] text-[#FECACA]/50 leading-[1.7] mb-[32px] font-[500]">
          Looks like this page doesn't exist. But your salary analysis is just one click away!
        </p>

        <div className="flex items-center justify-center gap-[12px] flex-wrap">
          <Link to="/"
            className="inline-flex items-center gap-[8px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] px-[24px] py-[13px] rounded-[12px] font-[900] text-[15px] shadow-[0_0_18px_rgba(248,113,113,0.4)] hover:shadow-[0_0_28px_rgba(248,113,113,0.6)] hover:-translate-y-[2px] transition-all uppercase">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()}
            className="inline-flex items-center gap-[8px] bg-[#1F0E0E] border border-[#F87171]/30 text-[#FECACA] px-[22px] py-[13px] rounded-[12px] font-[800] text-[14px] hover:bg-[#F87171] hover:text-[#130608] transition-all uppercase">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
