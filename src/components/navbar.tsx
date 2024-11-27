"use client";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserDetails } from "@/app/actions/getUserDetails";
import { account } from "@/appwrite/config";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await getUserDetails();
      if (userDetails) {
        setUser(userDetails.name);
      }
    };
    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      await account.deleteSession("current");
      setUser("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {/* For Login User */}
        <Link href={user ? "/" : "http://localhost:3000/login"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item={user ? user : "Login"}
          ></MenuItem>
        </Link>

        {/* For Github Repo */}
        <Link href="https://github.com/rupeshshandilya/Nexus">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Github"
          ></MenuItem>
        </Link>

        {user && (
          <MenuItem
          setActive={setActive}
          active={active}
          item="Logout"
          onClick={handleLogout}></MenuItem>
        )}
      </Menu>
    </div>
  );
}
