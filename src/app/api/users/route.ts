import {NextResponse} from "next/server";
import {getUsers} from "@/data-access/users";

export async function GET() {
    return NextResponse.json(await getUsers());
}