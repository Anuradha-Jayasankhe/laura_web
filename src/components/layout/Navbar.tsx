
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll listener for elegant sticky style transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation Links definition
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CUSTOM ORDERS', path: '/custom-orders' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'CONTACT US', path: '/contact' },
  ]

  return (
    <>
      {/* Top Announcement Bar */}
      <div style={{
        backgroundColor: '#faf6f9',
        borderBottom: '1px solid #f2e6f1',
        fontSize: '11px',
        fontWeight: '500',
        color: 'var(--color-primary)',
        padding: '10px 0',
        letterSpacing: '1px',
        position: 'relative'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '20px'
        }}>
          {/* Centered Info items */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              FREE DELIVERY ISLANDWIDE
            </span>
            <span style={{ borderLeft: '1px solid #ead3e9', paddingLeft: '20px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="10" x2="12" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>
              CASH ON DELIVERY AVAILABLE
            </span>
            <span style={{ borderLeft: '1px solid #ead3e9', paddingLeft: '20px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              NEW ARRIVALS EVERY WEEK
            </span>
          </div>

          {/* Right: Social icons (absolute position on desktop) */}
          <div className="announcement-socials" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px',
            position: 'absolute',
            right: '40px'
          }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: '400' }}>Follow Us</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Facebook */}
              <a href="#" style={{ color: 'inherit' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ color: 'inherit' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" style={{ color: 'inherit' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.71-.53-1.3-1.22-1.74-2v6.6c0 1.74-.41 3.52-1.43 4.93-1.39 1.93-3.87 3-6.27 2.68-2.65-.35-5.06-2.31-5.71-4.93-.89-3.57.87-7.61 4.41-8.77.71-.23 1.46-.33 2.21-.32.01 3.86 0 7.72.01 11.58-.02.43.08.89.34 1.25.61.85 1.83 1.17 2.77.79.88-.35 1.43-1.28 1.42-2.23V.02z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`nav`} style={{
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        height: scrolled ? '80px' : '96px',
        transition: 'var(--transition)'
      }}>
        <div className="container nav-inner" style={{ height: '100%' }}>
          {/* Brand Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/videos/WhatsApp Image 2026-05-26 at 23.07.22.jpeg" 
              alt="Laura Premium" 
              style={{
                height: scrolled ? '64px' : '76px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'var(--transition)'
              }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" style={{ display: 'none' }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={pathname === item.path ? 'active' : ''}
                style={{
                  color: pathname === item.path ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: pathname === item.path ? '600' : '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {item.name}
                {item.name === 'COLLECTIONS' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Search Toggle */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {isSearchOpen && (
                <input 
                  type="text" 
                  placeholder="Search collections..." 
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1.5px solid var(--color-secondary)',
                    outline: 'none',
                    fontSize: '13px',
                    width: '200px',
                    marginRight: '8px',
                    fontFamily: 'var(--font-sans)',
                    animation: 'fadeInUp 0.3s forwards'
                  }}
                  autoFocus
                />
              )}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', padding: 0 }}
                aria-label="Search"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>

            {/* Profile */}
            <a href="/profile" className="nav-profile-link" aria-label="Profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </a>

            {/* Wishlist */}
            <a href="/wishlist" className="nav-wishlist-link" style={{ position: 'relative' }} aria-label="Wishlist">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>0</span>
            </a>

            {/* Cart Bag */}
            <a href="/cart" style={{ position: 'relative' }} aria-label="Shopping Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>0</span>
            </a>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text)',
                padding: 0
              }}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '132px', // height of announcement + nav header
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          padding: '30px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          overflowY: 'auto',
          animation: 'fadeInUp 0.4s ease-out'
        }}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '1.5px',
                color: pathname === item.path ? 'var(--color-primary)' : 'var(--color-text)',
                borderBottom: '1px solid #f6f0f5',
                paddingBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {item.name}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          ))}
          
          {/* Extra Mobile Actions */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="/profile" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-muted)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              My Account
            </a>
            <span style={{ color: '#ead3e9' }}>|</span>
            <a href="/wishlist" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-muted)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Wishlist
            </a>
          </div>
        </div>
      )}

      {/* CSS overrides for desktop display flex nav-links */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .nav-links {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .announcement-socials {
            position: static !important;
            margin-top: 10px;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
