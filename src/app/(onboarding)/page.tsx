import Image from "next/image";
import HomeSection from "@/app/(onboarding)/_components/sections/home-section";
import AboutSection from "@/app/(onboarding)/_components/sections/about-section";
import FeaturesSection from "@/app/(onboarding)/_components/sections/features-section";
import PricingSection from "@/app/(onboarding)/_components/sections/pricing-section";
import FAQSection from "@/app/(onboarding)/_components/sections/faq-section";

export default async function HomePage() {
  return (
    <main className="min-h-[calc(100vh-57px-97px)] flex-1">
      <div className="container relative pb-10">
        <HomeSection />
        <div className="w-full flex justify-center relative">
          <Image
            src="/demo-light-min.png"
            width={1080}
            height={608}
            alt="demo"
            priority
            className="border rounded-xl shadow-sm dark:hidden"
          />
          <Image
            src="/demo-dark-min.png"
            width={1080}
            height={608}
            alt="demo-dark"
            priority
            className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
          />
          <Image
            src="/demo-mobile-light-min.png"
            width={228}
            height={494}
            alt="demo-mobile"
            className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
          />
          <Image
            src="/demo-mobile-dark-min.png"
            width={228}
            height={494}
            alt="demo-mobile"
            className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
          />
        </div>
        <AboutSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </div>
    </main>
  );
}
