import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { CTABanner } from "@/features/dashboard/components/CTABanner";
import { RecentReports } from "@/features/dashboard/components/RecentReports";
import { Badge } from "@/components/ui/badge";
import { useInterview } from "@/features/hooks/useInterview";
import { useEffect, useState } from "react";

// TODO: replace with real user from auth context
const user = { username: "Alok" };

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getGreetingEmoji() {
  const hour = new Date().getHours();
  if (hour < 12) return "👋";
  if (hour < 17) return "☀️";
  return "🌙";
}

export default function DashboardPage() {
  const { handleGetAllInterviewReports } = useInterview();

  const [reports, setReports] = useState([]);
  useEffect(() => {
    async function getReports() {
      try {
        const res = await handleGetAllInterviewReports();
        setReports(res);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
    getReports();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-6xl  mx-auto w-full">
      {/* ── Welcome header ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()}, {user.username} {getGreetingEmoji()}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Ready to refine your interview presence today?
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs font-medium border-indigo-200 text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-400"
          >
            3 REPORTS PENDING
          </Badge>
          <Badge
            variant="outline"
            className="text-xs font-medium border-violet-200 text-violet-600 bg-violet-50 dark:bg-violet-950 dark:border-violet-800 dark:text-violet-400"
          >
            NEXT WALK-THRU: 2PM
          </Badge>
        </div>
      </div>

      {/* ── Stats ── */}
      <StatsCards reports={reports} />

      {/* ── CTA Banner ── */}
      <CTABanner />

      {/* ── Recent Reports ── */}
      <RecentReports reports={reports} />
    </div>
  );
}
