import { notices } from "@/app/Data/DemoData";
import NoticeBoardClientWrapper from "@/features/notice/_components/NoticeBoardClientWrapper";
import { FetchNoticesResponse } from "@/features/notice/schema/notice.schema";


async function fetchNotices(page: number): Promise<FetchNoticesResponse> {
  const limit = 10;
  // উদাহরণ: const res = await fetch(`https://api.example.com/notices?page=${page}&limit=${limit}`);
  // return res.json();

  return {
    notices: notices, // সার্ভার থেকে পাওয়া ১০টি নোটিশ
    totalPages: 5, // সার্ভার থেকে পাওয়া মোট পেজ সংখ্যা
  };
}

// লেটেস্ট Next.js অনুযায়ী searchParams একটি Promise
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AllNoticesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  // URL থেকে পেজ নাম্বার নেওয়া হচ্ছে, না থাকলে ডিফল্ট ১
  const currentPage = Number(resolvedParams.page) || 1;

  // সার্ভার থেকে নির্দিষ্ট পেজের ডেটা আনা হচ্ছে
  const { notices, totalPages } = await fetchNotices(currentPage);

  return (
    <main className="min-h-screen w-full bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          সকল নোটিশ
        </h1>
        <NoticeBoardClientWrapper
          notices={notices}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
