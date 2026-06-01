
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { API_BASE_URL, getSettings, Product, Category } from '@/config'

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [whatsappNum, setWhatsappNum] = useState('94768455271')
  const [loading, setLoading] = useState(true)
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({})
  const [filterTabs, setFilterTabs] = useState<string[]>(['ALL'])

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, settings, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products`),
          getSettings(),
          fetch(`${API_BASE_URL}/categories`)
        ]);
        
        if (prodRes.ok) {
          const data = await prodRes.json();
          setProducts(data);
          
          const sizes: Record<number, string> = {};
          data.forEach((p: Product) => {
            sizes[p.id] = 'M';
          });
          setSelectedSizes(sizes);
        }

        if (catRes.ok) {
          const categories: Category[] = await catRes.json();
          setFilterTabs(['ALL', ...categories.map(c => c.code)]);
        } else {
          setFilterTabs(['ALL', 'DRESSES', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'ACCESSORIES']);
        }
        
        setWhatsappNum(settings.whatsapp_number);
      } catch (err) {
        console.error('Failed to load collections data', err);
        setFilterTabs(['ALL', 'DRESSES', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'ACCESSORIES']);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [])

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }))
  }

  // Filter products based on active category
  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory)


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
            Home / Collections
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            color: 'var(--color-text)',
            margin: 0
          }}>Luxury Collections</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginTop: '10px',
            maxWidth: '500px',
            margin: '10px auto 0 auto'
          }}>
            Filter through our curated designer catalogs and order bespoke fits seamlessly.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '50px',
                  border: activeCategory === tab ? 'none' : '1px solid #eadeeb',
                  backgroundColor: activeCategory === tab ? 'var(--color-primary)' : 'transparent',
                  color: activeCategory === tab ? '#ffffff' : 'var(--color-text)',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                className={`filter-tab-btn ${activeCategory === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.map((p) => {
              const currentSize = selectedSizes[p.id] || 'M'
              const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hi%20Laura%20Premium%21%20I%20would%20like%20to%20order%20the%20*${encodeURIComponent(p.name)}*%20in%20size%20*${currentSize}*%20for%20*${p.price}*.%20Is%20it%20available%3F`

              return (
                <div key={p.id} className="card product-card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  animation: 'fadeInUp 0.5s ease-out'
                }}>
                  {/* Product Image */}
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

                    {p.badge && (
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
                      }}>{p.badge}</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '19px',
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
                        fontSize: '20px',
                        fontWeight: '700',
                        color: 'var(--color-primary)',
                        marginBottom: '20px'
                      }}>{p.price}</p>
                    </div>

                    {/* Size selectors & WhatsApp Button */}
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
      </section>

      <Footer />

      <style jsx global>{`
        .product-card:hover .product-card-img {
          transform: scale(1.06);
        }
        .filter-tab-btn:hover {
          border-color: var(--color-primary) !important;
          color: var(--color-primary) !important;
        }
        .filter-tab-btn.active {
          background-color: var(--color-primary) !important;
          color: #ffffff !important;
          border-color: var(--color-primary) !important;
        }
      `}</style>
    </main>
  )
}
