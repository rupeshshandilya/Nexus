"use client";
import React, { useState } from "react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  Code,
  Rocket,
  Menu as MenuIcon,
  X,
  Github,
  Sparkles,
} from "lucide-react";

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div
      className={cn("fixed top-6 inset-x-0 max-w-4xl mx-auto z-50", className)}
    >
      {/* Mobile menu toggle */}
      <div className="lg:hidden absolute -right-4 top-3 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-gray-700/30 shadow-lg hover:shadow-white/10 transition-all duration-300"
        >
          {mobileMenuOpen ? (
            <X size={22} className="text-gray-300" />
          ) : (
            <MenuIcon size={22} className="text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center space-y-8 py-8">
          <Link href="/" className="mb-6">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 text-3xl font-condensed tracking-wider">
              NEXUS
            </span>
          </Link>

          <Link href="/resources" className="group">
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-6 py-3 relative">
              <div className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
              </div>
              <Code
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
              <span className="text-lg">Explore</span>
            </div>
          </Link>

          <Link href="/docs" className="group">
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-6 py-3 relative">
              <div className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
              </div>
              <BookOpen
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
              <span className="text-lg">Docs</span>
            </div>
          </Link>

          <Link href="/about" className="group">
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-6 py-3 relative">
              <div className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
              </div>
              <Rocket
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
              <span className="text-lg">About</span>
            </div>
          </Link>

          <Link
            href="https://github.com/rupeshshandilya/Nexus"
            className="group"
          >
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-6 py-3 relative">
              <div className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
              </div>
              <Github
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
              <span className="text-lg">Github</span>
            </div>
          </Link>

          {!isSignedIn ? (
            <Link href="/sign-in" className="mt-6">
              <button className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full px-8 py-2.5 font-medium hover:from-gray-800 hover:to-black transition-all duration-300 overflow-hidden group">
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute -inset-x-20 h-40 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                </div>
              </button>
            </Link>
          ) : (
            <div className="mt-6">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden lg:block glass-dark relative overflow-hidden rounded-full border border-gray-700/50 shadow-lg backdrop-blur-xl">
        {/* Shine effect */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute -inset-x-40 h-40 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 hover:translate-x-[400%] transition-transform duration-2000 ease-in-out"></div>
        </div>

        <div className="flex items-center justify-between px-8 py-3 relative z-10">
          <div className="flex items-center space-x-1">
            <Link href="/" className="flex items-center group">
              <Sparkles
                size={24}
                className="text-gray-400 mr-2 group-hover:text-white transition-colors duration-300"
              />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 text-xl font-condensed tracking-wider">
                NEXUS
              </span>
            </Link>

            <div className="flex ml-12 space-x-1">
              <Link href="/resources">
                <div className="relative overflow-hidden px-4 py-2 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-white/5 group">
                  <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  </div>
                  <span className="relative z-10">Explore</span>
                </div>
              </Link>

              <Link href="/docs">
                <div className="relative overflow-hidden px-4 py-2 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-white/5 group">
                  <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  </div>
                  <span className="relative z-10">Docs</span>
                </div>
              </Link>

              <Link href="/about">
                <div className="relative overflow-hidden px-4 py-2 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-white/5 group">
                  <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  </div>
                  <span className="relative z-10">About</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/rupeshshandilya/Nexus"
              className="text-gray-400 hover:text-white transition-colors group"
            >
              <div className="relative overflow-hidden rounded-full">
                <Github size={22} className="relative z-10" />
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </Link>

            {!isSignedIn ? (
              <Link href="/sign-in">
                <button className="relative bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-300 overflow-hidden group">
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute -inset-x-20 h-20 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </button>
              </Link>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/5 scale-125 opacity-0 hover:opacity-100 transition-opacity"></div>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
