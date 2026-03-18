import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target, Clock, AlertTriangle } from "lucide-react";

const stats = [
  {
    label: "Total Reports",
    value: "24",
    sub: "+2 this week",
    subColor: "text-emerald-500",
    icon: FileText,
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600",
  },
  {
    label: "Match Score",
    value: "82%",
    sub: "Target: 90%",
    subColor: "text-muted-foreground",
    icon: Target,
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600",
  },
  {
    label: "Avg Prep Days",
    value: "4.2",
    sub: "-0.4 from last month",
    subColor: "text-rose-500",
    icon: Clock,
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600",
  },
  {
    label: "Skill Gaps",
    value: "12",
    sub: "5 priority",
    subColor: "text-amber-500",
    icon: AlertTriangle,
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
        <Card key={label} className="border border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <span className={`text-xs font-medium ${subColor}`}>{sub}</span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
