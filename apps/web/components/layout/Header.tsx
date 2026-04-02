"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/icon-lightmode.svg"
            alt={siteConfig.name}
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href={siteConfig.appUrl}
            className="text-sm font-ui font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href={siteConfig.appUrl}
            className="bg-[#1a1a1a] text-white px-5 py-2 rounded-full text-sm font-ui font-semibold hover:bg-black transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
