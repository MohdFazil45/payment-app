"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";
import { useAuthorize } from "@/hooks/useAuthorize";

export const Hero = () => {
  const route = useRouter();
  const isAuthorise = useAuthorize();

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-7xl dark:text-neutral-300 text-neutral-800 font-bold text-shadow-2xs/20">
          Fast, Secure & Easy Payments
        </h1>
        <h5 className="text-lg dark:font-light dark:text-neutral-400 text-neutral-600 font-medium mb-12">
          Send, receive and manage your money effortlessly with PayFlow. Built
          for speed, security, and simplicity.
        </h5>
      </div>
      <div>
        {isAuthorise ? (
          <Link
            href={"/dashboard"}
            children={<Button children="DashBoard" size="lg" />}
          />
        ) : (
          <Link
            href={"/signup"}
            children={<Button children="Get Started" size="lg" />}
          />
        )}
      </div>
    </div>
  );
};
