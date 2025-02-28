"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loading } from "../loading";

interface LoginFormProps {
    handleClose: () => void;
}

export const LoginForm = ({ handleClose }: LoginFormProps)  => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true); 

        try {
          const res = await signIn("credentials", {
            email:"admin@email.com",
            password:"demo",
            redirect: false, 
            callbackUrl: "/dashboard",
          });
    
          if (res?.error) {
            console.error("Login failed:", res.error);
            setError("Invalid email or password."); // TO DO use error in UI
          } else {
            handleClose(); 
            router.push("/dashboard"); 
          }
        } catch (error) {
          console.error("An unexpected error occurred:", error);
        } finally {
          setIsLoading(false); 
        }
    };

    if (isLoading) {
      return (
        <Loading />
      )
    } else {
      return (
          <form className="space-y-4 w-2/3" onSubmit={handleSubmit} >
              <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  value=""
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
    
}