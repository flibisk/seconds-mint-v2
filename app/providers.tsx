"use client";
import { ThirdwebProvider } from "thirdweb/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // v5: no client/clientId props here
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
