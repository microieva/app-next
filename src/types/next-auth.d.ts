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

  export interface User extends PrismaUser {}  

  interface JWT {
    id: string;   
    email: string;
  }
}

