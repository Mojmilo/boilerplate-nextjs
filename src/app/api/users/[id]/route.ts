import {NextRequest, NextResponse} from "next/server";
import {getUserById} from "@/data-access/users";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return NextResponse.json(await getUserById(params.id));
}