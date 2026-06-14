// lib/db.ts
export interface SubjectResult{
  id: string;
  name: string;
  fullMarks: number;
  passMarks: number;
  obtained: number;
  grade: string;
  gradePoint: number;
};

export type uploadSubjectResult = Omit<SubjectResult, "id" | "grade" | "gradePoint">;

export type updateSubjectResult = Partial<SubjectResult> & { id: string };

export interface StudentData {
  name: string;
  studentId?: string;
  class: string;
  section?: string;
  rollNo: string;
  examTitle: string;
  issueDate: string;
  remarks: string;
};

export type ExamResult = {
  studentData: StudentData;
  resultsData: SubjectResult[];
};

// Structured as: [Year] -> [ExamType] -> [RollNo]
export const mockDatabase: Record<
  string,
  Record<string, Record<string, ExamResult>>
> = {
  "2025": {
    final: {
      "14": {
        studentData: {
          name: "Eleanor Pena",
          studentId: "STU-2025-0842",
          class: "Class 10",
          section: "Section A",
          rollNo: "14",
          examTitle: "Annual Final Examination 2025",
          issueDate: "June 15, 2026",
          remarks: "Excellent performance. Keep up the consistent hard work.",
        },
        resultsData: [
          {
            id: "1",
            name: "English Literature",
            fullMarks: 100,
            passMarks: 40,
            obtained: 88,
            grade: "A",
            gradePoint: 4.0,
          },
          {
            id: "2",
            name: "Mathematics",
            fullMarks: 100,
            passMarks: 40,
            obtained: 95,
            grade: "A+",
            gradePoint: 4.0,
          },
        ],
      },
      "21": {
        studentData: {
          name: "John Smith",
          studentId: "STU-2025-0899",
          class: "Class 10",
          section: "Section A",
          rollNo: "21",
          examTitle: "Annual Final Examination 2025",
          issueDate: "June 15, 2026",
          remarks:
            "Good effort overall, but mathematics requires more attention.",
        },
        resultsData: [
          {
            id: "1",
            name: "English Literature",
            fullMarks: 100,
            passMarks: 40,
            obtained: 65,
            grade: "B-",
            gradePoint: 2.7,
          },
          {
            id: "2",
            name: "Mathematics",
            fullMarks: 100,
            passMarks: 40,
            obtained: 38,
            grade: "F",
            gradePoint: 0.0,
          },
        ],
      },
    },
    "half-yearly": {
      "14": {
        studentData: {
          name: "Eleanor Pena",
          studentId: "STU-2025-0842",
          class: "Class 10",
          section: "Section A",
          rollNo: "14",
          examTitle: "Half-Yearly Examination 2025",
          issueDate: "Jan 15, 2026",
          remarks: "Strong start to the year.",
        },
        resultsData: [
          {
            id: "1",
            name: "English Literature",
            fullMarks: 100,
            passMarks: 40,
            obtained: 82,
            grade: "A-",
            gradePoint: 3.7,
          },
          {
            id: "2",
            name: "Mathematics",
            fullMarks: 100,
            passMarks: 40,
            obtained: 90,
            grade: "A",
            gradePoint: 4.0,
          },
        ],
      },
    },
  },
};

// Fake backend fetch function
export async function getResultData(
  year: string,
  exam: string,
  roll: string,
): Promise<ExamResult | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDatabase?.[year]?.[exam]?.[roll] || null;
}
