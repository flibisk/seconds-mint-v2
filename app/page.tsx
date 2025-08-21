"use client";

import React, { useMemo, useState } from "react";
import { getContract } from "thirdweb";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";
import { ConnectButton, useActiveAccount, TransactionButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./thirdwebClient"; // keep your existing client import

// resolve chain from env (same as your working setup)
const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "").toLowerCase();
const chain =
  CHAIN_NAME === "ethereum" ? ethereum :
  CHAIN_NAME === "base" ? base :
  CHAIN_NAME === "polygon" ? polygon :
  CHAIN_NAME === "base-sepolia" ? baseSepolia :
  CHAIN_NAME === "polygon-amoy" ? polygonAmoy :
  ethereum; // fallback

// only show the external wallets you want (no email/passkey/social)
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  // createWallet("walletConnect"), // optional QR for many mobile wallets
];

// your ERC721 Drop (NFT Drop) contract
const contract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});

export default function Page() {
  const account = useActiveAccount();
  const [qtyStr, setQtyStr] = useState<string>("1");

  // sanitize to positive integer (no upper cap here; contract/gas still apply)
  const qtyNum = useMemo(() => {
    const n = Number(qtyStr);
    return Number.isFinite(n) && n >= 1 && Number.isInteger(n) ? n : 1;
  }, [qtyStr]);

  const qtyBigInt = useMemo(() => BigInt(qtyNum), [qtyNum]);

  return (
    <>
      {/* visual-only styles */}
      <style jsx global>{`
        :root{
          --bg: #0b0b0b;
          --bg2: #121212;
          --fg: #ffffff;
          --muted: rgba(255,255,255,0.72);
          --accent: #d9ff5b; /* tweak to your exact Seconds accent */
        }
        /* make sure the root can span full width/height */
html, body, #__next { margin: 0; width: 100%; height: 100%; }

  
        .screen {
  position: relative;
  min-height: 100dvh;   /* full viewport height */
  width: 100vw;         /* full width */
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 24px;
}
  
        /* 🔁 change from absolute → fixed so it ignores any parent width limits */
.bg {
  position: fixed;      /* was: absolute */
  inset: 0;
  z-index: 0;
}
        .bgMedia {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
        .scrim {
          position: absolute; inset: 0;
          background:
            radial-gradient(1200px 600px at 60% -10%, rgba(217,255,91,0.12), transparent 60%),
            linear-gradient(180deg, rgba(11,11,11,0.65), rgba(18,18,18,0.85));
          backdrop-filter: blur(2px);
        }
  
        .box {
          position: relative;
          z-index: 1;                       /* above background */
          width: 100%;
          max-width: 720px;
          border-radius: 18px;
          padding: 28px 22px;
          background: rgba(12,12,12,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        .title { font-weight: 800; font-size: clamp(32px,4vw,48px); margin: 0 0 6px; letter-spacing: 0.02em; }
        .sub { margin: 0 0 18px; color: var(--muted); }
  
        .row { display: flex; justify-content: center; align-items: center; gap: 8px; }
  
        .btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(254, 254, 254, 0.14);
          background: rgba(255,255,255,0.06);
          color: var(--fg);
          font-weight: 600;
          transition: transform .06s ease, background .2s ease, border-color .2s ease;
        }
        .btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.24); }
        .btn:active { transform: translateY(1px); }
  
        .qtyInput {
          width: 110px;
          text-align: center;
          padding: 10px 8px;
          font-size: 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          color: var(--fg);
          border: 1px solid rgba(255,255,255,0.14);
          outline: none;
        }
  
        .mintButton {
        margin-top: 16px;
        width: 100%;
        height: 48px;
        border-radius: 14px;
        font-weight: 700;
        letter-spacing: 0.02em;
        background: #ffffff;
        color: #0b0b0b;
        border: 1px solid #e6e6e6;
}

        .mintButton:hover { background: #f2f2f2; }
        .mintButton:active { transform: translateY(1px); }
        .mintButton:disabled { opacity: 0.6; cursor: not-allowed; }
  
        .note { font-size: 12px; opacity: 0.65; margin-top: 12px; }
      `}</style>
  
      <div className="screen">
        {/* Background media (video preferred; image as fallback) */}
        <div className="bg" aria-hidden="true">
          <video
            className="bgMedia"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/bg.jpg"
            onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <img src="https://cdn.prod.website-files.com/601a7eb46cf274c860e24f00/64fd9c395a16efb4bee5abc7_The%20Money%20Shot%20Seconds%20Banner.jpg" alt="" className="bgMedia" />
          <div className="scrim" />
        </div>
  
        {/* Centered content box */}
        <div className="box">
          <h1 className="title">Mint Seconds</h1>
          <p className="sub">Connect your wallet to mint seconds from the film <b><i>When Night is Almost Done</i></b>. Once complete you will receive a unique NFT for each second you mint. Keep them to earn exclusive access and royalties when the film sells. Or trade them and speculate.</p>
         
  
          <div className="row" style={{ marginBottom: 20 }}>
            <ConnectButton client={client} chain={chain} wallets={wallets} />
          </div>
  
          {account && (
            <>
              <div className="row" style={{ marginBottom: 16 }}>
                <button
                  onClick={() => setQtyStr(String(Math.max(1, qtyNum - 1)))}
                  className="btn"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
  
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={qtyStr}
                  onChange={(e) => setQtyStr(e.target.value.replace(/[^\d]/g, ""))}
                  className="qtyInput"
                  aria-label="Quantity"
                />
  
                <button
                  onClick={() => setQtyStr(String(qtyNum + 1))}
                  className="btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
  
              <TransactionButton
              transaction={() =>
              claimTo({
              contract,
              to: account.address,
              quantity: qtyBigInt,
               })
  }
               onError={(err) => {
               console.error(err);
               alert(err?.message ?? "Mint failed");
              }}
  onTransactionConfirmed={(tx) => {
    console.log("Minted!", tx.transactionHash);
    alert(`Minted ${qtyNum} NFT${qtyNum > 1 ? "s" : ""}!`);
  }}
  className="mintButton"
  style={{
    marginTop: 16,
    width: "100%",
    height: 48,
    borderRadius: 14,
    fontWeight: 700,
    letterSpacing: "0.02em",
    background: "#ffffff",
    color: "#0b0b0b",
    border: "1px solid #e6e6e6",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }}
>
  Mint {qtyNum}
</TransactionButton>

  
              <p className="note">
                There are no limits to the amount of Seconds you can mint. However transactions can still fail if they exceed contract rules, supply, or gas constraints.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
  