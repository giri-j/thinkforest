import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import VanSchneiderSite from "@/components/vanschneider/VanSchneiderSite";
import { site, hero } from "@/content/forest-content";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--vs-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--vs-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.brandKo} | ${site.brand}`,
  description: hero.subtitleKo,
};

export default function Page() {
  return (
    <div className={`${sans.variable} ${mono.variable}`}>
      <VanSchneiderSite />
    </div>
  );
}
