"use client"

import { Dashboard } from "@/components/dashboard";
import { useSession } from "next-auth/react";

export const Main = () => {
  const { data: session } = useSession();
  
  return (
    <main className="row-span-1 flex-grow">
      {session ? (
        <Dashboard /> 
      ) : (
        <div>LANDING PAGE</div> 
      )}
    </main>
  );
};
