import { User as PrismaUser } from "@prisma/client";
import "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    role: {
      name: string;
    };
  }

  export interface User extends PrismaUser {
    role: {
      name: string;
    };
  }  

  interface JWT {
    id: string;   
    email: string;
    role: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: {
      id: string;
      name: string;
    };
  }
}

