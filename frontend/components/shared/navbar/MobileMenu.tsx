"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppName, Nav_Links } from "@/lib/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        }
      ></SheetTrigger>

      <SheetContent side="right" showCloseButton>
        <h2 className="text-lg text-primary font-semibold mb-4 mt-5 px-4">
          {AppName}
        </h2>
        <nav className="flex flex-col gap-4 mt-2">
          {Nav_Links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors text-center ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-blue-700 hover:bg-blue-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
