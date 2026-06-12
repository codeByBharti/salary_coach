import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Briefcase, Eye, Search, Trash2 } from 'lucide-react';
import api from '../utils/api';
import { formatSalary } from '../utils/formatters';
import toast from 'react-hot-toast';

const confidenceConfig = {
  Strong: { bg: 'rgba(248,113,113,0.12)', border: 'border-emerald-400/40', text: 'text-emerald-400' },
  Medium: { bg: 'rgba(245,158,11,0.12)', border: 'border-amber-400/40', text: 'text-amber-400' },
  default: { bg: 'rgba(251,146,60,0.12)', border: 'border-cyan-400/40', text: 'text-cyan-400' },
};

const SkeletonCard = () => (
  <div className="bg-[#1F0E0E]/70 border border-[#F87171]/15 rounded-[24px] p-[28px] animate-pulse">
    <div className="flex justify-between items-start mb-[16px]">
      <div className="h-[24px] w-[80px] bg-[#2B1212] rounded-[99px]" />
      <div className="h-[16px] w-[60px] bg-[#2B1212] rounded" />
    </div>
    <div className="h-[22px] w-3/4 bg-[#2B1212] rounded mb-[12px]" />
    <div className="flex gap-[8px] mb-[20px]">
      <div className="h-[26px] w-[80px] bg-[#2B1212] rounded-[8px]" />
      <div className="h-[26px] w-[90px] bg-[#2B1212] rounded-[8px]" />
    </div>
    <div className="border-t border-[#F87171]/8 pt-[16px] flex justify-between">
      <div className="h-[20px] w-[100px] bg-[#2B1212] rounded" />
      <div className="h-[32px] w-[80px] bg-[#2B1212] rounded-[10px]" />
    </div>
  </div>
);

