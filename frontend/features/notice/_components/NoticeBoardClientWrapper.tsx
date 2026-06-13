"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/DateFormater";
import { useRouter, useSearchParams } from "next/navigation";
import useNoticeList from "../hooks/useNoticeList";
import { noticeSchema } from "../schema/notice.schema";

interface NoticeBoardClientWrapperProps {
  notices: noticeSchema[];
  currentPage: number;
  totalPages: number;
}

export default function NoticeBoardClientWrapper({
  notices,
  currentPage,
  totalPages,
}: NoticeBoardClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const displayNotices = useNoticeList({ notices });
  // URL-এ পেজ নাম্বার আপডেট করার ফাংশন
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* নোটিশ তালিকা */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {displayNotices?.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {displayNotices.map((notice) => (
              <li
                key={notice.id}
                className={`p-4 sm:p-5 transition-colors cursor-pointer group ${
                  notice.isPinned
                    ? "bg-amber-50/30 hover:bg-amber-50"
                    : "hover:bg-blue-50/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {/* পিন করা থাকলে ব্যাজ দেখাবে */}
                      {notice.isPinned && (
                        <span className="shrink-0 text-[10px] sm:text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                          📌 Pinned
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    {/* কনটেন্টের কিছুটা অংশ প্রিভিউ হিসেবে */}
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {notice.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="ghost"
                      className="text-xs bg-success py-1 px-3 rounded-full text-success-foreground"
                    >
                      {formatDate(notice.createdAt)}
                    </Badge>
                    <Button className=" py-0 sm:inline-flex group bg-secondary  rounded">
                      বিস্তারিত দেখুন
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center text-gray-500">
            <p>এই পৃষ্ঠায় কোনো নোটিশ পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* পেজিনেশন কন্ট্রোলস */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between sm:justify-center gap-3 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            &larr; পূর্ববর্তী
          </button>

          <span className="hidden sm:inline-block text-sm font-medium text-gray-600">
            পৃষ্ঠা <strong className="text-blue-600">{currentPage}</strong> এর{" "}
            {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            পরবর্তী &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
