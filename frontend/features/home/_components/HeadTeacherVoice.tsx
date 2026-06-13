import React from "react";
import { Quote, ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SchoolName, HeadmasterVoice } from "@/lib/constants";
import Link from "next/link";


export default function HeadmasterMessage() {
  return (
    <section className="w-full bg-white py-2  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:mx-0">
            {/* Decorative Background Shapes */}
            <div className="absolute -inset-4 bg-blue-50 border border-blue-100 rounded-2xl transform rotate-3 scale-105 transition-transform hover:rotate-6 duration-500 ease-in-out hidden sm:block"></div>
            <div className="absolute -inset-4 bg-gray-50 border border-gray-200 rounded-2xl transform -rotate-2 scale-105 hidden sm:block"></div>

            {/* Main Photo */}
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-4/5 sm:aspect-square lg:aspect-4/5 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                alt="প্রধান শিক্ষকের ছবি"
                className="object-cover w-full h-full object-top"
                width={500}
                height={625}
              />
              {/* Bottom Gradient overlay for naming if desired, currently left clean */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl"></div>
            </div>
          </div>

          {/* Text/Content Column */}
          <div className="flex flex-col justify-center">
            {/* Section Badge/Quote */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600">
                <Quote className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
                প্রধান শিক্ষকের বাণী
              </h2>
            </div>

            {/* Headline Highlight */}
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-6 leading-tight">
              {HeadmasterVoice.intro}
            </h3>

            {/* Message Body */}
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                সুপ্রিয় শিক্ষার্থী, অভিভাবক এবং শুভানুধ্যায়ী, আমাদের
                বিদ্যালয়ের ওয়েবসাইটে আপনাদের স্বাগত জানাই। আমাদের মূল লক্ষ্য
                হলো শিক্ষার্থীদের মধ্যে নৈতিকতা, শৃঙ্খলা এবং সৃজনশীলতার বিকাশ
                ঘটানো।
              </p>
              <p>{HeadmasterVoice.message}</p>
            </div>

            {/* Signature Area & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {HeadmasterVoice.name}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">
                  প্রধান শিক্ষক, {SchoolName}
                </p>
              </div>

              <a
                href={`tel:${HeadmasterVoice.contact}`}
                className="w-full sm:w-auto group flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-secondary-foreground bg-secondary/90 hover:bg-secondary transition-colors duration-300"
              >
                যোগাযোগ
                <PhoneCall className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
