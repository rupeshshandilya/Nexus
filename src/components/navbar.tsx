"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { user,isSignedIn } = useUser();

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {/* For Login User */}
        {!isSignedIn ? (
          <Link href="/sign-in">
            <MenuItem
              setActive={setActive}
              active={active}
              item={"Login"}
            ></MenuItem>
          </Link>
        ) : (
          <>
            <MenuItem
              setActive={setActive}
              active={active}
              item={user?.username || ""}
            ></MenuItem>
          </>
        )}

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
