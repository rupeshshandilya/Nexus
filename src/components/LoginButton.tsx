'use client'

import { account } from "@/appwrite/config"
import { Button } from "./ui/button"
import { Github } from 'lucide-react'
import { OAuthProvider } from "appwrite"

export default function LoginButton() {
  async function handleLogin() {
    await account.createOAuth2Session(
     OAuthProvider.Github,
        'http://localhost:3000',
        'http://localhost:3000'
    )
  }

  return (
    <Button onClick={handleLogin} className="w-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
      <Github className="mr-2 h-4 w-4" />
      Login with GitHub
    </Button>
  )
}
