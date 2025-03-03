import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";


export async function POST() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastLogout: new Date() },
    });

    return NextResponse.json({ message: "Logout timestamp updated" });
  } catch (error) {
    console.error("Error updating lastLogout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
