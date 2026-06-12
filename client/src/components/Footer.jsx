import { Link } from 'react-router-dom';
import { Code2, Briefcase, MessageCircle, Heart } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Analyze Market Value', href: '#analyze' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Trending Roles', href: '#trending' },
    { label: 'Search History', to: '/history' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-[#130608] pt-[72px] pb-[28px] px-[24px] border-t border-[#F87171]/12 relative overflow-hidden">
      <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[240px] bg-[#F87171]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="flex flex-wrap justify-between gap-[40px] mb-[48px]">
          <div className="max-w-[260px]">
            <Link to="/" className="inline-block mb-[12px]">
              <span className="text-[21px] font-[900] bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] bg-clip-text text-transparent">
                💼 SalaryCoach
              </span>
            </Link>
            <p className="text-[13px] text-[#FECACA]/40 leading-[1.75] mb-[18px]">AI-powered salary insights and word-for-word negotiation scripts. Free forever.</p>
            <div className="flex gap-[8px]">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-[36px] h-[36px] rounded-[10px] border border-[#F87171]/20 bg-[#1F0E0E]/70 flex items-center justify-center text-[#FECACA]/40 hover:border-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-[56px] flex-wrap">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="min-w-[120px]">
                <h4 className="text-[11px] font-[800] text-[#F87171]/70 uppercase tracking-[0.15em] mb-[18px]">{section}</h4>
                <ul className="flex flex-col gap-[10px]">
                  {links.map(link => (
                    <li key={link.label}>
                      {link.to
                        ? <Link to={link.to} className="text-[13px] text-[#FECACA]/40 hover:text-[#F87171] transition-colors font-[500]">{link.label}</Link>
                        : <a href={link.href} className="text-[13px] text-[#FECACA]/40 hover:text-[#F87171] transition-colors font-[500]">{link.label}</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#F87171]/8 pt-[22px] flex flex-col md:flex-row items-center justify-between gap-[10px]">
          <p className="text-[12px] text-[#FECACA]/25 font-[500]">© {new Date().getFullYear()} SalaryCoach. Free forever. Built for Indian professionals.</p>
          <p className="text-[12px] text-[#FECACA]/25 flex items-center gap-[5px] font-[500]">Made with <Heart size={12} className="text-[#F87171] fill-[#F87171] animate-pulse" /> in India</p>
        </div>
      </div>
    </footer>
  );
}
