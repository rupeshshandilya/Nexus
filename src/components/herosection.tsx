import Link from "next/link";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const HeroSection = () => {
  return (
    <div className="h-auto md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-auto mx-auto py-10">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-8xl cursor-pointer font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Nexus
        </h1>
        <p className="mt-4 font-normal text-base md:text-2xl text-neutral-300 max-w-lg mx-auto cursor-pointer">
        Nexus is an open source collection of quality resources for developers, designers & backend nerds.
        </p>
        <div className="mt-10 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Link href={"/resources"}>Browse Libraries</Link>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
