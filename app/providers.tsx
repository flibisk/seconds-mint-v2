"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { ethereum, base, polygon, baseSepolia, polygonAmoy } from "thirdweb/chains";

const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "").toLowerCase();
const activeChain =
  CHAIN_NAME === "ethereum" ? ethereum :
  CHAIN_NAME === "base" ? base :
  CHAIN_NAME === "polygon" ? polygon :
  CHAIN_NAME === "base-sepolia" ? baseSepolia :
  CHAIN_NAME === "polygon-amoy" ? polygonAmoy :
  ethereum; // fallback

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}  // 👈 use clientId here
      activeChain={activeChain}
    >
      {children}
    </ThirdwebProvider>
  );
}
