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
  title: "Seconds: Own seconds, earn royalties",
  description: "Seconds allows you to buy a second of a film and get paid royalties based on the films profits.",
  metadataBase: new URL('https://mint.secondsfilm.com'),
  icons: {
    icon: '/seconds-Favicon.png',
    apple: '/Second-Webclip.png',
  },
  openGraph: {
    title: "Seconds: Own seconds, earn royalties",
    description: "Seconds allows you to buy a second of a film and get paid royalties based on the films profits.",
    url: 'https://mint.secondsfilm.com',
    images: [
      {
        url: 'https://mint.secondsfilm.com/Meta-image.avif',
        width: 1200,
        height: 630,
        alt: 'Seconds - Own seconds, earn royalties',
        type: 'image/avif',
      }
    ],
    type: 'website',
    siteName: 'Seconds',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seconds: Own seconds, earn royalties",
    description: "Seconds allows you to buy a second of a film and get paid royalties based on the films profits.",
    images: ['https://mint.secondsfilm.com/Meta-image.avif'],
    creator: '@secondsfilm',
  },
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
