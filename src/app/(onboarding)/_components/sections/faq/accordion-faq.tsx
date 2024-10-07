import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

type Question = {
  question: string;
  answer: string;
};

const questions: Question[] = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function AccordionFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {questions.map((faq, index) => (
        <AccordionItem key={index} value={index.toString()}>
          <AccordionTrigger className={'text-base'}>{faq.question}</AccordionTrigger>
          <AccordionContent className={'text-base text-muted-foreground'}>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}