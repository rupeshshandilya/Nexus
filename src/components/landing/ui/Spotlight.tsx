"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/libs/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string;
}

export function Spotlight({
  children,
  className,
  fill = "white",
  ...props
}: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    setOpacity(0.15);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden rounded-[inherit]", className)}
      {...props}
    >
      {children}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}20, transparent 40%)`,
        }}
      />
    </div>
  );
}
