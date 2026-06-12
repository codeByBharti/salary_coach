import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SalaryForm from '../components/SalaryForm';
import HowItWorks from '../components/HowItWorks';
import TrendingRoles from '../components/TrendingRoles';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'Zepto', 'Meesho', 'PhonePe', 'Freshworks', 'Zoho', 'Infosys', 'Wipro', 'Paytm', "BYJU'S", 'Ola', 'Zomato', 'CRED'];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#130608]">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* ── Company Marquee ── */}
        <div className="py-[24px] bg-[#1F0E0E]/50 border-y border-[#F87171]/10 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-[120px] z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #130608, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-[120px] z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #130608, transparent)' }} />

          <p className="text-center text-[11px] font-[800] tracking-[0.2em] text-[#F87171]/30 uppercase mb-[14px]">
            Professionals from top companies use SalaryCoach to negotiate
          </p>

          <div className="flex items-center whitespace-nowrap"
            style={{ animation: 'marquee 35s linear infinite' }}>
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <span key={i}
                className="inline-flex items-center gap-[16px] px-[28px] text-[14px] font-[700] text-[#F87171]/40 hover:text-[#F87171] transition-colors cursor-default whitespace-nowrap">
                {company}
                <span className="text-[#F87171]/15">·</span>
              </span>
            ))}
          </div>

          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        <SalaryForm />
        <HowItWorks />
        <TrendingRoles />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
