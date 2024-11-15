"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Theme } from "@radix-ui/themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Theme className="h-screen">{children}</Theme>
    </ThemeProvider>
  );
};

export default Providers;
