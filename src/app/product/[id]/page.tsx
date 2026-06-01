
'use client'

import { useState, useEffect, use } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { API_BASE_URL, getSettings, Product } from '@/config'

export default function ProductPage({ params }: { params: any }) {
  // Safeguard Next.js 15 Promise params vs Next.js 14 plain objects
  const unwrappedParams = params && typeof params.then === 'function' ? use(params) as any : params
  const idStr = unwrappedParams?.id || '1'
  const productId = parseInt(idStr) || 1

  const [product, setProduct] = useState<Product | null>(null)
  const [whatsappNum, setWhatsappNum] = useState('94768455271')
  const [loading, setLoading] = useState(true)

  // Stateful interactive configurations
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, settings] = await Promise.all([
          fetch(`${API_BASE_URL}/products/${productId}`),
          getSettings()
        ]);
        
        if (prodRes.ok) {
          const data = await prodRes.json();
          setProduct(data);
        }
        
        setWhatsappNum(settings.whatsapp_number);
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId])

  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQuantity(prev => prev + 1)
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <main>
        <Navbar />
        <section className="section" style={{ backgroundColor: '#ffffff', padding: '120px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)', fontSize: '20px' }}>Loading masterpiece details...</p>
        </section>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main>
        <Navbar />
        <section className="section" style={{ backgroundColor: '#ffffff', padding: '120px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)', fontSize: '20px' }}>Masterpiece not found.</p>
        </section>
        <Footer />
      </main>
    )
  }

  // Pre-calculate total price
  const totalPrice = product.rawPrice * quantity
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20Laura%20Premium%21%20I%20would%20like%20to%20order%20the%20*${encodeURIComponent(product.name)}*%20in%20size%20*${selectedSize}*%20(Quantity%3A%20*${quantity}*).%20Total%20order%20value%3A%20*Rs.%20${totalPrice.toLocaleString()}*.%20Is%20it%20available%3F`

  return (
    <main>
      <Navbar />

      {/* Breadcrumbs header */}
      <div style={{ backgroundColor: '#faf6f9', padding: '16px 0', borderBottom: '1px solid #f2e6f1' }}>
        <div className="container" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
          Home / Collections / {product.category.toLowerCase()} / <span style={{ color: 'var(--color-primary)' }}>{product.name}</span>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '60px',
            alignItems: 'start'
          }} className="product-details-grid">
            
            {/* Left Column: Premium Image Frame */}
            <div style={{ position: 'relative', maxWidth: '480px', width: '100%', margin: '0 auto' }}>
              <div className="card" style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '6px solid #ffffff',
                backgroundColor: '#ffffff'
              }}>
                <div style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  aspectRatio: '0.82',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }} className="product-page-img" />
              </div>

              {/* Floating badges */}
              {product.badge && (
                <span style={{
                  position: 'absolute',
                  top: '25px',
                  left: '25px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '1.2px',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  boxShadow: '0 4px 12px rgba(112, 15, 92, 0.15)',
                  zIndex: 5
                }}>{product.badge}</span>
              )}
            </div>

            {/* Right Column: Interactive Details */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                {product.category}
              </span>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--color-text)',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>{product.name}</h1>

              {/* Live Stars Rating mockup */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="16" height="16" fill="var(--color-star)" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '500' }}>(24 reviews)</span>
              </div>

              {/* Price display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '30px' }}>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  margin: 0
                }}>{product.price}</p>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '500' }}>Inclusive of all taxes</span>
              </div>

              {/* Narrative description */}
              <p style={{
                fontSize: '15px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.8',
                marginBottom: '35px',
                borderBottom: '1px solid #f6edf5',
                paddingBottom: '24px'
              }}>{product.desc}</p>

              {/* Interactive Sizing Chips */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', letterSpacing: '0.8px' }}>SELECT SIZE:</span>
                  <a href="#" style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'underline' }}>Sizing Guide</a>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['S', 'M', 'L', 'XL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        border: selectedSize === sz ? '2px solid var(--color-primary)' : '1.5px solid #eadeeb',
                        backgroundColor: selectedSize === sz ? 'var(--color-primary-light)' : '#ffffff',
                        color: selectedSize === sz ? 'var(--color-primary)' : 'var(--color-text)',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Quantity Increments */}
              <div style={{ marginBottom: '35px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px', letterSpacing: '0.8px' }}>QUANTITY:</span>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1.5px solid #eadeeb',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}>
                  <button 
                    onClick={() => handleQtyChange('dec')}
                    style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text)' }}
                  >-</button>
                  <span style={{ width: '40px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>{quantity}</span>
                  <button 
                    onClick={() => handleQtyChange('inc')}
                    style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text)' }}
                  >+</button>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <div style={{ marginBottom: '45px' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    padding: '18px 24px',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
                  ORDER VIA WHATSAPP (Total: Rs. {totalPrice.toLocaleString()})
                </a>
              </div>

              {/* Dynamic Dialog Tabs Container */}
              <div style={{ border: '1.5px solid #f2e6f1', borderRadius: '16px', overflow: 'hidden' }}>
                {/* Tab buttons */}
                <div style={{ display: 'flex', borderBottom: '1.5px solid #f2e6f1', backgroundColor: '#faf6f9' }}>
                  {['description', 'care', 'shipping'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex: 1,
                        padding: '14px 10px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === tab ? '2.5px solid var(--color-primary)' : 'none',
                        color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      {tab === 'care' ? 'Fabric & Care' : tab === 'shipping' ? 'Shipping' : 'Specifications'}
                    </button>
                  ))}
                </div>

                {/* Tab content panel */}
                <div style={{ padding: '24px', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                  {activeTab === 'description' && <p>{product.details}</p>}
                  {activeTab === 'care' && <p>{product.care}</p>}
                  {activeTab === 'shipping' && <p>{product.shipping}</p>}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .product-details-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 1024px) {
          .product-details-grid {
            grid-template-columns: 1fr 1.05fr !important;
          }
        }
        .product-card:hover .product-page-img {
          transform: scale(1.04);
        }
      `}</style>
    </main>
  )
}
