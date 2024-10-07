import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import {getCurrentUser} from "@/lib/session";
import {getMembershipsWithTeamInfoByUser} from "@/data-access/membership";

export default async function Layout({children}: {children: React.ReactNode}) {
  const user = await getCurrentUser();
  const memberships = await getMembershipsWithTeamInfoByUser(user.id);

  return (
    <AdminPanelLayout memberships={memberships}>{children}</AdminPanelLayout>
  );
}