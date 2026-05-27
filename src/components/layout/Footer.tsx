
export default function Footer() {
  return (
    <footer style={{
        backgroundColor: '#1c151b',
        color: '#ffffff',
        padding: '80px 0 30px 0',
        fontFamily: 'var(--font-sans)',
        borderTop: '3px solid var(--color-primary)'
      }}>
        <div className="container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Column 1: Brand Info */}
          <div>
            <img 
              src="/videos/WhatsApp Image 2026-05-26 at 23.07.22.jpeg" 
              alt="Laura Premium" 
              style={{
                height: '70px',
                width: 'auto',
                objectFit: 'contain',
                marginBottom: '20px',
                filter: 'brightness(0) invert(1)' // Make logo white for dark theme
              }}
            />
            <p style={{
              color: '#d4c9d3',
              fontSize: '14px',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              Luxury feminine fashion inspired by boutique elegance. Embracing your unique, exquisite style through high-end tailor-made fabrics and timeless premium cuts.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" className="footer-social-link" style={{ color: '#fff', transition: 'var(--transition)' }} aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="footer-social-link" style={{ color: '#fff', transition: 'var(--transition)' }} aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="footer-social-link" style={{ color: '#fff', transition: 'var(--transition)' }} aria-label="TikTok">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.71-.53-1.3-1.22-1.74-2v6.6c0 1.74-.41 3.52-1.43 4.93-1.39 1.93-3.87 3-6.27 2.68-2.65-.35-5.06-2.31-5.71-4.93-.89-3.57.87-7.61 4.41-8.77.71-.23 1.46-.33 2.21-.32.01 3.86 0 7.72.01 11.58-.02.43.08.89.34 1.25.61.85 1.83 1.17 2.77.79.88-.35 1.43-1.28 1.42-2.23V.02z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '25px',
              color: '#ffffff'
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><a href="/" style={{ color: '#d4c9d3', fontSize: '14px' }}>Home</a></li>
              <li><a href="/collections" style={{ color: '#d4c9d3', fontSize: '14px' }}>Our Collections</a></li>
              <li><a href="/new-arrivals" style={{ color: '#d4c9d3', fontSize: '14px' }}>New Arrivals</a></li>
              <li><a href="/gallery" style={{ color: '#d4c9d3', fontSize: '14px' }}>Lookbook Gallery</a></li>
              <li><a href="/custom-orders" style={{ color: '#d4c9d3', fontSize: '14px' }}>Bespoke Custom Fitting</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '25px',
              color: '#ffffff'
            }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><a href="/about" style={{ color: '#d4c9d3', fontSize: '14px' }}>About Laura Brand</a></li>
              <li><a href="/contact" style={{ color: '#d4c9d3', fontSize: '14px' }}>Contact Support</a></li>
              <li><a href="#" style={{ color: '#d4c9d3', fontSize: '14px' }}>Shipping & Returns</a></li>
              <li><a href="#" style={{ color: '#d4c9d3', fontSize: '14px' }}>Sizing Guide</a></li>
              <li><a href="#" style={{ color: '#d4c9d3', fontSize: '14px' }}>FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Coordinate */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '25px',
              color: '#ffffff'
            }}>Contact Boutique</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: '#d4c9d3', fontSize: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>No. 124, Ward Place, Colombo 07, Sri Lanka</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path></svg>
                <span>+94 77 123 4567</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>info@laurapremium.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #332731', marginBottom: '30px' }} />

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          color: '#8b7c8a',
          fontSize: '13px'
        }}>
          <div>
            © {new Date().getFullYear()} Laura Premium Fashion. All Rights Reserved. Designed with Elegance.
          </div>
          {/* Payment Methods */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Safe Checkout:</span>
            <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
              {/* Visa Badge */}
              <div style={{ width: '40px', height: '26px', backgroundColor: '#332731', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px', color: '#fff' }}>VISA</div>
              {/* MasterCard Badge */}
              <div style={{ width: '40px', height: '26px', backgroundColor: '#332731', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px', color: '#fff' }}>MC</div>
              {/* COD Badge */}
              <div style={{ width: '40px', height: '26px', backgroundColor: '#332731', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px', color: '#fff' }}>COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
