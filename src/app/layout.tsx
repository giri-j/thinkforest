import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { config } from "@/lib/config";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  variable: "--font-gowun",
  display: "swap",
  preload: false,
});

const OG_IMAGE = "/practice3/c/095.webp"; // 황금 숲의 도시 — 1280×720

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: "기획의 숲 — Think; Plan; Build.", template: "%s" },
  description: "생각이 기획을 만나, 사업으로 자라납니다. 기획자 기리의 포트폴리오와 블로그.",
  icons: { icon: "/favicon.svg" },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    siteName: "기획의 숲",
    locale: "ko_KR",
    images: [{ url: OG_IMAGE, width: 1280, height: 720, alt: "기획의 숲 — 황금 숲의 도시" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  themeColor: "#0b0f0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={gowunBatang.variable} suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
