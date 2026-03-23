import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target, Clock, AlertTriangle } from "lucide-react";
import { useInterview } from "../../hooks/useInterview";
import { useMemo } from "react";

export function StatsCards() {
  const { reports } = useInterview();

  const stats = useMemo(() => {
    if (!reports || reports.length === 0) {
      return [
        {
          label: "Total Reports",
          value: 0,
          sub: "No reports yet",
          subColor: "text-muted-foreground",
          icon: FileText,
          iconBg: "bg-indigo-50 dark:bg-indigo-950",
          iconColor: "text-indigo-600",
        },
        {
          label: "Avg Match Score",
          value: "0%",
          sub: "Generate a report",
          subColor: "text-muted-foreground",
          icon: Target,
          iconBg: "bg-indigo-50 dark:bg-indigo-950",
          iconColor: "text-indigo-600",
        },
        {
          label: "Avg Prep Days",
          value: "0",
          sub: "-",
          subColor: "text-muted-foreground",
          icon: Clock,
          iconBg: "bg-indigo-50 dark:bg-indigo-950",
          iconColor: "text-indigo-600",
        },
        {
          label: "Skill Gaps",
          value: 0,
          sub: "-",
          subColor: "text-muted-foreground",
          icon: AlertTriangle,
          iconBg: "bg-indigo-50 dark:bg-indigo-950",
          iconColor: "text-indigo-600",
        },
      ];
    }

    const totalReports = reports.length;

    const avgMatchScore = Math.round(
      reports.reduce((sum, report) => sum + (report.matchScore || 0), 0) /
      totalReports
    );

    const avgPrepDays = (
      reports.reduce(
        (sum, report) => sum + (report.preparationPlan?.length || 0),
        0
      ) / totalReports
    ).toFixed(1);

    const totalSkillGaps = reports.reduce(
      (sum, report) => sum + (report.skillGaps?.length || 0),
      0
    );

    return [
      {
        label: "Total Reports",
        value: totalReports,
        sub: "All generated reports",
        subColor: "text-emerald-500",
        icon: FileText,
        iconBg: "bg-indigo-50 dark:bg-indigo-950",
        iconColor: "text-indigo-600",
      },
      {
        label: "Avg Match Score",
        value: `${avgMatchScore}%`,
        sub: "Across all reports",
        subColor: "text-muted-foreground",
        icon: Target,
        iconBg: "bg-indigo-50 dark:bg-indigo-950",
        iconColor: "text-indigo-600",
      },
      {
        label: "Avg Prep Days",
        value: avgPrepDays,
        sub: "Estimated preparation",
        subColor: "text-rose-500",
        icon: Clock,
        iconBg: "bg-indigo-50 dark:bg-indigo-950",
        iconColor: "text-indigo-600",
      },
      {
        label: "Skill Gaps",
        value: totalSkillGaps,
        sub: "Skills to improve",
        subColor: "text-amber-500",
        icon: AlertTriangle,
        iconBg: "bg-indigo-50 dark:bg-indigo-950",
        iconColor: "text-indigo-600",
      },
    ];
  }, [reports]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(
        ({ label, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
          <Card key={label} className="border border-border shadow-none">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <span className={`text-xs mx-2 font-medium ${subColor}`}>
                  {sub}
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold tracking-tight">
                {value}
              </p>

              <p className="mt-1  text-sm text-muted-foreground">
                {label}
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}