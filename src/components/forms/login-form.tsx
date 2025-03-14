"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
    handleClose: () => void;
    onLoading: (bool:boolean)=> void;
}

export const LoginForm = ({ handleClose, onLoading }: LoginFormProps)  => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onLoading(true);
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
            onLoading(false);
          }

        } else {
          setError("Please fill in all fields");
          onLoading(false);
        }
    };

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