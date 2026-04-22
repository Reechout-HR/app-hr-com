import {
  HomeApplicationsSection,
  HomeCtaSection,
  HomeInActionSection,
  HomePricingSection,
  HomeTestimonialsSection,
  HomeWhyChooseSection,
} from "../components/home";
import { HeroSection } from "../components/hero-section";
import {
  HomePageMotionSection,
  HomePageNavMotion,
} from "../components/home-page-motion";
import { PageAmbientBackground } from "../components/page-ambient-background";
import { SiteNav } from "../components/site-nav";
import { SiteFooter } from "../components/site-footer";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-[var(--hero-bg-tint)] via-[var(--primary-lighter)] to-[var(--background-color)] dark:from-[#0a0612] dark:via-[#120a18] dark:to-[var(--background-color)]">
      <PageAmbientBackground />
      <div className="relative z-[1] flex min-h-screen flex-col text-[var(--text-primary)]">
        <HomePageNavMotion>
          <SiteNav mode="scroll" />
        </HomePageNavMotion>
        <main className="flex flex-1 flex-col">
          <HomePageMotionSection index={0}>
            <HeroSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={1}>
            <HomeWhyChooseSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={2}>
            <HomeInActionSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={3}>
            <HomeApplicationsSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={4}>
            <HomeTestimonialsSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={5}>
            <HomePricingSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={6}>
            <HomeCtaSection />
          </HomePageMotionSection>
        </main>
        <HomePageMotionSection index={7}>
          <SiteFooter />
        </HomePageMotionSection>
      </div>
    </div>
  );
}
