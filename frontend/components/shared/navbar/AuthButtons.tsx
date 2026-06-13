"use client";

import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="hidden md:flex items-center gap-4">
      <Link
        href="/login"
        className="px-4 py-2 text font-medium  transition-colors hover:bg-primary/10 hover:text-primary rounded-md"
      >
        লগইন
      </Link>
      <Link
        href="/register"
        className="px-4 py-2  font-medium outline outline-primary text-primary hover:bg-primary/10 hover:text-primary rounded transition-colors"
      >
        রেজিস্ট্রেশন
      </Link>
    </div>
  );
}
