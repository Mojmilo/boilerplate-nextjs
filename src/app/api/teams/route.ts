import {NextRequest, NextResponse} from "next/server";
import {getTeamsByUser} from "@/data-access/teams";
import {getCurrentUser} from "@/lib/session";

export async function GET(req: NextRequest) {
  return getCurrentUser().then(async (user) => {
    try {
      const user = await getCurrentUser();
      const teams = await getTeamsByUser(user.id);

      return NextResponse.json(teams);
    } catch (e: any) {
      return NextResponse.json({ message: e.message }, { status: 404 });
    }
  }).catch(e => {
    return NextResponse.json({ message: e.message }, { status: 401 });
  });
}