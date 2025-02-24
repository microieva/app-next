"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
    handleClose: () => void;
}

export const LoginForm = ({ handleClose }: LoginFormProps)  => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
      
            if (res?.error) {
              setError("Invalid email or password.");
            } else {
              router.push("/"); 
              handleClose();   
            }
      
          } catch (error) {
            console.error("LOGIN ERROR: ", error);
          }
    };
    
    return (
        <form className="space-y-4" onSubmit={handleSubmit} >
            <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="form-button-submit"
            >
                Submit
            </button>
        </form>
    )
}