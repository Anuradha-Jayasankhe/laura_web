
'use client'

const categories = [
  { name: 'DRESSES', image: '/images/categories/dresses.png', path: '/collections?category=dresses' },
  { name: 'TOPS', image: '/images/categories/tops.png', path: '/collections?category=tops' },
  { name: 'BOTTOMS', image: '/images/categories/bottoms.png', path: '/collections?category=bottoms' },
  { name: 'OUTERWEAR', image: '/images/categories/outerwear.png', path: '/collections?category=outerwear' },
  { name: 'ACCESSORIES', image: '/images/categories/accessories.png', path: '/collections?category=accessories' },
]

const features = [
  {
    title: 'BEST PRICES',
    desc: 'Unbeatable & Affordable',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
    )
  },
  {
    title: 'PREMIUM QUALITY',
    desc: 'Carefully Selected',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    )
  },
  {
    title: 'CASH ON DELIVERY',
    desc: 'Pay When You Receive',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
    )
  },
  {
    title: 'EASY RETURNS',
    desc: 'Hassle-Free Returns',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"></path></svg>
    )
  }
]

export default function Categories() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '0 0 100px 0', marginTop: '-50px', position: 'relative', zIndex: 30 }}>
      <div className="container">
        
        {/* Floating Features Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-md)',
          padding: '30px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          marginBottom: '90px',
          border: '1px solid #f9f2f8',
          transform: 'translateY(-20px)'
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              borderRight: i < 3 ? '1px solid #f6edf5' : 'none',
              paddingRight: '15px'
            }} className="feature-item">
              <div style={{
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.8px',
                  color: 'var(--color-text)',
                  marginBottom: '4px'
                }}>{f.title}</h4>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontWeight: '500'
                }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }} className="categories-grid">
          {categories.map((c) => (
            <a href={c.path} key={c.name} style={{ textDecoration: 'none' }}>
              <div className="card category-card" style={{
                position: 'relative',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                {/* Visual Category Image */}
                <div style={{
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }} className="category-bg-img" />

                {/* Arched soft shadow vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(112, 15, 92, 0.15) 0%, rgba(255, 255, 255, 0) 60%)',
                  pointerEvents: 'none'
                }} />

                {/* Overlaid card frame */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-md)',
                  minWidth: '150px',
                  transition: 'var(--transition)'
                }} className="category-overlay">
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    letterSpacing: '1px',
                    marginBottom: '4px'
                  }}>{c.name}</h3>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    margin: 0
                  }}>
                    Shop Now
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Styled JSX overrides for responsiveness and scale effects */}
      <style jsx global>{`
        .category-card:hover .category-bg-img {
          transform: scale(1.06);
        }
        .category-card:hover .category-overlay {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        @media (max-width: 768px) {
          .feature-item {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid #f6edf5;
            padding-bottom: 20px;
          }
          .feature-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  )
}
