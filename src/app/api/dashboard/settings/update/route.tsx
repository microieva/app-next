import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await req.json();
  const input = body.input;

  if (input.id) {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: body.input.id },
        data: body.input,
      });
      //revalidatePath('/dashboard/settings');
      return NextResponse.json({ category: updatedCategory });
    } catch (error) {
      console.error("Error updating category details:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  } else {
    try {
      const newCategory = await prisma.category.create({
        data: body.input,
      });
      return NextResponse.json({ category: newCategory }, {status:200});
    } catch (error) {
      console.error("Error creating new category:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}