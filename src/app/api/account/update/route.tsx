import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await req.json();

  if (body) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: body.userInput,
      });
      revalidatePath('/account');
      return NextResponse.json({ user: updatedUser });
    } catch (error) {
      console.error("Error updating account details:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}