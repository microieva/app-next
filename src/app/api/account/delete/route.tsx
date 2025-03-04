import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await req.json();

  if (body) {
    try {
      await prisma.user.delete({
        where: { id: session.user.id },
      });

      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error("Error deleting account details:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}