import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Seconds — Mint",
  description: "Mint Seconds: When the Night is Almost Done",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
