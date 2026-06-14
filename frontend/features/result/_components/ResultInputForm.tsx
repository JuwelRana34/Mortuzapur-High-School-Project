"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ResultSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    year: searchParams.get("year") || "",
    examType: searchParams.get("examType") || "",
    rollNo: searchParams.get("rollNo") || "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year || !formData.examType || !formData.rollNo) return;

    setIsLoading(true);

    // Create query string and push to URL (Triggers SSR)
    const params = new URLSearchParams({
      year: formData.year,
      examType: formData.examType,
      rollNo: formData.rollNo,
    });

    router.push(`?${params.toString()}`);
    setIsLoading(false); // In a real app, you might clear this on route change
  };

  return (
    <motion.div
      className="m-auto w-full max-w-md mt-2 md:mt-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center text-primary mb-2">
            <GraduationCap className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl">Academic Portal</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select your exam details to view your results.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <select
                  id="year"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <select
                  id="examType"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.examType}
                  onChange={(e) =>
                    setFormData({ ...formData, examType: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Exam
                  </option>
                  <option value="half-yearly">Half-Yearly</option>
                  <option value="final">Final Exam</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                required
                placeholder="e.g. 14 or 21"
                value={formData.rollNo}
                onChange={(e) =>
                  setFormData({ ...formData, rollNo: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Searching..." : "View Result"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
