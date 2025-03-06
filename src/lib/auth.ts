import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { formatWithTime } from "./utils/date";

export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

export async function getAccountRouteUser() {
  const session = await getServerAuthSession();
  
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      lastLogout: true,
      role: true
    },
  });

  return user;
}
export async function getDashboardRouteUser() {
  const session = await getServerAuthSession();
  
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      plans: true,
      role: true
    }
  });

  return user;
}
export async function getCategories() {
  const session = await getServerAuthSession();
  
  if (!session?.user?.email) return null;

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      createdAt: true,
      updatedAt: true 
    }});

    const formattedCategories = categories.map((category) => ({
      ...category,
      createdAt: formatWithTime(category.createdAt),
      updatedAt: formatWithTime(category.updatedAt),
    }));
    
    return formattedCategories;
}
