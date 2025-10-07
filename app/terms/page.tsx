"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
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
        
        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          text-decoration: none;
          margin-bottom: 40px;
          transition: opacity 0.2s ease;
        }
        
        .back-link:hover {
          opacity: 0.7;
        }
        
        .terms-title {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          margin: 0 0 10px;
          letter-spacing: 0.01em;
        }
        
        .terms-updated {
          color: var(--muted);
          margin: 0 0 40px;
          font-size: 14px;
        }
        
        .terms-intro {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 40px;
        }
        
        .terms-intro strong {
          color: var(--fg);
        }
        
        .terms-section {
          margin-bottom: 40px;
        }
        
        .terms-section h4 {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 24px;
          font-weight: 400;
          margin: 0 0 20px;
          color: var(--accent);
        }
        
        .terms-section p {
          color: var(--muted);
          line-height: 1.7;
          margin: 0 0 16px;
        }
        
        .terms-section p:last-child {
          margin-bottom: 0;
        }
        
        .terms-footer {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          color: var(--muted);
        }
      `}</style>

      <motion.div 
        className="terms-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-updated">Last updated: 21 August 2025</p>
        
        <p className="terms-intro">
          These Terms and Conditions ("Terms") govern participation in the Seconds NFT Project ("Seconds"), operated by Seconds—affiliated with <strong>Screen Northants Limited</strong>, a UK private company limited by guarantee without share capital, registered in England and Wales with company number <strong>09663514</strong> and registered office at <strong>Thistledown Barn, Holcot Lane, Sywell, Northampton, Northamptonshire, NN6 0BG</strong>. Incorporated on <strong>30 June 2015</strong>, the company is active and engaged in motion picture production, projection, exhibition organisation, and cultural education.
        </p>
        
        <p className="terms-intro">
          By purchasing, holding, or otherwise interacting with a Seconds NFT (collectively, "NFT" or "NFTs"), you ("Holder") accept and agree to be bound by these Terms.
        </p>

        <div className="terms-section">
          <h4>1. Nature of the Project</h4>
          <p>1.1 Seconds is a brand linked to Screen Northants Limited, established to manage Web3-related elements of the film <em>Seconds</em>.</p>
          <p>1.2 Seconds NFTs are digital collectibles created to provide holders with community engagement opportunities and discretionary benefits.</p>
          <p>1.3 Seconds NFTs are <strong>not securities</strong>, shares, or any regulated financial instrument. They are sold solely as <strong>collectors' items</strong> with built-in, discretionary rewards.</p>
        </div>

        <div className="terms-section">
          <h4>2. Use of Proceeds</h4>
          <p>2.1 Net proceeds from the mint (the "Mint Proceeds") will, upon mint closure, be transferred to <strong>Screen Northants Limited</strong> to finance the production of the Film.</p>
          <p>2.2 Mint Proceeds are <strong>non-refundable</strong>. Holders acknowledge that no guarantee is made regarding the Film's completion, success, or return on investment.</p>
        </div>

        <div className="terms-section">
          <h4>3. Holder Benefits</h4>
          <p>3.1 Holders may, at the sole discretion of Seconds and/or Screen Northants Limited, receive access to Web3-based experiences, real-world events, and project-related initiatives.</p>
          <p>3.2 Holders who actively support or promote the Film may, at the discretion of the Seconds and/or Screen Northants team, receive additional discretionary benefits.</p>
          <p>3.3 All benefits, rewards, and opportunities are subject to change or cancellation without prior notice.</p>
        </div>

        <div className="terms-section">
          <h4>4. Royalties from Film Distribution</h4>
          <p>4.1 Upon completion of the Film and sale of distribution rights, royalties ("Royalties") will be paid in <strong>British Pounds Sterling (GBP, £)</strong>.</p>
          <p>4.2 The equivalent value in ETH will be calculated at the time of payment and distributed to the wallet addresses associated with Seconds NFTs.</p>
          <p>4.3 The timing, method, and calculation of Royalties distribution are at the sole discretion of Seconds and Screen Northants Limited. No contractual entitlement to specific returns is granted.</p>
        </div>

        <div className="terms-section">
          <h4>5. Physical Perks & Personal Data</h4>
          <p>5.1 Certain perks (e.g., physical artwork, merchandise, or event invitations) may require provision of personal data such as name and delivery address.</p>
          <p>5.2 Providing personal data is voluntary. Holders may opt out of such perks and still retain other benefits.</p>
          <p>5.3 All collected personal data will be processed and stored in strict compliance with <strong>UK GDPR</strong> and applicable data protection laws, and treated as private and confidential.</p>
        </div>

        <div className="terms-section">
          <h4>6. Disclaimers & Risk Acknowledgment</h4>
          <p>6.1 Holders acknowledge and agree that:</p>
          <p>(a) Seconds NFTs are speculative digital collectibles and <strong>do not guarantee financial return or profit</strong>;</p>
          <p>(b) The Film's success and related benefits are uncertain and subject to external risks;</p>
          <p>(c) Seconds and Screen Northants Limited shall not be liable for any loss—direct, indirect, incidental, or consequential—arising from participation;</p>
          <p>(d) NFTs may be exposed to technological risks, including smart contract vulnerabilities, blockchain instability, or wallet failures.</p>
        </div>

        <div className="terms-section">
          <h4>7. Governing Law & Jurisdiction</h4>
          <p>7.1 These Terms are governed by and construed under the laws of <strong>England and Wales</strong>.</p>
          <p>7.2 Any disputes will be subject to the exclusive jurisdiction of the courts of <strong>England and Wales</strong>.</p>
        </div>

        <div className="terms-section">
          <h4>8. Entire Agreement</h4>
          <p>8.1 These Terms constitute the entire agreement between Seconds, Screen Northants Limited, and the Holder regarding the NFTs and supersede all previous agreements or understandings, whether written or oral.</p>
        </div>

        <div className="terms-footer">
          <p>© 2025 Seconds Limited</p>
        </div>
      </motion.div>
    </>
  );
}

