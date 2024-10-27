import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import {getCurrentUser} from "@/lib/session";
import {getMembershipsWithTeamInfoFromUser} from "@/data-access/membership";

export default async function Layout({children}: {children: React.ReactNode}) {
  const user = await getCurrentUser();
  const memberships = await getMembershipsWithTeamInfoFromUser(user.id);

  return (
    <AdminPanelLayout memberships={memberships}>{children}</AdminPanelLayout>
  );
}