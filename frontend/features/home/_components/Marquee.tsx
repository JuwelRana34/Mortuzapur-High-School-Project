
export default function Marquee() {
  return (
    <section className="relative w-full min-h-fit py-8 flex items-center justify-center overflow-hidden font-sans mb-5">
        
      {/* Marquee Notice Ticker */}
      <div className="absolute top-0 left-0 w-full z-10 bg-red-400 backdrop-blur-md border-b border-white/10 text-black flex items-stretch h-12 shadow-lg">
        {/* Fixed Title Box */}
        <div className="flex items-center justify-center px-4 sm:px-6 bg-red-500 font-bold text-xs sm:text-sm whitespace-nowrap z-10 relative shadow-[4px_0_15px_rgba(0,0,0,0.3)]">
          <span className="animate-pulse">জরুরী বিজ্ঞপ্তি:</span>
          {/* CSS Triangle Pointer */}
          <div className="absolute top-0 -right-3 w-0 h-0 border-t-20 sm:border-t-24 border-t-transparent border-l-12 border-l-red-500 border-b-20 sm:border-b-24 border-b-transparent"></div>
        </div>

        {/* Scrolling Content Area */}
        <div className="flex-1 overflow-hidden flex items-center relative pl-6 sm:pl-8">
          <div className="animate-marquee whitespace-nowrap text-md font-light tracking-wide cursor-pointer drop-shadow-md">
            <span className="mx-4 text-red-300">◆</span>
            ২০২৬ শিক্ষাবর্ষে প্লে থেকে নবম শ্রেণি পর্যন্ত ভর্তি চলছে। আসন সংখ্যা
            সীমিত, আজই যোগাযোগ করুন।
            <span className="mx-4 text-red-300">◆</span>
            আগামী ২০শে জুন থেকে গ্রীষ্মকালীন ছুটি শুরু হবে। বিস্তারিত জানতে
            নোটিশ বোর্ড দেখুন।
            <span className="mx-4 text-red-300">◆</span>
            ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য সকাল ৯টা থেকে বিকেল ৪টা পর্যন্ত
            অফিসে যোগাযোগ করার অনুরোধ করা হলো।
          </div>
        </div>
      </div>

     
    </section>
  );
}
