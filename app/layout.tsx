// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import { pineappleBold, pineappleRegular } from "./fonts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seconds Film — Own a part of the next wave of cinema",
  description: "Buy a second. Earn royalties. Mint Seconds NFTs from independent films and earn royalties when the film sells.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${pineappleBold.variable} ${pineappleRegular.variable}`}>
      <body style={{ fontFamily: "var(--font-poppins), ui-sans-serif, system-ui" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
