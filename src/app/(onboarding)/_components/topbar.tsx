import {ChevronRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";

interface TopbarProps {
  title: string;
  href: string;
}

export default function Topbar({
  title,
  href
}: TopbarProps) {
  return (
    <Link href={href}>
      <div className="flex flex-wrap justify-center items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 opacity-50">
          <span
            className={'text-sm text-white font-semibold text-center'}>{title}</span>
        <ChevronRightIcon className={'text-white'}/>
      </div>
    </Link>
  )
}