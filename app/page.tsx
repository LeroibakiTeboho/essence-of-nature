'use client';
import { useState } from "react";
import { FiHome, FiShoppingBag, FiUser, FiMessageCircle } from 'react-icons/fi';
import {FaSearch,
  FaShoppingCart,
  FaCommentDots,
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingBag,
  FaVenus,
  FaMars,
  FaUser,} from 'react-icons/fa'
// or use FaVenus, FaMars from 'react-icons/fa'

export default function HomePage() {

   const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

 const navItems = [
    { key: 'Home', label: 'Home', icon: FiHome },
    { key: 'Shop', label: 'Shop', icon: FiShoppingBag },
    { key: 'Women', label: 'Women', icon: FaVenus },
    { key: 'Men', label: 'Men', icon: FaMars },
    { key: 'Unisex', label: 'Unisex', icon: FiUser },
  ];

  return (
    <>
           {/* TOP BAR */}
      <div className="top-bar">
        <div className="container">
          <span>✨</span> Order now and get 3 fragrance samples FREE! We deliver Nationwide! FREE delivery for orders that are R850 and above.
        </div>
      </div>


      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo letter-">
            EN
            {/* <small>scent your way</small> */}
          </div>

          <nav className="nav-desktop">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Women</a>
            <a href="#">Men</a>
            <a href="#">Unisex</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">News</a>
          </nav>

<div className="header-actions font-light">
  <button className="icon-btn" aria-label="Search">
    <FaSearch size={15} />
  </button>
  <button className="icon-btn" aria-label="Cart">
    <FaShoppingCart size={15} />
    <span className="cart-badge">0</span>
  </button>
   <button className="icon-btn" aria-label="Search">
    <FaUser size={15} />
  </button>  
  <button className="chat-icon" aria-label="Chat">
    <FaCommentDots size={15} />
  </button>
  <button
    className="mobile-toggle"
    aria-label="Menu"
    onClick={() => setMenuOpen(true)}
  >
    <FaBars size={20} />
  </button>
</div>
        </div>
      </header>

       {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>✕</button>
            <nav className="drawer-nav">
              <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Shop All</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Women</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Men</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Unisex</a>
              <a href="#" onClick={() => setMenuOpen(false)}>About Us</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href="#" onClick={() => setMenuOpen(false)}>News</a>
            </nav>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="pre-title">Essence of Nature · South Africa</span>
            <h1>
             Timeless Scents, Endless Elegance
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
          <span className="section-label">Essence of Nature · South Africa</span>
          <h2 className="section-title">Baccarat Rouge 540</h2>
          <p className="section-sub">
            The essence of nature and artistry come together to transform the finest ingredients into unforgettable fragrances. Discover perfumes for men, women, and everyone who appreciates timeless scents.
          </p>
          <div className="gold-rule"></div>
        </div>
      </section>

   {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="container">
          <div className="filter-tabs">
            <span className="active">Unisex</span>
            <span>·</span>
            <span>men</span>
            <span>·</span>
            <span>women</span>           
          </div>

          <div className="products-grid">
            {/* Replace the src paths with your actual image filenames */}
            <div className="product-card">
              <div className="product-image">
                <img src="/product-1.png" alt="Baccarat Rouge 540 Eau de parfum 70ml" />
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfume 70ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-2.png" alt="Baccarat Rouge 540 Extrait de parfum 70ml" />
                <span className="badge-exclusive">Exclusive</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 70ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-1.png" alt="Baccarat Rouge 540 Extrait de parfum 35ml" />
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 35ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-2.png" alt="Baccarat Rouge 540 Extrait de parfum 200ml" />
                <span className="badge-exclusive">Exclusive</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Extrait de parfum 200ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-1.png" alt="Baccarat Rouge 540 Eau de parfum 200ml" />
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfum 200ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-2.png" alt="Baccarat Rouge 540 Eau de parfum 35ml" />
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Eau de parfum 35ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-1.png" alt="Baccarat Rouge 540 Scented ritual coffret" />
                <span className="badge-new">New</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Scented ritual coffret 3×35ml</div>
              <div className="product-price">R 850</div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="/product-2.png" alt="Baccarat Rouge 540 Hair perfume 70ml" />
                <span className="badge-new">New</span>
              </div>
              <div className="product-name">Baccarat Rouge 540</div>
              <div className="product-variant">Hair perfume 70ml</div>
              <div className="product-price">R 850</div>
            </div>
          </div>
        </div>
      </section>

      {/* BATH & BODY */}
      {/* <section className="body-care-section">
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
      </section> */}

      {/* EXCLUSIVE SETS */}
      {/* <section className="exclusive-section">
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
              <div className="excl-price">R 850</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Scented Soap · Eau de Parfum Duo</div>
              <div className="excl-price">R 850</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Travel Set 5×11ml</div>
              <div className="excl-price">R 850</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Globe Trotter · Extrait de Parfum Duo</div>
              <div className="excl-price">R 850</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Globe Trotter · Eau de Parfum Duo</div>
              <div className="excl-price">R 850</div>
            </div>
            <div className="exclusive-card">
              <span className="excl-badge">Online Exclusive</span>
              <div className="excl-title">Baccarat Rouge 540</div>
              <div className="excl-sub">Trio · Gel, Body Oil &amp; Hair Perfume</div>
              <div className="excl-price">R 850</div>
            </div>
          </div>
        </div>
      </section> */}

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

         {/* BOTTOM NAVIGATION (mobile only) */}
      <div className="bottom-nav">
  {navItems.map((item) => {
    const Icon = item.icon;
    return (
      <button
        key={item.key}
        className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
        onClick={() => setActiveTab(item.key)}
      >
        <span className="nav-icon">
          <Icon size={20} />
        </span>
        <span className="nav-label">{item.label}</span>
      </button>
    );
  })}
</div>
    </>
  );
}