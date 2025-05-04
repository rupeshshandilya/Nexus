"use client";

import React from "react";
import { cn } from "@/libs/utils";

interface HoverBorderGradientProps {
  containerClassName?: string;
  className?: string;
  borderClassName?: string;
  as?: "button" | "div";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  [key: string]: any; // For additional props
}

export const HoverBorderGradient = ({
  containerClassName,
  className,
  borderClassName,
  children,
  as = "button",
  ...props
}: HoverBorderGradientProps) => {
  // Render the component based on the 'as' prop
  const renderContent = () => {
    const commonClassNames = cn(
      "relative z-10 rounded-[inherit] px-6 py-2.5 transition duration-300",
      className
    );

    if (as === "button") {
      return (
        <button className={commonClassNames} {...props}>
          {children}
        </button>
      );
    } else {
      return (
        <div className={commonClassNames} {...props}>
          {children}
        </div>
      );
    }
  };

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
      {renderContent()}
    </div>
  );
};