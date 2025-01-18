"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { isSignedIn } = useUser();

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
           <UserButton />
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
