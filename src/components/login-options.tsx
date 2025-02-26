"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";


export const LoginOptions = () => {
  const router = useRouter();

  const handleLogin = async (provider:string) => {
    const result = await signIn(provider, { callbackUrl: "/dashboard" });

    if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-2/3 mr-12 pr-12 border-r border-gray-500">
      <button
      onClick={()=> handleLogin("google")}
      className="button-login-option"
    >
      <FaGoogle className="h-6 w-6 text-gray-500 hover:text-white " />
      <p>Log in with Google</p>
    </button>
    <button
        onClick={()=> handleLogin("github")}
      className="button-login-option"
    >
       <FaGithub className="h-6 w-6 text-gray-500 hover:text-white " />
       <p>Log in with GitHub</p>
    </button>
    <button
        onClick={()=> handleLogin("facebook")}
      className="button-login-option"
    >
      <FaFacebook className="h-6 w-6 text-gray-500 hover:text-white " />
      <p>Log in with Facebook</p>
    </button>
    </div>
  )
}