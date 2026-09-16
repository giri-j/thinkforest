import type { Metadata } from "next";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  variable: "--font-gowun",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "기획의 숲 | Think Forest - Portfolio & Blog",
  description: "기획자 은길전의 포트폴리오와 블로그 공간입니다.",
  icons: {
    icon: "/favicon.svg",
  },
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
