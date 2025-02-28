"use client"

import { ThemeProvider } from "@/context/theme-context"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Providers = ({children}: Props)=> {
  return (
    <ThemeProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}