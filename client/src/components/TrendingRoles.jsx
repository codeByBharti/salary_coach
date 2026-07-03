import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MapPin, TrendingUp, Flame } from 'lucide-react';
import { formatSalary } from '../utils/formatters';

const SkeletonCard = () => (
  <div className="bg-[#1F0E0E]/70 border border-[#F87171]/15 rounded-[20px] p-[24px] animate-pulse">
    <div className="h-[16px] bg-[#2B1212] rounded-md mb-[16px] w-3/4" />
    <div className="h-[22px] bg-[#2B1212] rounded-full mb-[14px] w-1/2" />
    <div className="h-[11px] bg-[#2B1212] rounded mb-[8px] w-2/3" />
    <div className="h-[36px] bg-[#2B1212] rounded-[10px] mt-[16px]" />
  </div>
);

const TrendingRoles = React.memo(() => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${BASE_URL}/api/trending`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) setRoles(data.data || []);
      else throw new Error(data.message || 'Failed to fetch');
    } catch (err) {
      setError('Could not load trending roles. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrendingRoles(); }, []);

  const handleAnalyzeClick = (role) => {
    window.dispatchEvent(new CustomEvent('fillRole', { detail: role }));
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trending" className="py-[96px] px-[24px] bg-[#130608] relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F87171]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#FB923C]/5 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[48px] gap-[20px]">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-[8px] text-[12px] font-[800] tracking-[0.15em] text-[#FECACA] uppercase mb-[12px] bg-[#1F0E0E] border border-[#F87171]/30 px-[14px] py-[7px] rounded-[99px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#F87171] live-dot" />
              Live Database
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-[900] text-white tracking-tight leading-tight uppercase">
              Trending Roles{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185]">This Week</span>
            </motion.h2>
          </div>

          <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            onClick={fetchTrendingRoles} disabled={loading}
            className="self-start flex items-center gap-[8px] px-[18px] py-[11px] text-[13px] font-[800] rounded-[12px] border border-[#F87171]/30 bg-[#1F0E0E]/70 text-[#FECACA] hover:bg-[#F87171] hover:text-[#130608] hover:border-[#F87171] disabled:opacity-40 transition-all duration-300 shrink-0">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </motion.button>
        </div>

        {error && (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-[20px] text-red-400 font-[600]">{error}</div>
        )}

        {!error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px]">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : roles.map((item, index) => (
                <motion.div
                  key={item.role + index}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => handleAnalyzeClick(item.role)}
                  className="group bg-[#1F0E0E]/70 border-[2px] border-[#F87171]/20 rounded-[20px] p-[22px] flex flex-col gap-[12px] cursor-pointer hover:border-[#F87171] hover:shadow-[0_0_28px_rgba(248,113,113,0.2)] hover:-translate-y-[6px] transition-all duration-300"
                >
                  {item.totalSearches > 500 && (
                    <div className="inline-flex items-center gap-[4px] self-end bg-[#F87171]/15 border border-[#F87171]/35 text-[#F87171] rounded-[99px] px-[8px] py-[2px] text-[10px] font-[800]">
                      <Flame size={10} className="animate-pulse" /> HOT
                    </div>
                  )}

                  <h3 className="text-[14px] font-[900] text-white leading-snug line-clamp-2 group-hover:text-[#F87171] transition-colors uppercase tracking-tight">
                    {item.role}
                  </h3>

                  <div className="inline-flex items-center self-start gap-[5px] bg-[#2B1212] border border-[#F87171]/25 text-[#FECACA] rounded-[99px] px-[12px] py-[5px] text-[12px] font-[800]">
                    <TrendingUp size={12} className="text-[#FB923C]" />
                    {item.averageSalary >= 100000 ? formatSalary(item.averageSalary) : `₹${item.averageSalary}L`}
                  </div>

                  <div className="flex flex-col gap-[4px]">
                    <div className="text-[11px] text-[#CBD5E1] font-[700]">{item.totalSearches.toLocaleString()} searches</div>
                    {item.topCity && (
                      <div className="flex items-center gap-[4px] text-[11px] text-[#CBD5E1] font-[700]">
                        <MapPin size={10} className="text-[#FB7185]" />
                        {item.topCity}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleAnalyzeClick(item.role); }}
                    className="mt-auto w-full text-center bg-[#2B1212] border border-[#F87171]/30 text-[#FECACA] rounded-[10px] px-[10px] py-[9px] text-[12px] font-[800] group-hover:bg-gradient-to-r group-hover:from-[#F87171] group-hover:to-[#FB923C] group-hover:border-transparent group-hover:text-[#130608] transition-all duration-300"
                  >
                    ANALYZE →
                  </button>
                </motion.div>
              ))
            }
          </div>
        )}
      </div>
    </section>
  );
});

export default TrendingRoles;
