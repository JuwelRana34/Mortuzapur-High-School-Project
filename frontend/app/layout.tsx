import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Serif_Bengali, Playfair_Display } from "next/font/google";

import { AppDescription, AppTitle } from "@/lib/constants";
import "./globals.css";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

// FIXED: Changed subset from "latin" to "bengali"
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-serif-bengali",
});

export const metadata: Metadata = {
  title: AppTitle,
  description: AppDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        notoSerifBengali.variable,
        playfairDisplayHeading.variable,
      )}
    >
      {/* Default font class added (e.g., font-bengali) */}
      <body className="min-h-full flex flex-col bg-slate-100 font-bengali">
        <div>{children}</div>
      </body>
    </html>
  );
}
