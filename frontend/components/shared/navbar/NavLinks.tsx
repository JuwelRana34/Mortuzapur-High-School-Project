"use client";
import { Nav_Links } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8">
      {Nav_Links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground py-2 px-4 rounded  border-blue-600 "
                : "text-slate-700 hover:text-blue-600"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
