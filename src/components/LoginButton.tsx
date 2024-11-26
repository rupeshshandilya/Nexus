"use client";

import { account } from "@/appwrite/config";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { OAuthProvider } from "appwrite";
import { useState } from "react";

export default function LoginButton() {
  const [isloading, setIsLoading] = useState(true);

  async function handleLogin() {
    try {
      setIsLoading(true);
      const data = await account.createOAuth2Session(
        OAuthProvider.Github,
        "http://localhost:3000",
        "http://localhost:3000"
      );
      console.log(`data ${data}`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleLogin}
      className="w-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
    >
      {!isloading ? (
        "Logging in..."
      ) : (
        <>
          <Github className="mr-2 h-4 w-4" />
          Login with GitHub
        </>
      )}
    </Button>
  );
}
