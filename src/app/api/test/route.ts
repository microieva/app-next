import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log('USERS FROM DB: ', users)
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
