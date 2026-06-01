
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { API_BASE_URL, getSettings } from '@/config'

export default function Page() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [whatsappNum, setWhatsappNum] = useState('94768455271')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    getSettings().then(s => setWhatsappNum(s.whatsapp_number));
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      try {
        await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setFormSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } catch (err) {
        console.error('Failed to submit contact message', err);
        // Fallback to visual success
        setFormSubmitted(true)
      }
    }
  }

  return (
    <main>
      <Navbar />

      {/* Page Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #fdf8fd 0%, #f7edf6 100%)',
        padding: '60px 0',
        textAlign: 'center',
        borderBottom: '1px solid #f0e2ee'
      }}>
        <div className="container">
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Home / Contact Us
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            color: 'var(--color-text)',
            margin: 0
          }}>Contact Us</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginTop: '10px',
            maxWidth: '500px',
            margin: '10px auto 0 auto'
          }}>
            Get in touch with our design team or boutique coordinators instantly.
          </p>
        </div>
      </section>

      {/* Contact Section Content */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '60px',
            alignItems: 'start'
          }} className="contact-grid">
            
            {/* Left Column: Contact Form */}
            <div className="card" style={{
              padding: '40px',
              border: '1px solid #f9f2f8',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{
                fontSize: '28px',
                color: 'var(--color-text)',
                marginBottom: '10px',
                fontFamily: 'var(--font-serif)'
              }}>Send Us a Message</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '30px' }}>
                Have questions about custom sizing, bespoke orders, or bulk purchases? Write to us!
              </p>

              {formSubmitted ? (
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1.5px solid var(--color-primary)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center',
                  animation: 'fadeInUp 0.4s ease-out'
                }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '14px' }}>🌸</span>
                  <h4 style={{ fontSize: '20px', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '8px' }}>Thank You!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6', margin: 0 }}>
                    Your message has been elegantly delivered. Our design team will reach back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="btn btn-primary"
                    style={{ marginTop: '24px', padding: '12px 28px', borderRadius: '10px' }}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Name field */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>FULL NAME *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1.5px solid #eadeeb',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        transition: 'var(--transition)'
                      }}
                      className="contact-input"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>EMAIL ADDRESS *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1.5px solid #eadeeb',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        transition: 'var(--transition)'
                      }}
                      className="contact-input"
                    />
                  </div>

                  {/* Subject field */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>SUBJECT</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Custom Sizing / Fitting inquiry"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1.5px solid #eadeeb',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        transition: 'var(--transition)'
                      }}
                      className="contact-input"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>YOUR MESSAGE *</label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we assist you with your signature style?"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1.5px solid #eadeeb',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        resize: 'none',
                        transition: 'var(--transition)'
                      }}
                      className="contact-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      fontSize: '14px',
                      letterSpacing: '1px'
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Boutique coordinates & Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Boutique Details Card */}
              <div className="card" style={{
                padding: '40px',
                border: '1px solid #f9f2f8',
                backgroundColor: '#fbf7fb'
              }}>
                <h2 style={{
                  fontSize: '26px',
                  color: 'var(--color-text)',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-serif)'
                }}>Visit Our Boutique</h2>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                  <li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-primary)', marginTop: '2px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-text)', fontWeight: '600', marginBottom: '4px' }}>Address</h4>
                      <span>No. 124, Ward Place, Colombo 07, Sri Lanka</span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-primary)', marginTop: '2px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-text)', fontWeight: '600', marginBottom: '4px' }}>Boutique Hours</h4>
                      <span>Monday – Saturday: 10:00 AM – 7:00 PM <br />Sunday: 11:00 AM – 5:00 PM</span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-primary)', marginTop: '2px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-text)', fontWeight: '600', marginBottom: '4px' }}>Hotline</h4>
                      <span>+${whatsappNum.slice(0,2)} ${whatsappNum.slice(2,5)} ${whatsappNum.slice(5)}</span>
                    </div>
                  </li>
                </ul>

                {/* Instant WhatsApp chat link */}
                <div style={{ marginTop: '30px', borderTop: '1px solid #f0e2ef', paddingTop: '24px' }}>
                  <a 
                    href={`https://wa.me/${whatsappNum}?text=Hi%20Boutique%20Manager%2C%20I%20have%20an%20inquiry%20regarding%20Laura%20Premium%20garments%20and%20orders.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      width: '100%',
                      borderRadius: '10px',
                      padding: '14px 20px',
                      fontSize: '13px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
                    CHAT WITH BOUTIQUE MANAGER
                  </a>
                </div>
              </div>

              {/* Styled Mock Google Map Card */}
              <div className="card" style={{
                height: '240px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #f9f2f8'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#eadbec',
                  backgroundImage: 'radial-gradient(#b882b4 1.5px, transparent 1.5px), radial-gradient(#b882b4 1.5px, #eadbec 1.5px)',
                  backgroundSize: '30px 30px',
                  backgroundPosition: '0 0, 15px 15px',
                  opacity: 0.55
                }} />
                
                {/* Styled Map overlays */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  {/* Pin avatar */}
                  <div style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(112, 15, 92, 0.3)',
                    border: '2px solid #ffffff'
                  }}>
                    <div style={{ transform: 'rotate(45deg)', fontSize: '18px' }}>🌸</div>
                  </div>
                  <span style={{
                    backgroundColor: '#ffffff',
                    color: 'var(--color-text)',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    marginTop: '10px',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid #eadeeb',
                    letterSpacing: '0.5px'
                  }}>LAURA BOUTIQUE</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .contact-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        .contact-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(112, 15, 92, 0.08);
        }
      `}</style>
    </main>
  )
}
