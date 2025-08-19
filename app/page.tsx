"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";
import { ConnectButton, useActiveAccount, TransactionButton } from "thirdweb/react";

// Client (uses your NEXT_PUBLIC_THIRDWEB_CLIENT_ID)
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// Map env string -> chain object
const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "").toLowerCase();
const chain =
  CHAIN_NAME === "ethereum" ? ethereum :
  CHAIN_NAME === "base" ? base :
  CHAIN_NAME === "polygon" ? polygon :
  CHAIN_NAME === "base-sepolia" ? baseSepolia :
  CHAIN_NAME === "polygon-amoy" ? polygonAmoy :
  ethereum; // default fallback

// Your ERC721 Drop (NFT Drop) contract
const contract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});

export default function Page() {
  const account = useActiveAccount();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Seconds — Mint</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>Connect your wallet to mint your NFT.</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ConnectButton client={client} />
      </div>

      {account && (
        <div style={{ marginTop: 32 }}>
          <TransactionButton
            transaction={() =>
              claimTo({
                contract,
                to: account.address,
                quantity: 1n, // mint 1
              })
            }
            onError={(err) => {
              console.error(err);
              alert(err.message ?? "Mint failed");
            }}
            onTransactionConfirmed={(tx) => {
              console.log("Minted!", tx.transactionHash);
              alert("Mint successful!");
            }}
          >
            Mint
          </TransactionButton>
        </div>
      )}
    </main>
  );
}
