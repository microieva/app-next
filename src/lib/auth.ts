import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

