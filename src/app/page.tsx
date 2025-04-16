import HeroSection from "@/components/landing/HeroSection";
// import HeroSection from '@/components/herosection'
import React from "react";
import { Navbar } from "@/components/navbar";

const Page = () => {
  return (
    <main className="min-h-screen w-full bg-black font-sans relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
    </main>
  );
};

export default Page;
