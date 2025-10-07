"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #0b0b0b;
          --bg2: #121212;
          --fg: #ffffff;
          --muted: rgba(255,255,255,0.72);
          --accent: #d9ff5b;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          background: var(--bg);
          color: var(--fg);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding: 40px 20px;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(11,11,11,0.4) 0%, rgba(11,11,11,0.8) 100%);
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
        }
        
        .hero h1 {
          font-size: clamp(48px, 8vw, 120px);
          font-weight: 800;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        
        .hero h2 {
          font-size: clamp(24px, 4vw, 48px);
          font-weight: 700;
          margin: 0 0 40px;
          color: var(--accent);
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          padding: 16px 40px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(217, 255, 91, 0.3);
        }
        
        .btn-secondary {
          padding: 16px 40px;
          background: rgba(255,255,255,0.1);
          color: var(--fg);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.4);
        }
        
        .section {
          padding: 100px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800;
          margin: 0 0 60px;
          text-align: center;
          letter-spacing: -0.02em;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }
        
        .feature-card {
          padding: 40px 30px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(217, 255, 91, 0.3);
          transform: translateY(-5px);
        }
        
        .feature-card h3 {
          font-size: 24px;
          margin: 0 0 16px;
          color: var(--accent);
        }
        
        .feature-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        
        .pricing-card {
          padding: 40px 30px;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .pricing-card:hover {
          border-color: var(--accent);
          transform: scale(1.02);
        }
        
        .pricing-card h3 {
          font-size: 28px;
          margin: 0 0 10px;
        }
        
        .pricing-card .subtitle {
          color: var(--muted);
          margin: 0 0 20px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .pricing-card .price {
          font-size: 48px;
          font-weight: 800;
          color: var(--accent);
          margin: 20px 0;
        }
        
        .pricing-card p {
          color: var(--muted);
          line-height: 1.6;
        }
        
        .films-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        
        .film-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .film-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent);
        }
        
        .film-card-content {
          padding: 30px;
        }
        
        .film-card h3 {
          font-size: 24px;
          margin: 0 0 10px;
        }
        
        .film-card .status {
          display: inline-block;
          padding: 6px 16px;
          background: var(--accent);
          color: var(--bg);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          margin-top: 16px;
        }
        
        .film-card .coming-soon {
          background: rgba(255,255,255,0.2);
          color: var(--fg);
        }
        
        .footer {
          padding: 60px 20px;
          text-align: center;
          background: rgba(0,0,0,0.5);
          margin-top: 100px;
        }
        
        .footer p {
          margin: 0;
          color: var(--muted);
        }
        
        @media (max-width: 768px) {
          .hero {
            min-height: 80vh;
            padding: 60px 20px;
          }
          
          .section {
            padding: 60px 20px;
          }
          
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
          
          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img 
            src="https://cdn.prod.website-files.com/601a7eb46cf274c860e24f00/64fd9c395a16efb4bee5abc7_The%20Money%20Shot%20Seconds%20Banner.jpg" 
            alt="Seconds Film"
          />
          <div className="hero-scrim" />
        </div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SECONDS
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Buy A Second. Earn Royalties.
          </motion.h2>
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/mint/when-night-is-almost-done" className="btn-primary">
              MINT NOW
            </Link>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about"
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Own a part of the next wave of cinema.</h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(18px, 3vw, 24px)', 
          color: 'var(--muted)', 
          maxWidth: '800px', 
          margin: '0 auto 60px',
          lineHeight: 1.6
        }}>
          We are leveling the playing field and changing the way movies are made with Web3. 
          You buy a second and when we sell the film you earn royalties plus much more.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="features">
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>The Academy</h3>
            <p>
              Our academy programme works with disadvantaged and underrepresented young people. 
              We give them crucial experience and contacts in an industry that would otherwise be closed off to them.
            </p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Own Seconds of a Film</h3>
            <p>
              When you mint a second, you receive an NFT representing your ownership. 
              Once filming is complete, your NFT updates to showcase the actual frames from your second.
            </p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Real-world NFT Perks</h3>
            <p>
              Gain ongoing royalty payments, behind-the-scenes access, invitations to cast/crew events, 
              premiere tickets, and other unique experiences.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Pricing</h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--muted)', 
          maxWidth: '700px', 
          margin: '0 auto 40px',
          lineHeight: 1.6
        }}>
          Pricing changes depending on production stage. 100% of NFTs are available at stage one 
          and mint remains open until funds are raised.
        </p>
        
        <div className="pricing-grid">
          <motion.div 
            className="pricing-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="subtitle">Stage One</p>
            <h3>Synopsis</h3>
            <div className="price">0.05 ETH</div>
            <p>Mint your second at the lowest price during the early synopsis stage.</p>
          </motion.div>
          
          <motion.div 
            className="pricing-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="subtitle">Stage Two</p>
            <h3>Script</h3>
            <div className="price">0.07 ETH</div>
            <p>When we reach script stage, the price increases to reflect progress.</p>
          </motion.div>
          
          <motion.div 
            className="pricing-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="subtitle">Stage Three</p>
            <h3>Green Light</h3>
            <div className="price">CLOSED</div>
            <p>At this point we have either minted out or have traditional finance in place.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Films Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">The Films</h2>
        
        <div className="films-grid">
          <motion.div 
            className="film-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/mint/when-night-is-almost-done" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="film-card-content">
                <h3>Film 1: When Night is Almost Done</h3>
                <p style={{ color: 'var(--muted)', margin: '10px 0' }}>
                  Our first Seconds NFT. Currently in pre-production.
                </p>
                <span className="status">MINT LIVE (Stage 2)</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div 
            className="film-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="film-card-content">
              <h3>Series 2: Hotel Stories</h3>
              <p style={{ color: 'var(--muted)', margin: '10px 0' }}>
                Multi-genre anthology series. Currently at scripting phase.
              </p>
              <span className="status coming-soon">Coming Soon</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="film-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="film-card-content">
              <h3>Film 3: A Wicked Man</h3>
              <p style={{ color: 'var(--muted)', margin: '10px 0' }}>
                A grieving father must conspire with a malevolent entity to find his daughter's killer.
              </p>
              <span className="status coming-soon">Coming Soon</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Seconds | Building the future of independent cinema</p>
      </footer>
    </>
  );
}
