"use client";

import React from "react";
import { cn } from "@/libs/utils";

interface HoverBorderGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  className?: string;
  borderClassName?: string;
  as?: "button" | "div";
  href?: string;
  target?: string;
  rel?: string;
}

export const HoverBorderGradient = ({
  containerClassName,
  className,
  borderClassName,
  children,
  as = "button",
  ...props
}: HoverBorderGradientProps) => {
  const Container = as === "button" ? "button" : "div";

  return (
    <div
      className={cn(
        "relative p-[1px] overflow-hidden group",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 rounded-[inherit]",
          borderClassName || "bg-gradient-to-r from-purple-600 to-blue-500"
        )}
      />
      <Container
        className={cn(
          "relative z-10 rounded-[inherit] px-6 py-2.5 transition duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Container>
    </div>
  );
};
