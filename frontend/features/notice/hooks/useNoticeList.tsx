import { useMemo } from "react";
import { noticeSchema } from "../schema/notice.schema";

// FIXME: Shift it as function

export default function useNoticeList({
  notices,
}: {
  notices: noticeSchema[];
}) {
  const displayNotices = useMemo(() => {
    return notices
      .filter((notice) => notice.isPublished)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [notices]);

  return displayNotices;
}
