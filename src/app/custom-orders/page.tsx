
'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bespokeSteps = [
  {
    step: '01',
    title: 'Measurement Profile',
    desc: 'Submit your bespoke fitting measurements and fabric specifications using our secure profile form.'
  },
  {
    step: '02',
    title: 'Tailor Consultation',
    desc: 'Our boutique head designer connects with you via WhatsApp to align on design drafts, fabrics, and styling details.'
  },
  {
    step: '03',
    title: 'Artisanal Sewing',
    desc: 'Each custom garment is drafted, hand-cut, and meticulously stitched in our boutique studio in Colombo.'
  },
  {
    step: '04',
    title: 'Islandwide Delivery',
    desc: 'Your tailored masterpiece is safely delivered to your doorstep islandwide. COD and fitting adjustments are available.'
  }
]

export default function Page() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    garmentType: 'Casual Dress',
    fabric: 'Linen',
    bust: '',
    waist: '',
    hips: '',
    height: '',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      setFormSubmitted(true)
    }
  }

  // Pre-formatted WhatsApp link with custom measurements details
  const formattedWhatsappMsg = `Hi Laura Premium! I have submitted a Bespoke Custom Order request:\n\n*Name:* ${formData.name}\n*WhatsApp:* ${formData.phone}\n*Garment Type:* ${formData.garmentType}\n*Fabric Preference:* ${formData.fabric}\n\n*Measurements:*\n- Bust: ${formData.bust || 'N/A'} inches\n- Waist: ${formData.waist || 'N/A'} inches\n- Hips: ${formData.hips || 'N/A'} inches\n- Height: ${formData.height || 'N/A'} inches\n\n*Style Notes:* ${formData.notes || 'None'}`
  const whatsappUrl = `https://wa.me/94771234567?text=${encodeURIComponent(formattedWhatsappMsg)}`

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
            Home / Bespoke
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            color: 'var(--color-text)',
            margin: 0
          }}>Bespoke Custom Fitting</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginTop: '10px',
            maxWidth: '500px',
            margin: '10px auto 0 auto'
          }}>
            Experience the ultimate luxury of clothing hand-tailored to your exact measurement profile.
          </p>
        </div>
      </section>

      {/* Bespoke Form & Timeline content */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '60px',
            alignItems: 'start'
          }} className="bespoke-grid">
            
            {/* Left Column: Form */}
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
              }}>Measurement Profile</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '30px' }}>
                Fill out your desired garment type, material, and body measurements. Submit to share directly with our head tailor.
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
                  <h4 style={{ fontSize: '20px', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '8px' }}>Profile Created!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6', marginBottom: '24px' }}>
                    Your custom measurement profile is complete. Click the button below to send your metrics to our tailor on WhatsApp and lock in your order slot.
                  </p>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      width: '100%',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
                    SEND PROFILE TO TAILOR
                  </a>
                  
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginTop: '20px',
                      textDecoration: 'underline'
                    }}
                  >
                    Edit Measurement Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Basic Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>YOUR NAME *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px' }}
                        className="bespoke-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>WHATSAPP NUMBER *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+94 77 123 4567"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px' }}
                        className="bespoke-input"
                      />
                    </div>
                  </div>

                  {/* Garment details */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>GARMENT TYPE</label>
                      <select 
                        name="garmentType"
                        value={formData.garmentType}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', backgroundColor: '#fff', cursor: 'pointer' }}
                      >
                        <option>Casual Dress</option>
                        <option>Evening Gown</option>
                        <option>Tailored Blazer</option>
                        <option>Boutique Top</option>
                        <option>Bespoke Bridal Gown</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>FABRIC PREFERENCE</label>
                      <select 
                        name="fabric"
                        value={formData.fabric}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', backgroundColor: '#fff', cursor: 'pointer' }}
                      >
                        <option>Linen</option>
                        <option>Premium Silk</option>
                        <option>Boutique Crepe</option>
                        <option>Handloom Cotton</option>
                        <option>Luxury Organza</option>
                      </select>
                    </div>
                  </div>

                  {/* Body Measurements Grid */}
                  <div style={{ borderTop: '1px solid #f6edf5', paddingTop: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text)', display: 'block', marginBottom: '14px', letterSpacing: '0.5px' }}>BODY MEASUREMENTS (INCHES):</span>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="measurements-row">
                      <div>
                        <label style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>BUST</label>
                        <input 
                          type="number" 
                          name="bust"
                          value={formData.bust}
                          onChange={handleInputChange}
                          placeholder="34"
                          style={{ width: '100%', padding: '12px 8px', borderRadius: '8px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', textAlign: 'center' }}
                          className="bespoke-input"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>WAIST</label>
                        <input 
                          type="number" 
                          name="waist"
                          value={formData.waist}
                          onChange={handleInputChange}
                          placeholder="26"
                          style={{ width: '100%', padding: '12px 8px', borderRadius: '8px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', textAlign: 'center' }}
                          className="bespoke-input"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>HIPS</label>
                        <input 
                          type="number" 
                          name="hips"
                          value={formData.hips}
                          onChange={handleInputChange}
                          placeholder="36"
                          style={{ width: '100%', padding: '12px 8px', borderRadius: '8px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', textAlign: 'center' }}
                          className="bespoke-input"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>HEIGHT</label>
                        <input 
                          type="number" 
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          placeholder="64"
                          style={{ width: '100%', padding: '12px 8px', borderRadius: '8px', border: '1.5px solid #eadeeb', outline: 'none', fontSize: '13px', textAlign: 'center' }}
                          className="bespoke-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Extra notes */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>STYLE REQUESTS / SPECIAL INSTRUCTIONS</label>
                    <textarea 
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Please add floral embroidery on the sleeve cuff, style inspired by our Lavender Sundress."
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1.5px solid #eadeeb',
                        outline: 'none',
                        fontSize: '13px',
                        fontFamily: 'var(--font-sans)',
                        resize: 'none'
                      }}
                      className="bespoke-input"
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
                    GENERATE BESPOKE PROFILE
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Timeline process */}
            <div>
              <div style={{ paddingLeft: '20px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', color: 'var(--color-text)', fontFamily: 'var(--font-serif)', marginBottom: '10px' }}>Bespoke Crafting Process</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Every single item customized is guided through our strict boutique quality workflow.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {bespokeSteps.map((s, i) => (
                  <div key={i} className="card" style={{
                    padding: '24px 30px',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'start',
                    border: '1px solid #f9f2f8'
                  }}>
                    <span style={{
                      fontSize: '26px',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-serif)',
                      opacity: 0.35,
                      lineHeight: 1
                    }}>{s.step}</span>
                    
                    <div>
                      <h4 style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '6px'
                      }}>{s.title}</h4>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.6',
                        margin: 0
                      }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .bespoke-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 1024px) {
          .bespoke-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        .bespoke-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(112, 15, 92, 0.08);
        }
        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .measurements-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </main>
  )
}
