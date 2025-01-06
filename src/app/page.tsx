"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import isHotkey from "is-hotkey";
import { useDeviceType } from "@/hooks/device-type";
import Message from "@/components/ui/message";
import HeroSection from "@/components/herosection";

export default function Home() {
  const { isDesktop, width } = useDeviceType();
  const { setTheme } = useTheme();

  const handlekeyDown = useCallback((event: KeyboardEvent) => {
    if (isHotkey("mod+k", event)) {
      event.preventDefault();
      setTheme("light");
    }
    if (isHotkey("mod+m", event)) {
      event.preventDefault();
      setTheme("dark");
    }
    if (isHotkey("mod+s", event)) {
      event.preventDefault();
      setTheme("system");
    }
  },[]);

  useEffect(() => {
    document.addEventListener("keydown", handlekeyDown);

    // unmount component
    return () => document.removeEventListener("keydown", handlekeyDown);
  }, [handlekeyDown]);

  return isDesktop && width! > 1039 ? (
    <>
      <HeroSection />
    </>
  ) : (
    <Message
      message="Hey 👋🏻 there! Nexus is only Optimized for desktop. Support for Mobile is comming soon!"
      className="h-screen"
    />
  );
}
