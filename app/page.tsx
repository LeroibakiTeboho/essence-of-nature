export default function HomePage() {
  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container">
          <span>EXCLUSIVE</span> · Discover the new OUD velvet mood fragrance in your order
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            Essence of Nature
            <small>scent your way</small>
          </div>

          <nav className="nav-desktop">
            <a href="#">Home</a>
            <a href="#">Shop All</a>
            <a href="#">Women</a>
            <a href="#">Men</a>
            <a href="#">Unisex</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">News</a>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" aria-label="Search">⌕</button>
            <button className="icon-btn" aria-label="Account">○</button>
            <button className="icon-btn" aria-label="Cart">
              ☐
              <span className="cart-badge">0</span>
            </button>
            <button className="mobile-toggle" aria-label="Menu">≡</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="pre-title">Essence of Nature · Paris</span>
            <h1>
              Baccarat
              <span className="gold-text">Rouge 540</span>
            </h1>
            <p>
              The combined magic of Nature and Man, transforming raw materials into an
              inimitable object of pleasure. Baccarat Rouge 540 seals the meeting of two
              emblems of excellence.
            </p>
            <a href="#" className="btn-primary">Discover</a>
            <div className="hero-badge">
              <span className="sep"></span>
              Baccarat Rouge 540 Collection
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION INTRO */}
      <section className="collection-intro">
        <div className="container">
          <span className="section-label">Essence of Nature · Paris</span>
          <h2 className="section-title">Baccarat Rouge 540</h2>
          <p className="section-sub">
            The combined magic of Nature and Man, transforming raw materials into an
            inimitable object of pleasure. Baccarat Rouge 540 seals the meeting of two
            emblems of excellence.
          </p>
          <div className="gold-rule"></div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="container">
          <div className="filter-tabs">
            <span className="active">Perfumes</span>
            <span>·</span>
            <span>Bath &amp; Body</span>
            <span>·</span>
            <span>Duo &amp; Trio</span>
            <span>·</span>
            <span>Travel &amp; Art of Living</span>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfum 70ml</div>
              <div className="product-price">€ 240</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
                <span className="badge-exclusive">Exclusive</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 70ml</div>
              <div className="product-price">€ 390</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 35ml</div>
              <div className="product-price">€ 220</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
                <span className="badge-exclusive">Exclusive</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 200ml</div>
              <div className="product-price">€ 850</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfum 200ml</div>
              <div className="product-price">€ 540</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfum 35ml</div>
              <div className="product-price">€ 150</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
                <span className="badge-new">New</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Scented ritual coffret 3×35ml</div>
              <div className="product-price">€ 420</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span className="placeholder-icon">🧴</span>
                <span className="badge-new">New</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Hair perfume 70ml</div>
              <div className="product-price">€ 120</div>
            </div>
          </div>
        </div>
      </section>

      {/* BATH & BODY */}
      <section className="body-care-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Bath &amp; Body</span>
            <h2 className="section-title">Baccarat Rouge 540</h2>
          </div>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <span style={{ fontSize: '2.8rem', opacity: 0.4 }}>🧴</span>
                <span className="badge-new">New</span>
              </div>
              <div className="product-name">Perfumed Body Oil</div>
              <div className="product-variant">70ml</div>
              <div className="product-price">€ 130</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span style={{ fontSize: '2.8rem', opacity: 0.4 }}>✨</span>
              </div>
              <div className="product-name">Shimmering Body Oil</div>
              <div className="product-variant">200ml</div>
              <div className="product-price">€ 150</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span style={{ fontSize: '2.8rem', opacity: 0.4 }}>🧼</span>
              </div>
              <div className="product-name">Cleansing Gel for Hands &amp; Body</div>
              <div className="product-variant">350ml</div>
              <div className="product-price">€ 75</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span style={{ fontSize: '2.8rem', opacity: 0.4 }}>🧴</span>
              </div>
              <div className="product-name">Scented Soap</div>
              <div className="product-variant">150g</div>
              <div className="product-price">€ 45</div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <span style={{ fontSize: '2.8rem', opacity: 0.4 }}>🧴</span>
              </div>
              <div className="product-name">Scented Hand Cream</div>
              <div className="product-variant">70ml</div>
              <div className="product-price">€ 60</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE SETS */}
      <section className="exclusive-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-label">Online Exclusive</span>
            <h2 className="section-title">Exclusive Sets</h2>
          </div>
          <div className="exclusive-grid">
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Perfumed Oil · Eau de Parfum Duo</div>
              <div className="excl-price">€ 220</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Scented Soap · Eau de Parfum Duo</div>
              <div className="excl-price">€ 180</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Travel Set 5×11ml</div>
              <div className="excl-price">€ 95</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Globe Trotter · Extrait de Parfum Duo</div>
              <div className="excl-price">€ 550</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Globe Trotter · Eau de Parfum Duo</div>
              <div className="excl-price">€ 390</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Trio · Gel, Body Oil &amp; Hair Perfume</div>
              <div className="excl-price">€ 210</div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER / INSPIRATION */}
      <section className="discover-section">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Inspiration</span>
          <h2 className="section-title">Discover also</h2>
          <p className="section-sub">
            The combined magic of Nature and Man, transforming raw materials into an
            inimitable object of pleasure.
          </p>
          <div className="discover-grid">
            <div className="discover-card">
              <div className="dc-title">OUD</div>
              <div className="dc-sub">Satin Mood</div>
              <a href="#" className="dc-link">Discover</a>
            </div>
            <div className="discover-card">
              <div className="dc-title">Petit Matin</div>
              <div className="dc-sub">&amp; Grand Soir</div>
              <a href="#" className="dc-link">Discover</a>
            </div>
            <div className="discover-card">
              <div className="dc-title">OUD</div>
              <div className="dc-sub">Agarwood</div>
              <a href="#" className="dc-link">Discover</a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container">
          <span className="section-label">Newsletter</span>
          <h2 className="section-title">Subscribe to stay updated</h2>
          <p className="section-sub">Receive news and exclusive offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="EMAIL" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Track an Order</a></li>
                <li><a href="#">Loyalty</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping &amp; Returns</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">General Terms of Sale</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Loyalty Program</a></li>
                <li><a href="#">Credits</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>The Maison</h4>
              <ul>
                <li><a href="#">Friends of the Maison</a></li>
                <li><a href="#">Work with us</a></li>
                <li><a href="#">Boutique</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              <div className="footer-social">
                <a href="#">Instagram</a>
                <a href="#">TikTok</a>
                <a href="#">Facebook</a>
                <a href="#">YouTube</a>
                <a href="#">Weibo</a>
                <a href="#">WeChat</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="brand">Essence of Nature</span>
            <span>© 2026 · All rights reserved</span>
          </div>
        </div>
      </footer>
    </>
  );
}