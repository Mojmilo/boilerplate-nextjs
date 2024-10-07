import GradientText from "@/components/gradient-text";
import AccordionFAQ from "@/app/(onboarding)/_components/sections/faq/accordion-faq";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Frequently Asked <GradientText>Questions</GradientText>
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-muted-foreground">
        Here are some of the most common questions that we get asked.
        If you have any other questions, feel free to reach
      </span>
      <AccordionFAQ />
    </section>
  )
}