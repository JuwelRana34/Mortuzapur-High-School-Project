import ResultDisplay from "@/features/result/_components/ResultDisplay";
import ResultSearchForm from "@/features/result/_components/ResultInputForm";
import { getResultData } from "@/features/result/Schema";


// 1. Next.js passes searchParams automatically to page components
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const {year , examType, rollNo} = await searchParams;
  const Year =
    typeof year === "string" ? year : undefined;
  const ExamType =
    typeof examType === "string"
      ? examType
      : undefined;
  const RollNo =
    typeof rollNo === "string" ? rollNo : undefined;

  let resultData = null;
  let hasSearched = false;

  // 3. If all parameters are present, fetch the data ON THE SERVER
  if (Year && ExamType && RollNo) {
    hasSearched = true;
    resultData = await getResultData(Year, ExamType, RollNo);

  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Result Portal</h1>
          <p className="text-lg text-muted-foreground">
            View academic performance, grades, and teacher remarks.
          </p>
        </div> */}

        {/* 4. Conditional Rendering */}
        {!hasSearched ? (
          <ResultSearchForm />
        ) : resultData ? (
          <ResultDisplay data={resultData} />
        ) : (
          <div className="mt-16 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-destructive">
              No Results Found
            </h2>
            <p className="text-muted-foreground">
              We couldn&apos;t find any results for Roll #{RollNo} in {Year} (
              {ExamType}).
            </p>
            <ResultSearchForm />
          </div>
        )}
      </div>
    </main>
  );
}
