import GradientText from "@/components/gradient-text";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Discover Our <GradientText>Wholesome Features</GradientText>
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-muted-foreground">
        Our platform is packed with features that will help you build and scale your SaaS project.
        From authentication to billing, we&apos;ve got you covered.
      </span>
    </section>
  )
}