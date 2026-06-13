
import Link from "next/link";
import { Suspense } from "react";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { AppName } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white/10 backdrop-blur-md transition-colors shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand - Left */}
          <Link
            href="/"
            className="shrink-0 font-bold text-xl text-primary hover:text-blue-700 transition-colors"
          >
            {AppName}
          </Link>

          {/* Navigation Links - Center (desktop only) */}
          <NavLinks />

          {/* Right: Auth Buttons (desktop) + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse" />
              }
            >
              <AuthButtons />
              <MobileMenu />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
