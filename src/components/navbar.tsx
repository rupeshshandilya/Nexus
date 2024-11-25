"use client";
import React, { useState } from "react";
import {
  Menu,
  MenuItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {/* For Login User */}
        <Link href='http://localhost:3000/login'>
        <MenuItem setActive={setActive} active={active} item="Login"></MenuItem>
        </Link>

        {/* For Github Repo */}
        <Link href="https://github.com/rupeshshandilya/Nexus">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Github"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
