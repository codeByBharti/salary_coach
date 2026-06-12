import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-screen z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#130608]/95 backdrop-blur-xl border-b border-[#F87171]/20 shadow-[0_4px_30px_rgba(248,113,113,0.1)]'
            : 'bg-gradient-to-b from-[#130608]/90 via-[#130608]/50 to-transparent'
        }`}
      >
        <div className="w-full max-w-none px-[12px] sm:px-[24px] md:px-[48px] lg:px-[64px] xl:px-[96px] h-[70px] flex items-center justify-between gap-[8px] sm:gap-[16px]">

          {/* LEFT: Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-[18px] sm:text-[22px] font-[900] tracking-tight bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(248,113,113,0.4)] hover:opacity-90 transition-opacity">
              💼 SalaryCoach
            </span>
          </Link>

          {/* RIGHT: All nav links + CTA grouped together (Always visible on all screens!) */}
          <div className="flex items-center gap-[4px] sm:gap-[10px] overflow-x-auto scrollbar-none py-1">

            {/* How it Works Button */}
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center text-[11px] sm:text-[13px] font-[800] border border-[#F87171]/40 text-[#FECACA] bg-[#F87171]/8 hover:bg-gradient-to-r hover:from-[#F87171] hover:to-[#FB923C] hover:text-[#130608] hover:border-transparent px-[8px] sm:px-[16px] py-[6px] sm:py-[9px] rounded-[8px] sm:rounded-[10px] cursor-pointer transition-all duration-200 whitespace-nowrap"
            >
              How it Works
            </button>

            {/* Trending Button */}
            <button
              onClick={() => scrollToSection('trending')}
              className="flex items-center text-[11px] sm:text-[13px] font-[800] border border-[#F87171]/40 text-[#FECACA] bg-[#F87171]/8 hover:bg-gradient-to-r hover:from-[#F87171] hover:to-[#FB923C] hover:text-[#130608] hover:border-transparent px-[8px] sm:px-[16px] py-[6px] sm:py-[9px] rounded-[8px] sm:rounded-[10px] cursor-pointer transition-all duration-200 whitespace-nowrap"
            >
              Trending
            </button>

            {/* History Link */}
            <Link
              to="/history"
              className="flex items-center text-[11px] sm:text-[13px] font-[800] border border-[#F87171]/40 text-[#FECACA] bg-[#F87171]/8 hover:bg-gradient-to-r hover:from-[#F87171] hover:to-[#FB923C] hover:text-[#130608] hover:border-transparent px-[8px] sm:px-[16px] py-[6px] sm:py-[9px] rounded-[8px] sm:rounded-[10px] transition-all duration-200 whitespace-nowrap"
            >
              History
            </Link>

            {/* Divider */}
            <div className="w-[1px] h-[20px] sm:h-[24px] bg-[#F87171]/20 mx-[2px] shrink-0" />

            {/* Primary CTA */}
            <button
              onClick={() => scrollToSection('analyze')}
              className="flex items-center text-[11px] sm:text-[14px] font-[900] bg-gradient-to-r from-[#F87171] to-[#FB923C] text-[#130608] rounded-[8px] sm:rounded-[10px] px-[10px] sm:px-[22px] py-[6px] sm:py-[10px] cursor-pointer shadow-[0_0_18px_rgba(248,113,113,0.4)] hover:shadow-[0_0_28px_rgba(248,113,113,0.65)] hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
            >
              Analyze Salary →
            </button>

            {/* Logout Button */}
            {user && (
              <button
                onClick={logout}
                className="flex items-center text-[11px] sm:text-[13px] font-[800] border border-[#FB7185]/40 text-[#FB7185] bg-[#FB7185]/8 hover:bg-gradient-to-r hover:from-[#FB7185] hover:to-[#F87171] hover:text-[#130608] hover:border-transparent px-[8px] sm:px-[16px] py-[6px] sm:py-[9px] rounded-[8px] sm:rounded-[10px] cursor-pointer transition-all duration-200 whitespace-nowrap"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      </header>

      <div className="pt-[70px]" />
    </>
  );
}
