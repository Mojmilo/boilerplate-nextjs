import GradientText from "@/components/gradient-text";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Why <GradientText>Should You Care?</GradientText>
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-muted-foreground">
        QuickSaaSBoilerplate is a modern, efficient, and scalable boilerplate for building SaaS applications.
        It provides a solid foundation with the best practices and tools to help you succeed.
      </span>
    </section>
  )
}