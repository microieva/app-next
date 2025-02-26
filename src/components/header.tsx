'use client'

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "./dialog";
import { LoginForm } from "./forms/login-form";
import { LoginOptions } from "./login-options";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const isDashboard = pathName === "/dashboard"; 
    
    return (
        <>
            <header className={session ? "header-auth" : "header-default"}>
                {!session ? 
                <>
                    <h1>Life Planner</h1>
                    <button onClick={() => setIsOpen(true)}>Log In</button>
                </> 
                :
                <>
                     <button onClick={() => router.push('dashboard')} className={isDashboard ? 'text-white':''}>Dashboard</button>
                     <button onClick={() => router.push('account')}>Account</button>
                     <button onClick={() => router.push('calendar')}>Calendar</button>
                     <button onClick={() => router.push('plans')}>Plans</button>
                     <button className="button-logout" onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Log Out</button>
                </>
                }
            </header>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <LoginOptions />
                <LoginForm handleClose={() => setIsOpen(false)} />
            </Dialog>
        </>
    )
}