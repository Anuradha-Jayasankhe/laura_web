'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Autonomously open the WhatsApp chat drawer after 4 seconds to catch the user's attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatOpen(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 0',
      minHeight: '72vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* 1. Full-bleed Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src="/videos/Woman_in_lavender_dress_walking_202605270800.mp4" type="video/mp4" />
      </video>

      {/* 2. Premium Light Gradient Overlay - left fading to fully transparent on the right to preserve original video quality */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0) 70%)',
        zIndex: 2
      }} />

      {/* 3. Hero content wrapper */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '680px', animation: 'fadeInUp 0.8s ease-out' }}>
          
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '5px',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Elegance . Quality . You.
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            fontWeight: '400',
            lineHeight: '1.12',
            color: 'var(--color-text)',
            marginBottom: '24px'
          }}>
            Embrace Your <br />
            <span className="purple" style={{ 
              fontFamily: 'var(--font-serif)', 
              fontStyle: 'italic',
              fontWeight: '500'
            }}>Own Style</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '18px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.8',
            marginBottom: '40px',
            maxWidth: '560px'
          }}>
            Trendy designs at unbeatable prices. Made to make you feel beautiful, every day.
          </p>

          {/* CTA Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '18px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <a href="/new-arrivals" className="btn btn-primary" style={{ padding: '18px 38px' }}>
              SHOP NEW ARRIVALS
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="/collections" className="btn btn-outline" style={{ padding: '18px 38px', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(5px)' }}>
              EXPLORE COLLECTIONS
            </a>
          </div>

          {/* Social Proof Star Ratings */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(112, 15, 92, 0.1)',
            maxWidth: '500px'
          }}>
            {/* Overlapping avatars */}
            <div style={{ display: 'flex' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                  marginLeft: i > 1 ? '-10px' : '0',
                  backgroundColor: '#eadeeb',
                  background: 'linear-gradient(135deg, #fceeff 0%, #eadeeb 100%)',
                  boxShadow: '0 4px 8px rgba(112, 15, 92, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'var(--color-primary)'
                }}>
                  {['🌸', '✨', '👗', '💃'][i - 1]}
                </div>
              ))}
            </div>

            {/* Stars */}
            <div>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" fill="var(--color-star)" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  marginLeft: '6px',
                  color: 'var(--color-text)'
                }}>4.9/5</span>
              </div>
              <p style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                fontWeight: '500'
              }}>Trusted by 10,000+ Happy Customers</p>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Interactive WhatsApp Widget */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '16px',
        fontFamily: 'var(--font-sans)'
      }}>
        {/* Chat window */}
        {isChatOpen && (
          <div style={{
            width: '320px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            border: '1px solid #f2e6f1',
            animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}>
            <div style={{
              backgroundColor: 'var(--color-primary)',
              padding: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🌸
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'var(--font-sans)' }}>WhatsApp to Order</h4>
                  <span style={{ fontSize: '11px', color: '#f3e6f1' }}>Replied instantly</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', padding: 0 }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#faf6f9' }}>
              <div style={{
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '12px 12px 12px 0',
                fontSize: '14px',
                color: 'var(--color-text)',
                boxShadow: '0 2px 8px rgba(112, 15, 92, 0.02)',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Hi! 👋 <br />
                Welcome to Laura Premium. How can we help you secure your perfect look today?
              </div>

              <a 
                href="https://wa.me/94771234567?text=Hi%20Laura%2C%20I%20am%20browsing%20your%20website%20and%20would%20love%20to%20order%20some%20items!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  boxShadow: 'none',
                  fontSize: '14px'
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
                CHAT NOW
              </a>
            </div>
          </div>
        )}

        {/* WhatsApp Icon Circle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-whatsapp)',
            border: 'none',
            boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            transition: 'var(--transition)',
            position: 'relative'
          }}
          className="whatsapp-btn"
          aria-label="WhatsApp Order Chat"
        >
          {/* Animated pulse ring */}
          <div style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid var(--color-whatsapp)',
            animation: 'pulse-ring 2s infinite',
            pointerEvents: 'none'
          }} />
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
        </button>
      </div>

      <style jsx global>{`
        .whatsapp-btn:hover {
          background-color: var(--color-whatsapp-hover) !important;
          transform: scale(1.08);
        }
      `}</style>
    </section>
  )
}
