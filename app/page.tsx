"use client";

import React, { useMemo, useState } from "react";
import { getContract } from "thirdweb";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";
import { ConnectButton, useActiveAccount, TransactionButton } from "thirdweb/react";
import { client } from "./thirdwebClient";

const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "").toLowerCase();
const chain =
  CHAIN_NAME === "ethereum" ? ethereum :
  CHAIN_NAME === "base" ? base :
  CHAIN_NAME === "polygon" ? polygon :
  CHAIN_NAME === "base-sepolia" ? baseSepolia :
  CHAIN_NAME === "polygon-amoy" ? polygonAmoy :
  ethereum;

// Optional soft cap to keep UI friendly (contract will still enforce its own limits)
const UI_MAX_PER_TX = Number(process.env.NEXT_PUBLIC_UI_MAX_PER_TX || 5);

const contract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});

export default function Page() {
  const account = useActiveAccount();
  const [qty, setQty] = useState<number>(1);

  const canDecrement = qty > 1;
  const canIncrement = qty < UI_MAX_PER_TX;

  const qtyBigInt = useMemo(() => BigInt(qty), [qty]);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Seconds — Mint</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>Connect your wallet to mint.</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <ConnectButton client={client} chain={chain} />
      </div>

      {account && (
        <>
          {/* Quantity selector */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 20 }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={!canDecrement}
              style={{ padding: "8px 12px", fontSize: 16 }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={UI_MAX_PER_TX}
              value={qty}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v)) setQty(Math.min(Math.max(1, v), UI_MAX_PER_TX));
              }}
              style={{ width: 80, textAlign: "center", padding: "8px 6px", fontSize: 16 }}
              aria-label="Quantity"
            />
            <button
              onClick={() => setQty((q) => Math.min(UI_MAX_PER_TX, q + 1))}
              disabled={!canIncrement}
              style={{ padding: "8px 12px", fontSize: 16 }}
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
                quantity: qtyBigInt, // 👈 mint N at once
              })
            }
            onError={(err) => {
              console.error(err);
              alert(err?.message ?? "Mint failed");
            }}
            onTransactionConfirmed={(tx) => {
              console.log("Minted!", tx.transactionHash);
              alert(`Minted ${qty} NFT${qty > 1 ? "s" : ""}!`);
            }}
          >
            Mint {qty}
          </TransactionButton>

          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
            Max per transaction (UI): {UI_MAX_PER_TX}. Contract limits still apply.
          </p>
        </>
      )}
    </main>
  );
}
