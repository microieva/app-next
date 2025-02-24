'use client'

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "./dialog";
import { LoginForm } from "./forms/login-form";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    
    return (
        <>
            <header className="w-1/2 mx-auto rounded-full border border-white/50 text-white bg-transparent m-6 p-4 flex justify-between">
                {!session ? 
                <>
                    <h1>Life Planner</h1>
                    <button onClick={() => setIsOpen(true)}>Log In</button>
                </> :
                <>
                     <button onClick={() => router.push('dashboard')}>Dashboard</button>
                     <button onClick={() => router.push('account')}>Account</button>
                     <button onClick={() => router.push('account')}>Calendar</button>
                     <button onClick={() => router.push('account')}>Plans</button>
                     <button onClick={() => signOut()}>Log Out</button>
                </>
                }
            </header>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <LoginForm handleClose={() => setIsOpen(false)} />
            </Dialog>
        </>
    )
}