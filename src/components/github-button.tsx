import Link from "next/link";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";

export default function GitHubButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-8 h-8 bg-background"
      asChild
    >
      <Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]"/>
      </Link>
    </Button>
  )
}