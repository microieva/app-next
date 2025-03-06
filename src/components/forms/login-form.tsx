"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loading } from "../loading";

interface LoginFormProps {
    handleClose: () => void;
}

export const LoginForm = ({ handleClose }: LoginFormProps)  => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 

        if (password && email) {
          try {
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false, 
              callbackUrl: "/dashboard",
            });
      
            if (res?.error) {
              setError("Invalid email or password"); 
            } else {
              handleClose(); 
              router.push("/dashboard"); 
            }
          } catch (error) {
            console.error("An unexpected error occurred:", error);
          } finally {
            setIsLoading(false); 
          }

        } else {
          setError("Please fill in all fields");
          setIsLoading(false);
        }
    };

    if (isLoading) {
      return (
        <Loading />
      )
    }
      return (
          <form className="space-y-4 w-2/3" onSubmit={handleSubmit} >
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
              {error && <p className="text-red-500">{error}</p>}
              <button
                  type="submit"
                  className="form-button-submit"
              >
                  Submit
              </button>
          </form>
      )
    
}