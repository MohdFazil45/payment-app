"use client";
import { Card } from "@/components/card";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { useAuthorize } from "@/hooks/useAuthorize";
export default function Home() {
  const cardDetails = [
    { title: "Instant Transfers", desc: "Send money instantly anywhere." },
    { title: "Secure Payments", desc: "Top-level encryption security." },
    { title: "Easy Tracking", desc: "Track all your transactions easily." },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500">
      <main className="flex w-full  flex-col items-center justify-between">
        <div className="w-full top-0 fixed">
          <Navbar />
        </div>
        <div className="mx-auto mb-10">
          <Hero />
        </div>
        <div className="flex items-center justify-center gap-4">
          {cardDetails.map((items, index) => (
            <Card key={index} title={items.title} about={items.desc} />
          ))}
        </div>
        <footer className="flex items-center justify-between w-full p-8 bottom-0 fixed ">
          <div className="text-2xl dark:text-neutral-300 cursor-pointer text-neutral-700">PayFlow</div>
          <div className="flex items-center justify-around w-1/3 text-sm dark:text-neutral-300 text-neutral-700">
            <div className="cursor-pointer">Terms and Condition</div>
            <div className="cursor-pointer">Privacy</div>
            <div className="cursor-pointer">Contact</div>
          </div>
          <div className="text-2xl dark:text-neutral-300 cursor-pointer text-neutral-700"> 2026</div>
        </footer>
      </main>
    </div>
  );
}

