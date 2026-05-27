import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const values = [
  {
    title: 'Uncompromised Quality',
    desc: 'Each garment is curated from the finest hand-selected silks, linens, and boutique cottons, ensuring absolute longevity and luxurious skinfeel.',
    icon: '✨'
  },
  {
    title: 'Artisanal Craftsmanship',
    desc: 'We support local master seamstresses and tailors, crafting every single piece with strict attention to detail and traditional bespoke sewing techniques.',
    icon: '🌸'
  },
  {
    title: 'Empowering Individuality',
    desc: 'Our designs embrace the unique contour and voice of every woman. We create fashion that fits you, rather than forcing you to fit standard sizes.',
    icon: '💃'
  },
  {
    title: 'Mindful Sustainability',
    desc: 'Through local non-mass production, fair living wages, and minimal waste practices, we maintain a boutique model that honors the earth and workers.',
    icon: '🌿'
  }
]

export default function Page() {
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
            Home / Our Story
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            color: 'var(--color-text)',
            margin: 0
          }}>About Laura</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginTop: '10px',
            maxWidth: '500px',
            margin: '10px auto 0 auto'
          }}>
            Elegance, boutique styling, and artisanal craftsmanship built into every fiber.
          </p>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '100px'
          }}>
            {/* Story Text */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Established 2024</span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 3.5vw, 46px)',
                color: 'var(--color-text)',
                marginBottom: '24px',
                lineHeight: '1.2'
              }}>Crafting a Beautiful <br /><span className="purple" style={{ fontStyle: 'italic' }}>Feminine Legacy</span></h2>
              
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Laura was born out of a desire to create clothing that is as unique, sophisticated, and elegant as the woman who wears it. We believe that true luxury lies in boutique customization, mindful detail work, and a profound respect for fabrics.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '30px' }}>
                Each collection features premium silhouettes that flow effortlessly, blending classic romantic feminine styling with modern luxury comfort. We reject the fast-fashion narrative, choosing to release hand-curated collections and bespoke customized items designed to stay in your wardrobe for a lifetime.
              </p>
              
              <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid #f6edf5', paddingTop: '30px' }}>
                <div>
                  <h4 style={{ fontSize: '32px', color: 'var(--color-primary)', fontWeight: 'bold', margin: 0 }}>10k+</h4>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '500' }}>Happy Clients</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '32px', color: 'var(--color-primary)', fontWeight: 'bold', margin: 0 }}>100%</h4>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '500' }}>Artisanal Work</span>
                </div>
              </div>
            </div>

            {/* Story Image Frame */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '0.8',
                borderRadius: '200px 200px 24px 24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '6px solid #ffffff',
                backgroundColor: '#ffffff'
              }}>
                <div style={{
                  backgroundImage: 'url(/images/categories/outerwear.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%'
                }} />
              </div>
            </div>
          </div>

          {/* Pillars of Brand Values */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h3 style={{ fontSize: '32px', color: 'var(--color-text)' }}>Our Core Pillars</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '10px auto' }}>What defines the Laura signature quality in every single garment.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '28px'
          }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{
                padding: '40px 30px',
                textAlign: 'center',
                backgroundColor: '#fbf7fb',
                border: '1px solid #f9f2f8'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-sm)'
                }}>{v.icon}</div>
                
                <h4 style={{
                  fontSize: '18px',
                  color: 'var(--color-text)',
                  marginBottom: '14px',
                  fontWeight: '600'
                }}>{v.title}</h4>
                
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.7',
                  margin: 0
                }}>{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
