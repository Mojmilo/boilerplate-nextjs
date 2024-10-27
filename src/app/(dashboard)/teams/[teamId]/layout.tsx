import {getCurrentUser} from "@/lib/session";
import {notFound} from "next/navigation";
import {getMembershipsWithTeamInfoFromUser} from "@/data-access/membership";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import {hasMembershipUseCase} from "@/use-cases/membership";

export default async function Layout({children, params}: {children: React.ReactNode; params: {teamId: string}}) {
  const user = await getCurrentUser();
  await hasMembershipUseCase(user.id, params.teamId) || notFound();

  const memberships = await getMembershipsWithTeamInfoFromUser(user.id);

  return (
    <AdminPanelLayout memberships={memberships}>{children}</AdminPanelLayout>
  )
}