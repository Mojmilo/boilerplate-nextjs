import { Navbar } from "@/components/admin-panel/navbar";
import {getCurrentUser} from "@/lib/session";
import {getMembershipsWithTeamInfoByUser} from "@/data-access/membership";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  const user = await getCurrentUser();
  const memberships = await getMembershipsWithTeamInfoByUser(user.id);

  return (
    <div>
      <Navbar title={title} memberships={memberships} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
