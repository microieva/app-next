'use client'

import { Avatar, Dropdown } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "./dialog";
import { LoginForm } from "./forms/login-form";
import { Loading } from "./loading";
import { LoginOptions } from "./login-options";
import ThemeToggle from "./theme-toggle";

export const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const pathName = usePathname();
    let initials:string = "";

    if (session && session.user.name) {
        initials = session.user.name
            .split(" ")  
            .map((word: string) => word.charAt(0).toUpperCase()) 
            .join("");  
    }
    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/calendar", label: "Calendar" },
        { href: "/plans", label: "Plans" },
      ];

    const logOut = async() => {
        setIsLoading(true);

        try {
            await fetch("/api/auth/logout", { method: "POST" });
            await signOut({ callbackUrl: "/" });
        } catch (error: any) {
            setError(error.message);
        }
    }
    
    return (
        <>
            <header >
                {!session ? 
                <div className="header-default">
                    <h1>Life Planner</h1>
                    <button onClick={() => setIsOpen(true)}>Log In</button>
                </div> 
                :
                <div className="header-auth">
                    <div 
                        style={{visibility: session?.user.role === "admin" ? "hidden" : "visible"}} 
                        className="header-navbar"
                    >
                     {navItems.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-4 py-3 transition-colors ${
                                pathName === href ? "header-nav-button" : "text-gray-500 hover:text-white"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    </div>

                    <div className="button-logout">
                        <Dropdown
                            label={<Avatar alt="User settings" placeholderInitials={initials as string}  rounded />}
                            arrowIcon={false}
                            inline
                            >
                            <Dropdown.Header>
                                <span className="block text-sm">{session.user.name}</span>
                                <span className="block truncate text-sm font-medium">{session.user.email}</span>
                            </Dropdown.Header>
                            <div className="py-4 flex justify-center">
                                <ThemeToggle></ThemeToggle>
                            </div>
                            <Dropdown.Divider/>
                            {session.user.role === 'admin' && <Dropdown.Item><Link href="/dashboard">Dashboard</Link></Dropdown.Item>}
                            <Dropdown.Item><Link href="/account">Account</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={() => logOut()}>Sign out</Dropdown.Item>
                        </Dropdown>

                    </div>
                </div>
                }
            </header>

            <Dialog isOpen={isOpen && !isLoading} onClose={() => setIsOpen(false)}>
                <LoginOptions handleClose={() => setIsOpen(false)}/>
                <LoginForm handleClose={() => setIsOpen(false)} onLoading={(bool) => setIsLoading(bool)}/>
            </Dialog>
            {isLoading && <Loading /> }
            <Dialog isOpen={Boolean(error)} onClose={()=>{setError(null)}}><p>{error}</p></Dialog>
        </>
    )
}