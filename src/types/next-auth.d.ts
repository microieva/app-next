import { User as PrismaUser } from "@prisma/client"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  export interface User extends PrismaUser {}  // Extend the Prisma User model

  interface JWT {
    id: string;   // Ensure it matches the type in your JWT
    email: string;
  }
}

