import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    stars: 5,
    badge: "+15% hike",
    quote: "The negotiation script gave me the confidence to ask for 15% more — and I got it.",
    author: "Karan V.",
    role: "Frontend Developer",
    city: "Noida"
  },
  {
    stars: 5,
    badge: "+₹2L package",
    quote: "I had no idea I was underpaid by 30%. This tool opened my eyes and I negotiated confidently.",
    author: "Priya S.",
    role: "Data Analyst",
    city: "Pune"
  },
  {
    stars: 5,
    badge: "Offer revised",
    quote: "Sent the email template to HR and got my offer revised within 24 hours. Amazing!",
    author: "Rahul M.",
    role: "Product Manager",
    city: "Bangalore"
  },
  {
    stars: 5,
    badge: "+₹3L package",
    quote: "Used the email script word for word. HR came back with a revised offer the same evening.",
    author: "Sneha R.",
    role: "Backend Developer",
    city: "Bangalore"
  },
  {
    stars: 5,
    badge: "Dream offer",
    quote: "From ₹6L to ₹9L in one negotiation. The market insight section was an eye opener.",
    author: "Arjun T.",
    role: "Full Stack Developer",
    city: "Mumbai"
  }
];

const Testimonials = React.memo(() => (
  <section className="py-[60px] px-[24px] overflow-hidden relative bg-[#130608]">
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

      {/* Marquee Wrapper */}
      <div 
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <style>{`
          @keyframes testimonialScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scrolling-track {
            animation: testimonialScroll 25s linear infinite;
          }
          .scrolling-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Left fade div */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(to right, #130608, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Right fade div */}
        <div 
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(to left, #130608, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Inner scrolling track */}
        <div 
          className="scrolling-track"
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
          }}
        >
          {/* Render 10 cards total (original 5 duplicated once) for seamless scrolling */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.15, duration: 0.5 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,100,80,0.15)',
                borderRadius: '16px',
                padding: '20px',
                minWidth: '280px',
                maxWidth: '280px',
                flexShrink: 0
              }}
            >
              {/* TOP — Stars + badge in same row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '3px', color: '#FF6450', fontSize: '13px' }}>
                  {[...Array(t.stars)].map((_, starIndex) => (
                    <Star key={starIndex} size={13} className="fill-[#FF6450] text-[#FF6450]" />
                  ))}
                </div>
                <div
                  style={{
                    background: 'rgba(255,100,80,0.15)',
                    border: '1px solid rgba(255,100,80,0.3)',
                    color: '#FF9080',
                    borderRadius: '99px',
                    padding: '3px 10px',
                    fontSize: '11px'
                  }}
                >
                  {t.badge}
                </div>
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: '1.6',
                  margin: '12px 0',
                  fontStyle: 'italic'
                }}
              >
                "{t.quote}"
              </p>

              {/* Author row (bottom) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {/* Avatar circle */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,100,80,0.2)',
                    border: '1px solid rgba(255,100,80,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#FF9080'
                  }}
                >
                  {t.author.charAt(0)}
                </div>

                <div>
                  {/* Author name */}
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'white'
                    }}
                  >
                    {t.author}
                  </div>
                  {/* Role + City */}
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {t.role} · {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

Testimonials.displayName = 'Testimonials';
export default Testimonials;
