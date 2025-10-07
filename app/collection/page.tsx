"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "../thirdwebClient";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

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

const contract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});

export default function CollectionPage() {
  const account = useActiveAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchNFTs() {
      if (!account?.address) {
        setNfts([]);
        return;
      }

        setIsLoading(true);
        try {
          const ownedNFTs = await getOwnedNFTs({
            contract,
            owner: account.address,
          });
          console.log("Fetched NFTs:", ownedNFTs); // Debug log
          console.log("NFT metadata:", ownedNFTs.map(nft => ({
            id: nft.id.toString(),
            name: nft.metadata?.name,
            image: nft.metadata?.image,
          }))); // Debug log
          setNfts(ownedNFTs);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
          setNfts([]);
        } finally {
          setIsLoading(false);
        }
    }

    fetchNFTs();
  }, [account?.address]);

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            <img src="/seconds-logo.svg" alt="Seconds" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav">
            <Link href="/#about">About</Link>
            <Link href="/#films">Films</Link>
            <Link href="/collection">My Collection</Link>
            <div className="header-connect">
              <ConnectButton client={client} chain={chain} wallets={wallets} />
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/#films" onClick={() => setMobileMenuOpen(false)}>Films</Link>
              <Link href="/collection" onClick={() => setMobileMenuOpen(false)}>My Collection</Link>
              <div className="mobile-connect">
                <ConnectButton client={client} chain={chain} wallets={wallets} />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
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
        
        /* Header Styles */
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
        
        /* Make Connect button more compact */
        .header-connect button {
          padding: 8px 16px !important;
          font-size: 14px !important;
          height: auto !important;
          min-height: auto !important;
          transition: background-color 0.2s ease, color 0.2s ease !important;
        }
        
        .header-connect button:hover {
          background-color: #d9ff5b !important;
          color: #0b0b0b !important;
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          color: var(--fg);
          cursor: pointer;
          padding: 8px;
          margin: -8px;
          transition: opacity 0.2s ease;
        }
        
        .mobile-menu-button:hover {
          opacity: 0.7;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          background: rgba(11,11,11,0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        
        .mobile-nav a {
          color: var(--muted);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 0;
          transition: color 0.2s ease;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .mobile-nav a:hover {
          color: var(--fg);
        }
        
        .mobile-connect {
          padding-top: 8px;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-button {
            display: block;
          }
          
          .header {
            padding: 12px 16px;
          }
          
          .logo img {
            height: 24px;
          }
        }
        
        .collection-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 20px 80px;
          min-height: 100vh;
        }
        
        .collection-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .collection-title {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          margin: 0 0 16px;
          letter-spacing: 0.01em;
        }
        
        .collection-subtitle {
          color: var(--muted);
          font-size: 18px;
          margin: 0;
        }
        
        .connect-prompt {
          text-align: center;
          padding: 80px 20px;
        }
        
        .connect-prompt h3 {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 28px;
          font-weight: 400;
          margin: 0 0 24px;
        }
        
        .nft-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .nft-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .nft-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(217, 255, 91, 0.2);
        }
        
        .nft-image {
          width: 100%;
          aspect-ratio: 1;
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .nft-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .nft-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: var(--muted);
        }
        
        .nft-info {
          padding: 20px;
        }
        
        .nft-name {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 20px;
          font-weight: 400;
          margin: 0 0 8px;
          color: var(--fg);
        }
        
        .nft-id {
          color: var(--muted);
          font-size: 14px;
          margin: 0;
        }
        
        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }
        
        .empty-state h3 {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: 28px;
          font-weight: 400;
          margin: 0 0 16px;
        }
        
        .empty-state p {
          color: var(--muted);
          margin: 0 0 32px;
          font-size: 16px;
        }
        
        .mint-link {
          display: inline-block;
          padding: 12px 32px;
          background: var(--accent);
          color: var(--bg);
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        
        .mint-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(217, 255, 91, 0.3);
        }
        
        .loading {
          text-align: center;
          padding: 60px 20px;
          color: var(--muted);
        }
        
        @media (max-width: 768px) {
          .nft-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }
      `}</style>

      <div className="collection-container">
        <div className="collection-header">
          <h1 className="collection-title">My Seconds Collection</h1>
          <p className="collection-subtitle">
            {account ? `Viewing collection for ${account.address.slice(0, 6)}...${account.address.slice(-4)}` : "Connect your wallet to view your collection"}
          </p>
        </div>

        {!account ? (
          <div className="connect-prompt">
            <h3>Connect Your Wallet</h3>
            <p className="collection-subtitle">
              Connect your wallet to view your Seconds NFTs
            </p>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
              <ConnectButton client={client} chain={chain} wallets={wallets} />
            </div>
          </div>
        ) : isLoading ? (
          <div className="loading">
            <p>Loading your collection...</p>
          </div>
        ) : nfts && nfts.length > 0 ? (
          <motion.div 
            className="nft-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {nfts.map((nft, index) => {
              // Handle different image URL formats (IPFS, HTTP, data URIs)
              const getImageUrl = (url: string | undefined) => {
                if (!url) return null;
                // Convert IPFS URLs to HTTP gateway
                if (url.startsWith('ipfs://')) {
                  return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
                }
                return url;
              };

              const imageUrl = getImageUrl(nft.metadata?.image);

              return (
                <motion.div
                  key={nft.id.toString()}
                  className="nft-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="nft-image">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={nft.metadata?.name || `Second #${nft.id}`}
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="nft-placeholder">🎬</div>';
                        }}
                      />
                    ) : (
                      <div className="nft-placeholder">🎬</div>
                    )}
                  </div>
                  <div className="nft-info">
                    <h3 className="nft-name">
                      {nft.metadata?.name || `Second #${nft.id}`}
                    </h3>
                    <p className="nft-id">Token ID: {nft.id.toString()}</p>
                    {nft.metadata?.description && (
                      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                        {nft.metadata.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="empty-state">
            <h3>No Seconds Yet</h3>
            <p>You don't own any Seconds NFTs yet. Mint your first second to get started!</p>
            <Link href="/#films" className="mint-link">
              Browse Films
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

