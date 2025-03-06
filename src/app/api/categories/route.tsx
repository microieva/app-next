import { getCategories, getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerAuthSession();
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const categories = await getCategories();
    if (!categories) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }
    return NextResponse.json({ categories });

  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await req.json();
  const input = body.input;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { name: input.name },
    });

    if (existingCategory) {
      return NextResponse.json({ error: "Category name already exists" }, { status: 400 });
    }
    const newCategory = await prisma.category.create({
      data: input,
    });
    return NextResponse.json({ category: newCategory }, {status:200});
  } catch (error) {
    console.error("Error creating new category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}