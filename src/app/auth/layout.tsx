import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/session";
import {getTeamsByUser} from "@/data-access/teams";

export default async function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  if (await auth()) {
    const user = await getCurrentUser();
    const teams = await getTeamsByUser(user.id);

    if (teams[0]) {
      redirect(`/teams/${teams[0].id}`);
    }

    redirect('/new-team');
  }

  return <>{children}</>
}
