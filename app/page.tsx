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

const contract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});

export default function Page() {
  const account = useActiveAccount();
  const [qtyStr, setQtyStr] = useState<string>("1");

  // sanitize: allow only positive integers, default to 1
  const qtyNum = useMemo(() => {
    const n = Number(qtyStr);
    return Number.isFinite(n) && n >= 1 && Number.isInteger(n) ? n : 1;
  }, [qtyStr]);

  const qtyBigInt = useMemo(() => BigInt(qtyNum), [qtyNum]);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Seconds — Mint</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>Connect your wallet to mint.</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <ConnectButton client={client} chain={chain} />
      </div>

      {account && (
        <>
          {/* Quantity selector with no upper cap */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 20 }}>
            <button
              onClick={() => setQtyStr(String(Math.max(1, qtyNum - 1)))}
              style={{ padding: "8px 12px", fontSize: 16 }}
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
              style={{ width: 100, textAlign: "center", padding: "8px 6px", fontSize: 16 }}
              aria-label="Quantity"
            />

            <button
              onClick={() => setQtyStr(String(qtyNum + 1))}
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
                quantity: qtyBigInt, // no cap — contract limits apply
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
          >
            Mint {qtyNum}
          </TransactionButton>

          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
            No UI limit. Your transaction will still fail if it exceeds contract settings, supply, or gas constraints.
          </p>
        </>
      )}
    </main>
  );
}
