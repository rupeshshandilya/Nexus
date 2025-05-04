"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Spotlight } from "./ui/Spotlight";
import {
  Search,
  Code,
  Package,
  Star,
  Compass,
  Lightbulb,
} from "lucide-react";

const HeroSection = () => {
  // Rotating phrases for the tagline
  const phrases = [
    "Elevate your projects with premium dev tools",
    "Curated resources for the modern developer",
    "Build better, faster, with trusted libraries",
    "Your gateway to exceptional development resources",
    "Where innovation meets implementation",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Rotate through phrases every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-auto md:min-h-[95vh] w-full flex flex-col items-center justify-center relative overflow-hidden mx-auto py-24 bg-black">
      {/* Animated background grid with subtle pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-90"></div>

      {/* Dynamic spotlight effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-40 right-0 md:right-60 md:top-20" fill="gray" />
      <Spotlight
        className="bottom-40 left-1/2 md:bottom-20 opacity-70"
        fill="silver"
      />

      {/* Floating elements with enhanced styling */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-white/5 to-gray-500/5"
            style={{
              width: `${Math.random() * 120 + 50}px`,
              height: `${Math.random() * 120 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.25 + 0.05,
            }}
          />
        ))}
      </div>

      <div className="p-4 relative z-10 w-full text-center max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-center">
          <span className="inline-flex items-center rounded-full border border-gray-400/30 bg-gray-500/10 px-4 py-1.5 text-sm font-medium text-gray-200 backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white"></span>
            Open Source Project
          </span>
        </div>

        <div className="relative overflow-hidden">
          <h1 className="mt-8 md:mt-2 text-6xl md:text-[10rem] font-extrabold tracking-super-wide leading-none font-condensed bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 animate-glitch animate-reveal">
            NEXUS
          </h1>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none"></div>
        </div>

        <p className="mt-8 font-light text-xl md:text-2xl text-neutral-200 max-w-2xl mx-auto transition-all duration-300 ease-in-out leading-relaxed">
          {phrases[currentPhraseIndex]}
        </p>

        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Your one-stop destination for discovering high-quality libraries,
          packages, and resources to supercharge your development workflow.
        </p>

        {/* Enhanced glass buttons with shine effects */}
        <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Discover Resources Button */}
          <Link href="/resources" className="group w-64">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-700/80 to-gray-900/80 rounded-xl shadow-lg backdrop-blur-md border border-white/5 transition-all duration-300 group-hover:shadow-white/20 group-hover:shadow-lg">
              {/* Shine effect overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl z-0">
                <div className="absolute -inset-x-40 h-48 -top-24 transform-gpu bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out"></div>
              </div>

              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
              <div className="relative z-10 px-8 py-4 flex items-center justify-between">
                <div className="text-left">
                  <span className="font-medium text-white">
                    Discover Resources
                  </span>
                  <p className="text-gray-300/80 text-xs mt-1">
                    Find your perfect tools
                  </p>
                </div>
                <div className="bg-white/10 p-2 rounded-full transform transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 backdrop-blur-md border border-white/10">
                  <Compass size={20} className="text-white" />
                </div>
              </div>
              <div className="h-1 w-0 bg-gradient-to-r from-white/70 via-white to-white/70 group-hover:w-full transition-all duration-700"></div>
            </div>
          </Link>

          {/* Contribute Button */}
          <Link href="/about" className="group w-64">
            <div className="relative overflow-hidden bg-black/30 backdrop-blur-xl border border-gray-700/40 rounded-xl shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-white/10 group-hover:shadow-lg">
              {/* Shine effect overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl z-0">
                <div className="absolute -inset-x-40 h-48 -top-24 transform-gpu bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out"></div>
              </div>

              <div className="relative z-10 px-8 py-4 flex items-center justify-between">
                <div className="text-left">
                  <span className="font-medium text-white">Contribute</span>
                  <p className="text-gray-400 text-xs mt-1">
                    Bright ideas await
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-400/90 to-gray-600/90 shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/10">
                  <Lightbulb size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-gray-300/10 via-white/10 to-gray-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>
        </div>

        {/* Enhanced search bar with subtle glass effect and shine */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="relative overflow-hidden flex items-center bg-gray-950/40 border border-gray-800/60 rounded-full p-1.5 pl-5 backdrop-blur-xl shadow-md">
            {/* Shine effect overlay */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
              <div className="absolute -inset-x-40 h-48 -top-24 transform-gpu bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 hover:translate-x-[400%] transition-transform duration-2000 ease-in-out"></div>
            </div>

            <Search size={18} className="text-gray-400 mr-3 relative z-10" />
            <input
              type="text"
              placeholder="Search for libraries, packages, or tools..."
              className="flex-1 bg-transparent border-none outline-none text-white py-3 px-1 font-light placeholder:text-gray-500 relative z-10"
            />
            <button className="relative z-10 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white rounded-full px-6 py-3 font-medium transition-all duration-300 focus:ring-2 focus:ring-white/20 overflow-hidden group">
              <span className="relative z-10">Search</span>
              <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 transform -skew-x-12"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced stat cards with glass morphism and shine effects */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="relative overflow-hidden flex flex-col items-center bg-gray-900/20 backdrop-blur-xl border border-gray-800/40 rounded-xl p-7 w-[200px] transition-all duration-300 hover:border-white/30 hover:bg-gray-900/30 hover:scale-105 group">
            {/* Shine effect overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
              <div className="absolute -inset-x-40 h-40 top-0 transform-gpu bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out"></div>
            </div>

            <div className="relative z-10 p-3 rounded-full bg-gray-500/10 mb-4 border border-gray-400/20 backdrop-blur-md">
              <Package size={24} className="text-gray-300" />
            </div>
            <span className="relative z-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              500+
            </span>
            <span className="relative z-10 text-sm text-neutral-400 mt-2 font-light">
              Libraries & Tools
            </span>

            {/* Bottom glow effect on hover */}
            <div className="absolute -bottom-2 left-0 w-full h-1/3 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="relative overflow-hidden flex flex-col items-center bg-gray-900/20 backdrop-blur-xl border border-gray-800/40 rounded-xl p-7 w-[200px] transition-all duration-300 hover:border-white/30 hover:bg-gray-900/30 hover:scale-105 group">
            {/* Shine effect overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
              <div className="absolute -inset-x-40 h-40 top-0 transform-gpu bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out"></div>
            </div>

            <div className="relative z-10 p-3 rounded-full bg-gray-500/10 mb-4 border border-gray-400/20 backdrop-blur-md">
              <Code size={24} className="text-gray-300" />
            </div>
            <span className="relative z-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              10k+
            </span>
            <span className="relative z-10 text-sm text-neutral-400 mt-2 font-light">
              Developers
            </span>

            {/* Bottom glow effect on hover */}
            <div className="absolute -bottom-2 left-0 w-full h-1/3 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="relative overflow-hidden flex flex-col items-center bg-gray-900/20 backdrop-blur-xl border border-gray-800/40 rounded-xl p-7 w-[200px] transition-all duration-300 hover:border-white/30 hover:bg-gray-900/30 hover:scale-105 group">
            {/* Shine effect overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
              <div className="absolute -inset-x-40 h-40 top-0 transform-gpu bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[400%] transition-transform duration-1500 ease-in-out"></div>
            </div>

            <div className="relative z-10 p-3 rounded-full bg-gray-500/10 mb-4 border border-gray-400/20 backdrop-blur-md">
              <Star size={24} className="text-gray-300" />
            </div>
            <span className="relative z-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              99%
            </span>
            <span className="relative z-10 text-sm text-neutral-400 mt-2 font-light">
              Satisfaction
            </span>

            {/* Bottom glow effect on hover */}
            <div className="absolute -bottom-2 left-0 w-full h-1/3 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

/* 
Add to your global CSS for the text shimmer animation:

@keyframes text-shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

.animate-text-shimmer {
  animation: text-shimmer 3s infinite linear;
  background-size: 500px 100%;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px) rotate(10deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0);
  }
}
*/
