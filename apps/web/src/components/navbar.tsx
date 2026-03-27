"use client";
import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./themetoggle";
import { useRouter } from "next/navigation";
import { useAuthorize } from "@/hooks/useAuthorize";
import { User } from "lucide-react";

export const Navbar = () => {
  const isAuthorise = useAuthorize();
  const route = useRouter();
  const login = async () => {
    try {
    } catch (error) {}
  };
  return (
    <>
      <div className="h-16 w-full flex items-center justify-between px-8 py-16 bg-transparent ">
        <Link href={"/"}>
          <div className="dark:text-white text-black font-bold text-3xl">
            PayFlow
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <div>
            <ThemeToggle />
          </div>
          <div>
            {isAuthorise ? (
              <User />
            ) : (
              <Link
                href={"/signin"}
                children={<Button children="Signin" size="sm" />}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
