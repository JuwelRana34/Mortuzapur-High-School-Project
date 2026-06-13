import { noticeSchema } from "@/features/notice/schema/notice.schema";
import { phoneNumber } from "better-auth/plugins";

export const users = [
  {
    id: 1,
    name: "Alice",
    email: "rks@example.com",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  },
];


// --- DUMMY DATA ---

export const notices: noticeSchema[] = [
  {
    id: "notice-1",
    title: "২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার সময়সূচি প্রসঙ্গে",
    content:
      "আগামী ১৫ জুলাই ২০২৬ থেকে শুরু হতে যাচ্ছে অর্ধবার্ষিক পরীক্ষা। সকল শিক্ষার্থীকে পরীক্ষার রুটিন স্কুল নোটিশ বোর্ড অথবা ওয়েবসাইট থেকে সংগ্রহ করার জন্য নির্দেশ দেওয়া হলো।",
    isPublished: true,
    isPinned: false,
    createdAt: "2026-06-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
  },
  {
    id: "notice-2",
    title: "পবিত্র ঈদুল আযহা ও গ্রীষ্মকালীন ছুটি উপলক্ষে নোটিশ",
    content:
      "পবিত্র ঈদুল আযহা এবং গ্রীষ্মকালীন ছুটি উপলক্ষে আগামী ২০ জুন ২০২৬ থেকে ৫ জুলাই ২০২৬ পর্যন্ত বিদ্যালয়ের সকল কার্যক্রম বন্ধ থাকবে।",
    isPublished: true,
    isPinned: true,
    createdAt: "2026-06-08T14:30:00Z",
    updatedAt: "2026-06-08T14:30:00Z",
  },
  {
    id: "notice-3",
    title: "৬ষ্ঠ শ্রেণিতে নতুন ভর্তি হওয়া শিক্ষার্থীদের রেজিস্ট্রেশন",
    content:
      "এতদ্বারা জানানো যাচ্ছে যে, ৬ষ্ঠ শ্রেণিতে ভর্তি হওয়া সকল শিক্ষার্থীর শিক্ষা বোর্ডের রেজিস্ট্রেশন কার্যক্রম আগামী সপ্তাহে শুরু হবে।",
    isPublished: true,
    isPinned: false,
    createdAt: "2026-06-05T09:15:00Z",
    updatedAt: "2026-06-05T09:15:00Z",
  },
  {
    id: "notice-4",
    title: "ড্রাফট নোটিশ (পাবলিক নয়)",
    content: "এটি একটি টেস্ট নোটিশ যা এখনও পাবলিশ করা হয়নি।",
    isPublished: false,
    isPinned: false,
    createdAt: "2026-06-11T11:00:00Z",
    updatedAt: "2026-06-11T11:00:00Z",
  },
];

export const TeachersList = [
  {
    id: "1",
    name: "Teacher 1",
    subject: "Math",
    email: "teacher1@example.com",
    phone: "1761632836",
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    isActive: true,
    isHeadTeacher: true,
    isShowContactInfo: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "2",
    name: "Teacher 2",
    phone: "1761632836",
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    subject: "Science",
    email: "teacher2@example.com",
    isActive: true,
    isHeadTeacher: false,
    isShowContactInfo: false,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "3",
    name: "Teacher 3",
    phone: "1761632836",
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    subject: "English",
    email: "teacher3@example.com",
    isActive: true,
    isHeadTeacher: false,
    isShowContactInfo: false,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "4",
    name: "Teacher 4",
    phone: "1761632836",
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    subject: "History",
    email: "teacher4@example.com",
    isActive: true,
    isHeadTeacher: false,
    isShowContactInfo: true,
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  }
];