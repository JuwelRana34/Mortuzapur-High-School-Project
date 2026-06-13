export interface noticeSchema {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface marqueeSchema {
  id: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
}

export interface FetchNoticesResponse {
  notices: noticeSchema[];
  totalPages: number;
}
