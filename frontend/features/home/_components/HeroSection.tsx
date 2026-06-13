import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GraduationCap, Phone, UserCircle } from "lucide-react";
import HeroSectionCountCard from "./heroSectionCountCard";

const stats = [
  {
    title: "পাসের হার",
    value: "১০০%",
    icon: <GraduationCap className="w-6 h-6 text-blue-300" />,
  },
  {
    title: "অভিজ্ঞ শিক্ষক",
    value: "৫০+",
    icon: <BookOpen className="w-6 h-6 text-blue-300" />,
  },
  {
    title: "Students",
    value: "400+",
    icon: <UserCircle className="w-6 h-6 text-blue-300" />,
  },
  {
    title: "সহশিক্ষামূলক কার্যক্রম",
    value: "২০+",
    icon: (
      <svg
        className="w-6 h-6 text-blue-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop')",
        }}
      >
        {/* Gray Overlay - Darker at the top and bottom, slightly lighter in the middle */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-700/60 to-gray-800/95" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8  py-[68px] md:py-24 flex flex-col items-center text-center ">
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-5 text-white animate-pulse-slow">
          <BookOpen className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-medium tracking-wide">
            ২০২৬ শিক্ষাবর্ষে ভর্তি চলছে
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          আদর্শ মানুষ গড়ার এক <br className="hidden sm:block" />
          <span className="text-blue-400">নির্ভরযোগ্য</span> প্রতিষ্ঠান
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl leading-relaxed font-light drop-shadow">
          আমরা শুধু পুঁথিগত শিক্ষাই দিই না, বরং শিক্ষার্থীদের নৈতিক মূল্যবোধ,
          সৃজনশীলতা এবং নেতৃত্বের গুণাবলী বিকাশে সাহায্য করি। আপনার সন্তানের
          উজ্জ্বল ভবিষ্যৎ নিশ্চিতে আমরা প্রতিশ্রুতিবদ্ধ।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full rounded sm:w-auto  hover:cursor-pointer group"
          >
            অনলাইনে আবেদন করুন
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <button
            // size="lg"
            className="w-full sm:w-auto text-white bg-linear-to-br from-secondary to-secondary/80 backdrop-blur-md rounded group outline-2 outline-offset-3 outline-secondary/50 flex items-center justify-center px-4 py-2 hover:cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30  focus-visible:outline-offset-2 focus-visible:outline-secondary/50 "
          >
            <Phone className="mr-2 w-5 h-5" />
            যোগাযোগ করুন
          </button>
        </div>

    <div className="w-full bg-linear-to-r from-transparent via-slate-300 to-transparent my-10 h-px" />
        {/* Key Statistics / Highlights */}
        <div className="mt-2 sm:mt-10  grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
          {stats.map((stat, index) => (
            <HeroSectionCountCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
