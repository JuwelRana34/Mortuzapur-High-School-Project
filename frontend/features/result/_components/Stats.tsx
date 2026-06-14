import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function Stats({
  icon,
  label,
  value,
}: StatsProps) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
        <div
          className={`p-3  rounded-md  ${label === "Final Status" ? "text-success-foreground bg-success" : "text-primary bg-primary/20"}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
            {label}
          </p>
          {label === "Final Status" ? (
            <h3
              className={`text-2xl font-bold ${
                value === "FAILED" ? "text-destructive" : "text-green-600" // text-success-foreground দিতে পারেন
              }`}
            >
              {value === "FAILED" ? "FAILED !" : value}
            </h3>
          ) : (
            <h3 className="text-2xl font-bold ">{value}</h3>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
