import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";

export default async function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  !await auth() && redirect('/auth/login');

  return (
    <>{children}</>
  )
}
