import GradientText from "@/components/gradient-text";
import PricingList from "@/app/(onboarding)/_components/pricing/pricing-list";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Choose <GradientText>Your Plan</GradientText>
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nunc
        vitae elit.
      </span>
      <div className={'mb-10'}></div>
      <PricingList/>
    </section>
  )
}