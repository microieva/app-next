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
export async function getPlans() {
  const session = await getServerAuthSession();
  
  if (!session?.user?.email) return null;

  const plans = await prisma.plan.findMany({
    where: {userId: session.user.id},
    select: {
      id: true,
      title: true,
      description: true,
      //image: true, // This should now work without errors
      createdAt: true,
      updatedAt: true,
      start: true,
      end: true,
      goals: true, 
      category: true, 
      tasks: true, 
    }});

    const formattedPlans = plans.map((plan) => ({
      ...plan,
      createdAt: formatWithTime(plan.createdAt),
      updatedAt: formatWithTime(plan.updatedAt),
    }));
    
    return formattedPlans;
}