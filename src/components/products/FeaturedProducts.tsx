
'use client'

import { useState } from 'react'

const initialProducts = [
  {
    id: 1,
    name: 'Lavender Dream Floral Dress',
    price: 'Rs. 8,900',
    rawPrice: 8900,
    image: '/images/categories/dresses.png',
    badge: 'BEST SELLER',
    desc: 'Flowing, premium silk chiffon dress designed for absolute elegance.'
  },
  {
    id: 2,
    name: 'Pastel Violet Silk Blouse',
    price: 'Rs. 6,500',
    rawPrice: 6500,
    image: '/images/categories/tops.png',
    badge: 'NEW ARRIVAL',
    desc: 'Breathable boutique silk with tailored cuffs and dynamic neckline.'
  },
  {
    id: 3,
    name: 'High-Waist Tailored Trousers',
    price: 'Rs. 7,800',
    rawPrice: 7800,
    image: '/images/categories/bottoms.png',
    badge: 'TRENDING',
    desc: 'Modern sophisticated straight-cut pants, ideal for upscale settings.'
  },
  {
    id: 4,
    name: 'Classic Lavender Blazer',
    price: 'Rs. 12,500',
    rawPrice: 12500,
    image: '/images/categories/outerwear.png',
    badge: 'HOT ITEM',
    desc: 'Premium structured linen blazer that complements any chic ensemble.'
  }
]

export default function FeaturedProducts() {
  // Store selected sizes for each product (keyed by product ID)
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    1: 'M',
    2: 'M',
    3: 'M',
    4: 'M'
  })

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }))
  }

  return (
    <section className="section" style={{ backgroundColor: '#faf6f9', padding: '120px 0' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 54px)',
            color: 'var(--color-text)',
            marginBottom: '16px'
          }}>Featured Masterpieces</h2>
          <div style={{
            width: '80px',
            height: '3px',
            backgroundColor: 'var(--color-primary)',
            margin: '0 auto 20px auto',
            borderRadius: '2px'
          }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explore our hand-picked signature collections, meticulously tailored with absolute precision and luxury fabrics.
          </p>
        </div>

        {/* Product Grid */}
        <div className="product-grid featured-grid">
          {initialProducts.map((p) => {
            const currentSize = selectedSizes[p.id] || 'M'
            const whatsappUrl = `https://wa.me/94771234567?text=Hi%20Laura%20Premium%21%20I%20would%20like%20to%20order%20the%20*${encodeURIComponent(p.name)}*%20in%20size%20*${currentSize}*%20for%20*${p.price}*.%20Is%20it%20available%3F`

            return (
              <div key={p.id} className="card product-card" style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                {/* Product Image Frame */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <a href={`/product/${p.id}`}>
                    <div style={{
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      aspectRatio: '0.82',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} className="product-card-img" />
                  </a>

                  {/* Elegant floating badge */}
                  <span style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1.2px',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(112, 15, 92, 0.15)',
                    zIndex: 5
                  }}>{p.badge}</span>
                </div>

                {/* Product Content Details */}
                <div style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      color: 'var(--color-text)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-serif)'
                    }}>
                      <a href={`/product/${p.id}`} className="product-title-link">
                        {p.name}
                      </a>
                    </h3>
                    
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      lineHeight: '1.5',
                      marginBottom: '16px'
                    }}>{p.desc}</p>

                    <p style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      marginBottom: '20px',
                      fontFamily: 'var(--font-sans)'
                    }}>{p.price}</p>
                  </div>

                  {/* Interactive Size Chips */}
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px', letterSpacing: '0.8px' }}>SELECT SIZE:</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleSizeSelect(p.id, sz)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              border: currentSize === sz ? '1.5px solid var(--color-primary)' : '1.5px solid #eadeeb',
                              backgroundColor: currentSize === sz ? 'var(--color-primary-light)' : '#ffffff',
                              color: currentSize === sz ? 'var(--color-primary)' : 'var(--color-text)',
                              fontSize: '12px',
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

                    {/* WhatsApp Checkout Button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        borderRadius: '12px',
                        padding: '14px 20px',
                        fontSize: '13px',
                        letterSpacing: '1px'
                      }}
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
                      ORDER VIA WHATSAPP
                    </a>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* Styled JSX overrides for product hover effects */}
      <style jsx global>{`
        .product-card:hover .product-card-img {
          transform: scale(1.06);
        }
        .product-title-link {
          color: var(--color-text);
          transition: var(--transition);
        }
        .product-title-link:hover {
          color: var(--color-primary);
        }
      `}</style>
    </section>
  )
}
