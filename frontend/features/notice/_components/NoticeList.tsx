import { notices } from "@/app/Data/DemoData";
import Modal from "@/components/shared/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/DateFormater";
import { ArrowRight, Calendar, FileText, MailOpen, Pin } from "lucide-react";
import Link from "next/link";
import useNoticeList from "../hooks/useNoticeList";

// --- MAIN COMPONENT ---

export default function NoticeBoard({ limit = 3 }: { limit?: number }) {
  // Filter out unpublished notices and sort: pinned first, then by date descending
  const displayNotices = useNoticeList({ notices });

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
              <FileText className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">
                আপডেট তথ্য
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient ">
              নোটিশ বোর্ড
            </h2>
          </div>
          <Link href="/notices">
            <Button
              variant="outline"
              className="hidden sm:inline-flex group btn rounded"
            >
              সকল নোটিশ দেখুন
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Notices List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {displayNotices.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {displayNotices.slice(0, limit).map((notice) => (
                <div
                  key={notice.id}
                  className={`group relative flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-gray-50 transition-colors ${
                    notice.isPinned ? "bg-blue-50/50" : ""
                  }`}
                >
                  {/* Pinned Indicator or Icon */}
                  <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    {notice.isPinned ? (
                      <Pin className="w-5 h-5 fill-current rotate-45 text-red-500" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {notice.isPinned && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 p-2">
                          পিন করা
                        </Badge>
                      )}
                      <div className="flex items-center text-xs font-medium text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {formatDate(notice.createdAt)}
                      </div>
                    </div>

                    <div className="text-lg font-semibold text-gray-900  mb-1 pr-4">
                      <h3 className="hover:text-blue-600 focus:outline-none flex flex-wrap">
                        {/* Extend link overlay to whole card for better UX */}
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                        {notice.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {notice.content}
                    </p>
                  </div>

                  {/* Action Icon */}
                  <div className="relative shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors z-10">
                    <Modal
                      title={notice.title}
                      description={notice.content}
                      trigger={
                        <span className="modal-btn">
                          <MailOpen className="h-5 w-5" /> view
                        </span>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              বর্তমানে কোনো নোটিশ নেই।
            </div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 sm:hidden">
          <Link href="/notices">
          <Button
            variant="outline"
            className="w-full justify-center btn rounded group"
          >
            সকল নোটিশ দেখুন
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
