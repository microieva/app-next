import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
  const body = await req.json(); 
  const { ids } = body; 

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await prisma.category.deleteMany({
      where: { id: { in: ids } }, 
    });

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Bulk delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}