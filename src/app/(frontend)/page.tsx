import HeroCarousel from "@/components/features/home/HeroCarousel";
import ImageBannerCarousel from "@/components/features/home/ImageBannerCarousel";
import StatsBar from "@/components/features/home/StatsBar";
import TimelineBanner from "@/components/features/home/TimelineBanner";
import NavCards from "@/components/features/home/NavCards";
import QuoteSection from "@/components/features/home/QuoteSection";
import configPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  // @ts-ignore - Bypass until types are generated
  const homeData: any = await payload.findGlobal({
    slug: 'home-interface',
  } as any);

  return (
    <>
      <HeroCarousel />
      <ImageBannerCarousel banners={homeData?.heroBanners} />
      <StatsBar />
      <TimelineBanner />
      <NavCards />
      <QuoteSection />
    </>
  );
}
