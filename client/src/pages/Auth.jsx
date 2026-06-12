import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, User, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Auth() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  // Already logged in — go home
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
      }

      if (result.success) {
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        navigate(redirectPath, { replace: true });
      } else {
        toast.error(result.message || 'Authentication failed.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#130608] flex items-center justify-center px-[24px] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-[#F87171]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-[#FB923C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#F87171 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px] bg-[#1F0E0E]/70 backdrop-blur-xl border-[2px] border-[#FB923C]/25 rounded-[28px] p-[32px] sm:p-[40px] shadow-[0_0_50px_rgba(248,113,113,0.12)] relative z-10"
      >
        <div className="text-center mb-[32px]">
          <span className="text-[28px] mb-[12px] block">💼</span>
          <h2 className="text-[28px] sm:text-[32px] font-[900] text-white tracking-tight uppercase leading-none mb-[8px]">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#FECACA]/50 font-[500]">
            {isLogin ? 'Enter your details to access your salary coach' : 'Register now to start analyzing your market value'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          {/* Name Field (Sign Up Only) */}
          {!isLogin && (
            <div>
              <label className="block text-[11px] font-[800] text-[#FECACA]/60 uppercase tracking-wider mb-[8px]">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#FECACA]/30" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-[42px] pr-[16px] py-[12px] bg-[#130608]/80 border-[1.5px] border-[#F87171]/25 focus:border-[#FB923C] focus:shadow-[0_0_15px_rgba(248,113,113,0.2)] rounded-[12px] text-[14px] text-white placeholder:text-[#FECACA]/25 focus:outline-none transition-all"
                  style={{ color: '#ffffff' }}
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-[800] text-[#FECACA]/60 uppercase tracking-wider mb-[8px]">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#FECACA]/30" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-[42px] pr-[16px] py-[12px] bg-[#130608]/80 border-[1.5px] border-[#F87171]/25 focus:border-[#FB923C] focus:shadow-[0_0_15px_rgba(248,113,113,0.2)] rounded-[12px] text-[14px] text-white placeholder:text-[#FECACA]/25 focus:outline-none transition-all"
                style={{ color: '#ffffff' }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[11px] font-[800] text-[#FECACA]/60 uppercase tracking-wider mb-[8px]">Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#FECACA]/30" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-[42px] pr-[16px] py-[12px] bg-[#130608]/80 border-[1.5px] border-[#F87171]/25 focus:border-[#FB923C] focus:shadow-[0_0_15px_rgba(248,113,113,0.2)] rounded-[12px] text-[14px] text-white placeholder:text-[#FECACA]/25 focus:outline-none transition-all"
                style={{ color: '#ffffff' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] rounded-[12px] text-[14px] font-[900] cursor-pointer shadow-[0_0_20px_rgba(248,113,113,0.3)] hover:shadow-[0_0_30px_rgba(248,113,113,0.5)] hover:-translate-y-[2px] transition-all flex items-center justify-center gap-[8px]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Sparkles size={16} />
                <span>{isLogin ? 'SIGN IN' : 'GET STARTED'}</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-[24px]">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[13px] font-[700] text-[#FECACA]/50 hover:text-[#F87171] transition-all underline decoration-dotted"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
