"use client";
import { createThirdwebClient } from "thirdweb";
import {
  sepolia,
  base,
  ethereum,
  polygon,
  optimism,
  arbitrum,
  type Chain,
} from "thirdweb/chains";

const CHAINS: Record<string, Chain> = {
  sepolia,
  base,
  ethereum,
  polygon,
  optimism,
  arbitrum,
};

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// default to sepolia for safety if not set
const chainName = (process.env.NEXT_PUBLIC_CHAIN || "sepolia").toLowerCase();
export const chain = CHAINS[chainName] ?? sepolia;