export default function History() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: historyData, isLoading, isError } = useQuery({
    queryKey: ['salary-history'],
    queryFn: () => api.get('/api/salary/history')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/salary/${id}`),
    onSuccess: () => {
      toast.success('Search analysis deleted from history.');
      queryClient.invalidateQueries({ queryKey: ['salary-history'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete search analysis.');
    }
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this analysis from your history?')) {
      deleteMutation.mutate(id);
    }
  };

  const searches = historyData?.data || [];
  const filteredSearches = searches.filter(item =>
    item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen pt-[96px] pb-[80px] px-[24px] relative overflow-hidden bg-[#130608]">
      <div className="absolute top-[10%] -left-[10%] w-[400px] h-[400px] bg-[#F87171]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] -right-[10%] w-[400px] h-[400px] bg-[#FB923C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[860px] mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-[6px] text-[13px] font-[700] text-[#FECACA]/40 hover:text-[#F87171] transition-colors mb-[32px] uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Analyzer
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[20px] mb-[40px]">
          <div>
            <p className="text-[12px] font-[800] tracking-[0.15em] text-[#F87171] uppercase mb-[8px]">Recent Searches</p>
            <h1 className="text-[32px] md:text-[40px] font-[900] text-white tracking-tight uppercase">Search History</h1>
            <p className="text-[14px] text-[#FECACA]/40 mt-[6px] font-[500]">Review your previously generated salary analyses</p>
          </div>
          {searches.length > 0 && (
            <div className="relative w-full md:w-[280px] shrink-0">
              <Search size={15} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#FECACA]/30" />
              <input type="text" placeholder="Filter by role or city..."
                className="w-full pl-[40px] pr-[16px] py-[12px] text-[13px] font-[600] bg-[#1F0E0E]/70 border-[1.5px] border-[#F87171]/20 rounded-[14px] text-white placeholder:text-[#FECACA]/25 focus:outline-none focus:border-[#F87171] focus:shadow-[0_0_14px_rgba(248,113,113,0.2)] transition-all"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          )}
        </div>

        {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">{[1,2,3,4].map(i => <SkeletonCard key={i} />)}</div>}

        {isError && (
          <div className="text-center py-[48px] bg-red-500/10 border border-red-500/25 rounded-[20px]">
            <p className="text-[15px] text-red-400 font-[700]">Failed to load history. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && searches.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-[64px] bg-[#1F0E0E]/70 border border-[#F87171]/25 rounded-[28px] shadow-[0_0_36px_rgba(248,113,113,0.1)] max-w-[480px] mx-auto flex flex-col items-center gap-[22px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#2B1212] border border-[#F87171]/35 flex items-center justify-center shadow-lg relative">
              <div className="absolute inset-0 rounded-full blur-[8px] bg-[#F87171]/8" />
              <Clock size={36} className="text-[#F87171]" />
            </div>
            <div>
              <h3 className="text-[22px] font-[900] text-white mb-[8px] uppercase tracking-tight">No Analyses Yet</h3>
              <p className="text-[14px] font-[500] text-[#FECACA]/45 max-w-[300px] mx-auto leading-[1.7]">Your salary analyses will appear here once you run one.</p>
            </div>
            <Link to="/"
              className="inline-flex items-center gap-[8px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] px-[26px] py-[13px] rounded-[12px] font-[900] text-[14px] shadow-[0_0_18px_rgba(248,113,113,0.35)] hover:shadow-[0_0_28px_rgba(248,113,113,0.5)] hover:-translate-y-[2px] transition-all">
              Start First Analysis →
            </Link>
          </motion.div>
        )}

        {!isLoading && filteredSearches.length === 0 && searches.length > 0 && (
          <div className="text-center py-[48px] text-[#FECACA]/30 text-[14px] font-[600]">
            No results for "<span className="text-[#FECACA]/60 font-[850]">{searchTerm}</span>"
          </div>
        )}

        {!isLoading && filteredSearches.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {filteredSearches.map((item) => {
              const conf = confidenceConfig[item.confidence] || confidenceConfig.default;
              return (
                <motion.div key={item._id} variants={itemVariants}
                  className="bg-[#1F0E0E]/70 border-[1.5px] border-[#F87171]/20 rounded-[24px] p-[28px] hover:border-[#F87171] hover:shadow-[0_0_26px_rgba(248,113,113,0.18)] hover:-translate-y-[4px] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  onClick={() => navigate(`/result/${item._id}`)}>
                  <div>
                    <div className="flex items-center justify-between mb-[14px]">
                      <span className={`text-[11px] font-[800] px-[10px] py-[4px] rounded-[99px] border ${conf.border} ${conf.bg} ${conf.text} uppercase tracking-wider`}
                        style={{ background: conf.bg }}>
                        {item.confidence || 'Estimated'} Range
                      </span>
                      <span className="text-[11px] font-[600] text-[#FECACA]/30 flex items-center gap-[5px]">
                        <Clock size={11} className="text-[#FB923C]" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-[900] text-white group-hover:text-[#F87171] transition-colors line-clamp-1 mb-[12px] uppercase tracking-tight">{item.role}</h3>
                    <div className="flex flex-wrap gap-[7px] mb-[18px]">
                      <span className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-[8px] bg-[#2B1212] border border-[#F87171]/18 text-[#FECACA]/60 text-[12px] font-[700]">
                        <MapPin size={11} className="text-[#FB7185]" /> {item.city}
                      </span>
                      <span className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-[8px] bg-[#2B1212] border border-[#F87171]/18 text-[#FECACA]/60 text-[12px] font-[700]">
                        <Briefcase size={11} className="text-[#FB923C]" /> {item.experience === 0 ? 'Fresher' : `${item.experience} Yrs`}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#F87171]/10 pt-[14px] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-[800] text-[#FECACA]/30 uppercase tracking-wider mb-[3px]">Target Salary</div>
                      <div className="text-[16px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-[#F87171] to-[#FB923C]">
                        {formatSalary(item.suggestedRange?.mid * 100000)}
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <button onClick={(e) => handleDelete(e, item._id)}
                        className="inline-flex items-center justify-center text-red-400 hover:text-white border border-red-500/20 bg-red-950/10 hover:bg-[#FB7185] p-[8px] rounded-[10px] transition-all cursor-pointer"
                        title="Delete from history"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={13} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/result/${item._id}`); }}
                        className="inline-flex items-center gap-[6px] text-[12px] font-[800] text-[#FECACA] border border-[#F87171]/25 bg-[#2B1212] hover:bg-gradient-to-r hover:from-[#F87171] hover:to-[#FB923C] hover:text-[#130608] hover:border-transparent px-[14px] py-[8px] rounded-[10px] transition-all uppercase">
                        <Eye size={13} /> View
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
