import HeroCarousel from "@/components/features/home/HeroCarousel";
import StatsBar from "@/components/features/home/StatsBar";
import TimelineBanner from "@/components/features/home/TimelineBanner";
import NavCards from "@/components/features/home/NavCards";
import QuoteSection from "@/components/features/home/QuoteSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StatsBar />
      <TimelineBanner />
      <NavCards />
      <QuoteSection />
    </>
  );
}
