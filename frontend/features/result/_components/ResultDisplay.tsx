"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolName } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Printer,
  User,
} from "lucide-react";
import { ExamResult } from "../Schema";
import Stats from "./Stats";

interface ResultDisplayProps {
  data: ExamResult;
}

export default function ResultDisplay({ data }: ResultDisplayProps) {
  // Derived stats
  const totalMarks = data.resultsData.reduce(
    (acc, curr) => acc + curr.fullMarks,
    0,
  );
  const totalObtained = data.resultsData.reduce(
    (acc, curr) => acc + curr.obtained,
    0,
  );
  const percentage = totalMarks ? (totalObtained / totalMarks) * 100 : 0;
  const averageGPA = data.resultsData.length
    ? (
        data.resultsData.reduce((acc, curr) => acc + curr.gradePoint, 0) /
        data.resultsData.length
      ).toFixed(2)
    : "0.00";
  const isPassed = data.resultsData.every(
    (sub) => sub.obtained >= sub.passMarks,
  );

  const stats =[
    {
      id: "totalMarks",
      label: "Total Marks",
      value: `${totalObtained} / ${totalMarks}`,
      icon: <Award className="w-6 h-6" />,
    },
    {
      id: "percentage",
      label: "Percentage",
      value: `${percentage.toFixed(1)}%`,
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      id: "gpa",
      label: "GPA",
      value: averageGPA,
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      id: "finalStatus",
      label: "Final Status",
      value: isPassed ? "PASSED" : "FAILED",
      icon: isPassed ? (
        <CheckCircle2 className="w-6 h-6" />
      ) : (
        <Award className="w-6 h-6" />
      ),
      isPassed,
    },
  ]


  return (
    <motion.div
      className="mx-auto w-full max-w-5xl space-y-6 mt-8"
      initial="hidden"
      animate="show"
    >
      {/* Header Actions */}
      <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">
            {SchoolName || "Academic Institution"}
          </h1>
          <p className="text-secondary flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" /> {data.studentData.examTitle}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => window.history.back()}>
            &larr; Back to Search
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </motion.div>

      {/* Student Information Card */}
      <motion.div>
        <Card className="overflow-hidden border-t-4 border-t-[hsl(var(--primary))]">
          <CardContent className="p-0">
            <div className="bg-[hsl(var(--secondary))] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-secondary/10 flex items-center justify-center shadow-sm">
                  <User className="w-8 h-8 text-secondary " />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient">
                    {data.studentData.name}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                    {data.studentData.studentId ? (
                      <>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> ID:{" "}
                          {data?.studentData?.studentId}
                        </span>
                      </>
                    ) : (
                      "N/A"
                    )}

                    <span className="flex items-center gap-1 text-secondary">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {data.studentData.class}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:flex md:gap-8">
                {data.studentData.section ? (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                        Section
                      </p>
                      <p className="font-semibold">
                        {data.studentData.section}
                      </p>
                    </div>
                  </>
                ) : (
                  "N/A"
                )}

                <div className="space-y-1">
                  <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Roll No
                  </p>
                  <p className="font-semibold text-primary">
                    {data.studentData.rollNo}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Stats
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}

        {/* <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-md text-[hsl(var(--primary))]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                Total Marks
              </p>
              <h3 className="text-2xl font-bold">
                {totalObtained}{" "}
                <span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">
                  / {totalMarks}
                </span>
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-md text-[hsl(var(--primary))]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                Percentage
              </p>
              <h3 className="text-2xl font-bold">{percentage.toFixed(1)}%</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-md text-[hsl(var(--primary))]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                GPA
              </p>
              <h3 className="text-2xl font-bold">{averageGPA}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div
              className={`p-3 rounded-md ${isPassed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {isPassed ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <Award className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                Final Status
              </p>
              <Badge
                variant={isPassed ? "default" : "destructive"}
                className={
                  isPassed
                    ? "bg-success text-success-foreground hover:bg-success/90 mt-1 p-2 rounded"
                    : "mt-1"
                }
              >
                {isPassed ? "PASSED" : "FAILED"}
              </Badge>
            </div>
          </CardContent>
        </Card> */}
      </motion.div>

      {/* Detailed Marks Table */}
      <motion.div>
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[hsl(var(--muted-foreground))] uppercase bg-[hsl(var(--secondary))] rounded-t-md">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-tl-md">
                      Subject
                    </th>
                    <th className="px-4 py-3 font-medium text-center">
                      Full Marks
                    </th>
                    <th className="px-4 py-3 font-medium text-center">
                      Pass Marks
                    </th>
                    <th className="px-4 py-3 font-medium text-center">
                      Obtained
                    </th>
                    <th className="px-4 py-3 font-medium text-center">Grade</th>
                    <th className="px-4 py-3 font-medium text-right rounded-tr-md">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {data.resultsData.map((subject, index) => (
                    <motion.tr
                      key={subject.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-[hsl(var(--muted))]/50 transition-colors"
                    >
                      <td className="px-4 py-4 font-medium text-[hsl(var(--foreground))]">
                        {subject.name}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {subject.fullMarks}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {subject.passMarks}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold">
                        <span
                          className={
                            subject.obtained < subject.passMarks
                              ? "text-[hsl(var(--destructive))]"
                              : ""
                          }
                        >
                          {subject.obtained}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge
                          variant={
                            subject.obtained < subject.passMarks
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {subject.grade}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        {subject.gradePoint.toFixed(1)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer & Remarks */}
      <motion.div className="grid md:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">
              Class Teacher&apos;s Remarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic leading-relaxed">
              &quot;{data.studentData.remarks}&quot;
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardContent className="p-6 flex flex-col justify-between h-full min-h-40">
            <div className="flex justify-between items-end h-full mt-12">
              <div className="text-center">
               
                <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  Date of Issue
                </p>
                <p className="text-xs font-semibold mt-1">
                  {data.studentData.issueDate}
                </p>
              </div>
              <div className="text-center">
                <div className="w-40 border-b border-slate-700 mb-2"></div>
                <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  Principal&apos;s Signature
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
