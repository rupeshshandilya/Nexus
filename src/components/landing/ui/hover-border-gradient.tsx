"use client";

import React from "react";
import { cn } from "@/libs/utils";

type BaseProps = {
  containerClassName?: string;
  className?: string;
  borderClassName?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type DivProps = BaseProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as: "div";
    href?: string;
    target?: string;
    rel?: string;
  };

type HoverBorderGradientProps = ButtonProps | DivProps;

export const HoverBorderGradient = ({
  containerClassName,
  className,
  borderClassName,
  children,
  as = "button",
  ...props
}: HoverBorderGradientProps) => {
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
      {as === "button" ? (
        <button
          className={cn(
            "relative z-10 rounded-[inherit] px-6 py-2.5 transition duration-300",
            className
          )}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      ) : (
        <div
          className={cn(
            "relative z-10 rounded-[inherit] px-6 py-2.5 transition duration-300",
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
