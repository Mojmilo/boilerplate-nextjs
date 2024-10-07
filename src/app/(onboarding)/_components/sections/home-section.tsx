import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRightIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import GradientText from "@/components/gradient-text";

export default function HomeSection() {
  return (
    <section
      className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Kickstart Your SaaS Project with <GradientText>QuickSaaSBoilerplate</GradientText>
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-muted-foreground">
        Your all-in-one solution for building scalable and efficient SaaS applications.
        Get started quickly with a solid foundation tailored for success.
      </span>
      <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
        <Button variant="default" asChild rightIcon={<ArrowRightIcon />}>
          <Link href="/auth/login">
            Get started
          </Link>
        </Button>
        <Button variant="outline" asChild leftIcon={<GitHubLogoIcon />}>
          <Link
            href="https://github.com/Mojmilo"
            target="_blank"
            rel="noopener noreferrer"
          >
            See on GitHub
          </Link>
        </Button>
      </div>
    </section>
  )
}