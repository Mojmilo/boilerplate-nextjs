import {cn} from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({
  children,
  className
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-pink-500 to-purple-500 inline-block text-transparent bg-clip-text",
        className
      )}>
      {children}
    </span>
  )
}