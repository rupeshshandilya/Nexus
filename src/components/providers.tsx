"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Theme className="h-screen">{children}</Theme>
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
