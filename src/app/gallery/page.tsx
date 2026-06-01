
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { API_BASE_URL } from '@/config'

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

const initialGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Lavender Archway Shoot',
    category: 'Editorial',
    image: '/images/categories/dresses.png',
    aspect: 'portrait'
  },
  {
    id: 2,
    title: 'Spring Boutique Silk Blouses',
    category: 'Collection',
    image: '/images/categories/tops.png',
    aspect: 'square'
  },
  {
    id: 3,
    title: 'Minimalist Trousers Study',
    category: 'Tailoring',
    image: '/images/categories/bottoms.png',
    aspect: 'portrait'
  },
  {
    id: 4,
    title: 'Pastel Linen Blazer Showcase',
    category: 'Editorial',
    image: '/images/categories/outerwear.png',
    aspect: 'square'
  },
  {
    id: 5,
    title: 'Handcrafted Accessories Selection',
    category: 'Detail',
    image: '/images/categories/accessories.png',
    aspect: 'portrait'
  },
  {
    id: 6,
    title: 'Dream Lavender Sundress Concept',
    category: 'Bespoke',
    image: '/images/categories/dresses.png',
    aspect: 'square'
  }
]

export default function Page() {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        if (!res.ok) throw new Error('Failed to fetch gallery');
        const data = await res.json();
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.warn('Backend lookbook API unreachable, falling back to local campaigns.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [])

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
            Home / Lookbook
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            color: 'var(--color-text)',
            margin: 0
          }}>Fashion Lookbook</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginTop: '10px',
            maxWidth: '500px',
            margin: '10px auto 0 auto'
          }}>
            Explore our curated high-fashion photography campaigns, capturing the raw essence of Laura elegance.
          </p>
        </div>
      </section>

      {/* Lookbook Grid */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div className="product-grid lookbook-grid">
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveImage(item.image)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                  border: '1px solid #f9f2f8'
                }}
                className="lookbook-card"
              >
                {/* Visual Image Container */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    aspectRatio: '0.82',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} className="lookbook-img" />

                  {/* Elegant Category Badge */}
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
                    zIndex: 5
                  }}>{item.category}</span>
                </div>

                {/* Campaign Info */}
                <div style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      color: 'var(--color-text)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-serif)'
                    }}>{item.title}</h3>
                    
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      lineHeight: '1.5',
                      marginBottom: '16px'
                    }}>
                      Part of our curated high-fashion photography campaigns, capturing the raw elegance and luxury textures.
                    </p>
                  </div>

                  <div>
                    <button
                      className="btn btn-outline"
                      style={{
                        width: '100%',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        fontSize: '12px',
                        letterSpacing: '1px'
                      }}
                    >
                      VIEW FULL IMAGE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Dialog Modal */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 21, 27, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          {/* Modal Close Button */}
          <button style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '32px',
            cursor: 'pointer',
            padding: 0
          }}>✕</button>

          {/* Large image inside modal */}
          <div style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '85vh',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <img 
              src={activeImage} 
              alt="Lookbook Showcase"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .lookbook-card:hover .lookbook-img {
          transform: scale(1.06);
        }
        .lookbook-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }
      `}</style>
    </main>
  )
}
