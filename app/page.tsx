"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount, NFTDrop } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

const contract = NFTDrop({
  client,
  chain: process.env.NEXT_PUBLIC_CHAIN!, // "ethereum" for you
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
          <contract.MintButton />
        </div>
      )}
    </main>
  );
}
