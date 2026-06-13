import { importent_Links, SchoolName } from "@/lib/constants";
import {
    ChevronRight,

    GraduationCap,

    Mail,
    MapPin,
    Phone,
    PhoneMissed,
    User2,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
               {SchoolName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              আলোকিত মানুষ গড়ার প্রত্যয়ে আমরা অঙ্গীকারবদ্ধ। একটি আধুনিক,
              বিজ্ঞানমনস্ক ও সৃজনশীল শিক্ষাঙ্গন যেখানে প্রতিটি শিশুর সুপ্ত
              প্রতিভার বিকাশ ঘটে।
            </p>

            {/* social media icons */}

            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <User2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <PhoneMissed className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <User2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-red-500 hover:bg-slate-800 p-2 rounded-full transition-colors"
                aria-label="Youtube"
              >
                <User2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-3">
              {[
                "আমাদের সম্পর্কে",
                "ভর্তি তথ্য ২০২৩-২৪",
                "একাডেমিক সিলেবাস",
                "ফলাফল (রেজাল্ট)",
                "ফটোগ্যালারি",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-3">
              {importent_Links.map((item,index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              যোগাযোগের ঠিকানা
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  ১২৩, স্কুল রোড, ধানমন্ডি,
                  <br />
                  ঢাকা ১২০৫, বাংলাদেশ
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-white transition-colors"
                >
                  +৮৮০ ১২৩৪ ৫৬৭ ৮৯০
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <a
                  href="mailto:info@horizonacademy.edu.bd"
                  className="hover:text-white transition-colors"
                >
                  info@horizonacademy.edu.bd
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Copyright & Legal) */}
      <div className="border-t border-slate-800/60 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} হরাইজন একাডেমি। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              গোপনীয়তা নীতি
            </a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-white transition-colors">
              শর্তাবলী
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
