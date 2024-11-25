import LoginButton from '@/components/LoginButton'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-[url('/nebula-bg.jpg')] bg-cover bg-center">
    <div className="max-w-md w-full space-y-8 p-8 bg-accent/20 backdrop-blur-sm shadow-lg rounded-lg text-foreground border border-accent/50">
      <div className="text-center">
        <Image src="/placeholder.svg?height=100&width=100" alt="Nexus Logo" width={100} height={100} className="mx-auto rounded-full bg-primary/20 p-2" />
        <h2 className="mt-6 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Welcome to Nexus
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The cosmic hub for developer resources
        </p>
      </div>
      <LoginButton />
    </div>
  </div>
  )
}

export default Login


