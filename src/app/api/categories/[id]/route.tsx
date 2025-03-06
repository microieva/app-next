import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    if (!categoryId) {
      return NextResponse.json({ error: "Invalid parameter categoryId" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;
    const body = await req.json(); 
    const input = body.input;

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: input,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
