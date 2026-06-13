export interface TeacherList {
  id: string;
  name: string;
  photoUrl?: string;
  Phone: string;
  subject: string;
  email: string;
  isInfoVisible?: boolean;
  isActive?: boolean;
  isHeadTeacher?: boolean;
  createdAt: string;
  updatedAt: string;
}