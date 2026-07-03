import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#130608',
        padding: '0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* MAIN FOOTER CARD */}
      <div
        className="footer-card"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          margin: '32px 24px',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .footer-card {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
          .footer-icon-btn:hover {
            border-color: rgba(248,113,113,0.5) !important;
            color: white !important;
          }
          .footer-back-top:hover {
            color: white !important;
            border-color: rgba(248,113,113,0.4) !important;
          }
          .footer-link:hover {
            color: rgba(248,113,113,0.9) !important;
          }
        `}</style>

        {/* LEFT COLUMN — Brand */}
        <div>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div
              className="text-[20px] font-[800] tracking-tight bg-gradient-to-r from-[#F87171] via-[#FB923C] to-[#FB7185] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(248,113,113,0.4)]"
              style={{ marginBottom: '12px' }}
            >
              💼 SalaryCoach
            </div>
          </Link>

          {/* Tagline */}
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: '1.7',
              maxWidth: '240px',
              marginBottom: '24px',
            }}
          >
            Empowering Indian professionals with AI-powered salary insights and negotiation tools.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[
              { label: '𝕏', href: '#' },
              { label: 'in', href: '#' },
              { label: '<>', href: '#' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="footer-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'rgba(255,255,255,0.5)',
                  marginRight: '8px',
                  cursor: 'pointer',
                  transition: '0.2s',
                  textDecoration: 'none',
                }}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            className="footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              marginTop: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.45)',
              background: 'transparent',
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            ↑ BACK TO TOP
          </button>
        </div>

        {/* CENTER COLUMN — Site Map */}
        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '20px',
              letterSpacing: '0.02em',
            }}
          >
            Site Map
          </div>
          <div>
            <a
              href="#analyze"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Analyze Salary
            </a>
            <a
              href="#how-it-works"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              How It Works
            </a>
            <a
              href="#trending"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Trending Roles
            </a>
            <Link
              to="/history"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Search History
            </Link>
            <a
              href="#"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              About
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — Legal */}
        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '20px',
              letterSpacing: '0.02em',
            }}
          >
            Legal
          </div>
          <div>
            <a
              href="#"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="footer-link"
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '12px',
                transition: '0.2s',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 24px 24px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.2)',
        }}
      >
        © 2025 SalaryCoach. Built with ❤️ for Indian professionals.
      </div>
    </footer>
  );
}
