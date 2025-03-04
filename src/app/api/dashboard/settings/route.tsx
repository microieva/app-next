import { getCategories, getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

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