"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./thirdwebClient";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import NewsletterSignup from "./components/NewsletterSignup";

// resolve chain from env
const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "").toLowerCase();
const chain =
  CHAIN_NAME === "ethereum" ? ethereum :
  CHAIN_NAME === "base" ? base :
  CHAIN_NAME === "polygon" ? polygon :
  CHAIN_NAME === "base-sepolia" ? baseSepolia :
  CHAIN_NAME === "polygon-amoy" ? polygonAmoy :
  ethereum;

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

function FAQItem({ question, answer, index }: { question: string; answer: string | React.ReactNode; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>+</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQTabs() {
  const [activeTab, setActiveTab] = useState<'film' | 'nft'>('nft');

  return (
    <div>
      <div className="faq-tabs">
        <button
          className={`faq-tab ${activeTab === 'film' ? 'active' : ''}`}
          onClick={() => setActiveTab('film')}
        >
          Film FAQ
        </button>
        <button
          className={`faq-tab ${activeTab === 'nft' ? 'active' : ''}`}
          onClick={() => setActiveTab('nft')}
        >
          NFT FAQ
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'film' && (
          <motion.div
            key="film"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="faq-container"
          >
            <FAQItem
              index={0}
              question="Founders Background"
              answer={
                <div>
                  <p>The founders of Seconds have been in the creative and movie making business for decades.</p>
                  <p>Paul Mills is the owner of Screen Northants with several films already under his belt. Screen Northants are the production company that will provide the production model for The Money Shot's movies.</p>
                  <p>Peter Snell has been working in the film and television industry for over 15 years and developing projects in web3 for clients and himself since 2018. He is the creative that will be merging the NFTs with the movie making process and ensuring value for all NFT holders.</p>
                  <p>Our team are seasoned professionals that have worked on major motion pictures to TV and video games. They are also the ones passing down their experience and knowledge to our young, aspiring filmmakers.</p>
                </div>
              }
            />

            <FAQItem
              index={1}
              question="Surely you can't make a good film with that level of budget?"
              answer={
                <div>
                  <p>We can and we do.</p>
                  <p>We make films produced on a budget, but not a budget that means we can't make good films. This model not only allows us to give directors creative freedom but also allows us to reach a profit quickly - putting that profit to work on the next film.</p>
                  <p>Think Blumhouse and you can't go far wrong. They started in 2008 with Paranormal Activity - which was shot and produced for $15,000 but grossed over $193 million worldwide.</p>
                  <p>We won't be making films shot with a handy-cam, but you get the idea. Smaller budget equals bigger profit, allows bigger budget for the next movie (if needed to make it great).</p>
                </div>
              }
            />

            <FAQItem
              index={2}
              question="How can making movies do good?"
              answer={
                <div>
                  <p>Seconds has partnered with Screen Northants for all its production - who in 2016 pitched an idea to BBC Children in Need.</p>
                  <p>The idea that was pitched was that we could use the film making process to raise aspirations in young people, with a particular focus on those who are severely disadvantaged and/or underrepresented in our industry.</p>
                  <p>BBC Children in Need provided the proof-of-concept funding and we have produced 3 feature films in our model and worked with 210 young people who fit the Children in Need (CIN) criteria. The results were fantastic, and BBC Children in Need were blown away by the achievements.</p>
                </div>
              }
            />

            <FAQItem
              index={3}
              question="How Screen Northants works"
              answer={
                <div>
                  <p>Seconds works directly with Screen Northants on the production of its movies. Screen Northants itself is made up of 2 strands: Film and Academy, and they both feed into each other. They are of equal importance to the success of the project as whole.</p>
                  <p>As a result of this partnership we can make high quality professional Films/Television, while creating a meritocracy within industry. Levelling the playing field by removing socio-economic, geographic and cultural barriers so that anyone with the right work ethic will have a shot at the big time.</p>
                  <p>This seems like a simple statement but there are a couple of compelling reasons for wanting to do this.</p>
                  <p>Firstly, because we engage disadvantaged and underrepresented young people on our projects, the expectation from industry was that the films themselves are simply educational tools or worse, student lead films. This is not the case, the best analogy we have for our model is that of a teaching hospital. Highly skilled professionals doing the work, while at the same time teaching juniors, allowing them to observe and even gain hands on experience whenever possible and without detracting from the quality of delivery.</p>
                  <p>Secondly, we have found that best way to reach the more severely disenfranchised and disengaged young person is to treat them like an equal and engage them on projects with substance. To say "I trust you" to work on a film we have made up as an academic exercise for them is a waste of time. To say "I trust you" on a film that is everyone's livelihood and puts food on tables to feed our families, has a massive impact on how those young people engage.</p>
                  <p>Thirdly, we want a BAFTA. We want to make films that are critical and or commercial successes as this not only validates the model but also helps subsidise it.</p>
                </div>
              }
            />

            <FAQItem
              index={4}
              question="What is The Academy?"
              answer={
                <div>
                  <p>70 disadvantaged young people will get unprecedented training and work experience in Film and TV.</p>
                  <p>The Academy is a 7 year programme which provides educational pathways and industry experience for 14-21 year olds.</p>
                  <p>How it works is simple. We identify young people through engagement with schools directly or in connection with the Schools Film Competition. From 14-16 we provide work experience on 2 films (one per year). We then guide them to an appropriate Further Education course and from 16-18 they gain experience on 2 more films. By this point we hope they will have a clear idea of which department they want to work in and we then guide them to an appropriate Higher Education course. Throughout the HE course, they will gain additional experience on 3 more films, but now focused specifically on the department they want to work in. At 21 they leave University with a degree, 7 feature films on their CV and decent network of professionals to chase for work.</p>
                </div>
              }
            />
          </motion.div>
        )}

        {activeTab === 'nft' && (
          <motion.div
            key="nft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="faq-container"
          >
            <FAQItem
              index={0}
              question="What is a Seconds NFT?"
              answer="It is what it is. Every NFT represents a second from the film produced. If you own 60 of our Seconds NFTs you own a minute. Seconds NFTs are a creative way of raising money to produce films. Every project will be different and come with unique artwork, traits, attributes and utility."
            />
            
            <FAQItem
              index={1}
              question="What is the benefit of owning the NFT?"
              answer={
                <div>
                  <p>Imagine owning a part of Reservoir Dogs before it was released. Let's take it one step further. Imagine owning rights to a character in Star Wars before it was big...</p>
                  <p>When you purchase a Second NFT, you gain ongoing royalty payments when the film generates revenue from streaming, box office, or distributions. Each NFT also comes with unique perks like behind-the-scenes access, premiere tickets, cast/crew events, and more.</p>
                </div>
              }
            />
            
            <FAQItem
              index={2}
              question="Why NFT?"
              answer={
                <div>
                  <p>We love the idea of web3 and how it combines the advanced, contemporary functionality of Web2 with the decentralised, community-governed ethos of Web1.</p>
                  <p>Web3 is the internet owned by the builders and users built on a massive computer that is owned by no one. That's just cool.</p>
                </div>
              }
            />
            
            <FAQItem
              index={3}
              question="How many Films will there be?"
              answer="We don't plan on stopping anytime soon. We're building a sustainable model for independent cinema that can continue producing quality films for years to come."
            />
            
            <FAQItem
              index={4}
              question="When will the project launch?"
              answer="Now! We have our mint live now! Gone are the days of minting out in 1 minute. Any traditional funders we approach for our films will also be buying seconds."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            <img src="/seconds-logo.svg" alt="Seconds" />
          </Link>
          <nav className="header-nav">
            <Link href="#about">About</Link>
            <Link href="#films">Mint</Link>
            <Link href="/collection">My Collection</Link>
            <Link href="/terms">Terms</Link>
            <div className="header-connect">
              <ConnectButton client={client} chain={chain} wallets={wallets} />
            </div>
          </nav>
        </div>
      </header>

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
        
        html {
          scroll-behavior: smooth;
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
        
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
        
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 20px 40px;
          background: rgba(11,11,11,0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        
        .logo:hover {
          opacity: 0.8;
        }
        
        .logo img {
          height: 32px;
          width: auto;
        }
        
        .header-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        
        .header-nav a {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .header-nav a:hover {
          color: var(--fg);
        }
        
        .header-connect {
          margin-left: 8px;
        }
        
        @media (max-width: 768px) {
          .header {
            padding: 16px 20px;
          }
          
          .logo img {
            height: 28px;
          }
          
          .header-nav {
            gap: 20px;
          }
          
          .header-nav a {
            font-size: 13px;
          }
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
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(48px, 8vw, 120px);
          font-weight: 400;
          margin: 0 0 20px;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }
        
        .hero h2 {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(24px, 4vw, 48px);
          font-weight: 400;
          margin: 0 0 40px;
          color: var(--accent);
          letter-spacing: 0.01em;
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
          scroll-margin-top: 80px; /* Offset for fixed header */
        }
        
        .section-title {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 400;
          margin: 0 0 60px;
          text-align: center;
          letter-spacing: 0.01em;
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
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 24px;
          font-weight: 400;
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
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 28px;
          font-weight: 400;
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
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 24px;
          font-weight: 400;
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
        
        .faq-tabs {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 40px;
        }
        
        .faq-tab {
          padding: 12px 32px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: var(--muted);
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .faq-tab:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }
        
        .faq-tab.active {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
        }
        
        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .faq-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          margin-bottom: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .faq-item:hover {
          border-color: rgba(217, 255, 91, 0.3);
        }
        
        .faq-question {
          padding: 24px 30px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 18px;
          user-select: none;
          transition: background 0.2s ease;
        }
        
        .faq-question:hover {
          background: rgba(255,255,255,0.03);
        }
        
        .faq-toggle {
          font-size: 24px;
          transition: transform 0.3s ease;
          color: var(--accent);
        }
        
        .faq-toggle.open {
          transform: rotate(45deg);
        }
        
        .faq-answer {
          padding: 0 30px 24px;
          color: var(--muted);
          line-height: 1.7;
        }
        
        .faq-answer p {
          margin: 0 0 12px;
        }
        
        .faq-answer p:last-child {
          margin-bottom: 0;
        }
        
        .footer {
          padding: 60px 20px;
          text-align: center;
          background: rgba(0,0,0,0.5);
          margin-top: 100px;
        }
        
        .footer-social {
          margin: 0 0 20px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        
        .footer-social a {
          color: var(--fg);
          text-decoration: none;
          padding: 10px 20px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }
        
        .footer-social a:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
        }
        
        .footer-links {
          margin: 20px 0;
        }
        
        .footer-links a {
          color: var(--accent);
          text-decoration: none;
          margin: 0 16px;
          transition: opacity 0.2s ease;
        }
        
        .footer-links a:hover {
          opacity: 0.7;
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
            src="/Background.avif" 
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
            <a href="#films" className="btn-primary">
              MINT NOW
            </a>
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
          margin: '0 auto 20px',
          lineHeight: 1.6
        }}>
          We are leveling the playing field and changing the way movies are made with Web3. 
          You buy a second and when we sell the film you earn royalties plus much more.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="section"
        style={{ paddingTop: '40px' }}
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
        id="films"
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

      {/* FAQ Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Frequently Asked Questions</h2>
        <FAQTabs />
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <NewsletterSignup />
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-social">
          <a href="https://x.com/secondsfilm" target="_blank" rel="noopener noreferrer">
            Follow on X/Twitter
          </a>
        </div>
        <div className="footer-links">
          <Link href="/terms">Terms and Conditions</Link>
        </div>
        <p>© 2025 Seconds | Building the future of independent cinema</p>
      </footer>
    </>
  );
}
