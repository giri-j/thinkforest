import HomeHero from "@/components/home/HomeHero";
import HomePaths from "@/components/home/HomePaths";

export default function Home() {
  return (
    <main className="bg-[#F6F8F7]">
      <HomeHero />

      {/* Spacing between Hero and Paths is handled by HomePaths padding */}
      <HomePaths />
    </main>
  );
}
