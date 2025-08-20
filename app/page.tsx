"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getContract } from "thirdweb";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import { claimTo, getActiveClaimCondition } from "thirdweb/extensions/erc721";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
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

// tiny helper (ethers-like) to format bigints
function formatUnits(bi: bigint, decimals = 18): string {
  const s = bi.toString().padStart(decimals + 1, "0");
  const whole = s.slice(0, -decimals);
  const frac = s.slice(-decimals).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole;
}

export default function Page() {
  const account = useActiveAccount();
  const [qtyStr, setQtyStr] = useState<string>("1");

  // pricing state
  const [unitPriceWei, setUnitPriceWei] = useState<bigint | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string>("ETH");
  const [currencyDecimals, setCurrencyDecimals] = useState<number>(18);

  // read active claim condition price on mount
  useEffect(() => {
    (async () => {
      try {
        const cc = await getActiveClaimCondition({ contract });
        // cc.price is BigInt, cc.currencyAddress is 0x… (native or ERC20)
        const price = cc?.price ?? 0n;
        setUnitPriceWei(price);

        const currency = cc?.currencyAddress?.toLowerCase?.() ?? "0x0000000000000000000000000000000000000000";
        const isNative =
          currency === "0x0000000000000000000000000000000000000000" ||
          currency === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

        if (isNative) {
          // native coin on chain (ETH/BaseETH/MATIC -> show chain-appropriate symbol if you prefer)
          setCurrencySymbol(CHAIN_NAME === "polygon" || CHAIN_NAME === "polygon-amoy" ? "MATIC" : "ETH");
          setCurrencyDecimals(18);
        } else {
          const md = await getCurrencyMetadata({
            client,
            chain,
            address: currency,
          });
          setCurrencySymbol(md.symbol || "TOKEN");
          setCurrencyDecimals(md.decimals ?? 18);
        }
      } catch (e) {
        console.error("Failed to read claim condition:", e);
        // keep defaults; UI will just omit price if unreadable
        setUnitPriceWei(null);
      }
    })();
  }, []);

  // sanitize qty (positive int)
  const qtyNum = useMemo(() => {
    const n = Number(qtyStr);
    return Number.isFinite(n) && n >= 1 && Number.isInteger(n) ? n : 1;
  }, [qtyStr]);

  const qtyBigInt = useMemo(() => BigInt(qtyNum), [qtyNum]);

  // totals
  const unitPriceDisplay =
    unitPriceWei !== null ? `${formatUnits(unitPriceWei, currencyDecimals)} ${currencySymbol}` : "—";
  const totalDisplay =
    unitPriceWei !== null
      ? `${formatUnits(unitPriceWei * BigInt(qtyNum), currencyDecimals)} ${currencySymbol}`
      : "—";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Seconds — Mint</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>Connect your wallet to mint.</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <ConnectButton client={client} chain={chain} />
      </div>

      {account && (
        <>
          {/* Quantity selector (no upper cap) */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 12 }}>
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
              style={{ width: 110, textAlign: "center", padding: "8px 6px", fontSize: 16 }}
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

          {/* Cost line */}
          <div style={{ marginBottom: 20, fontSize: 14, opacity: 0.8 }}>
            <div>Price per NFT: <strong>{unitPriceDisplay}</strong></div>
            <div>Total: <strong>{totalDisplay}</strong></div>
          </div>

          <TransactionButton
            transaction={() =>
              claimTo({
                contract,
                to: account.address,
                quantity: qtyBigInt, // mint N at once
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

          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>
            No UI limit. Transactions can still fail if they exceed contract rules, supply, or gas constraints.
          </p>
        </>
      )}
    </main>
  );
}
