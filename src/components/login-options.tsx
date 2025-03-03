"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";


interface Props {
  handleClose: () => void;
}

export const LoginOptions = ({handleClose}:Props) => {
  const router = useRouter();

  const handleLogin = async (provider:string) => {
    const result = await signIn(provider, { callbackUrl: "/dashboard" });

    if (result?.ok) {
      router.push("/dashboard");
      handleClose();
    } else {
      console.error('Login error: ', result?.error)
    }
  };

  return (
    <div className="w-2/3 mr-12 pr-12 border-r border-gray-500">
        <button
        onClick={()=> handleLogin("google")}
        className="button-login-option group"
      >
        <FaGoogle className="h-6 w-6 text-gray-500 dark:group-hover:text-white" />
        <p>Log in with Google</p>
      </button>
      <button
          onClick={()=> handleLogin("github")}
        className="button-login-option group"
      >
        <FaGithub className="h-6 w-6 text-gray-500 dark:group-hover:text-white " />
        <p>Log in with GitHub</p>
      </button>
      <button
          onClick={()=> handleLogin("facebook")}
        className="button-login-option group"
      >
        <FaFacebook className="h-6 w-6 text-gray-500 dark:group-hover:text-white " />
        <p>Log in with Facebook</p>
      </button>
    </div>
  )
}