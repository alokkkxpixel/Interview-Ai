import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../hooks/useInterview";
import { useEffect, useState } from "react";

const mockReports = [
  {
    id: "1",
    jobTitle: "Senior Product Designer",
    company: "Linear Systems",
    date: "Oct 12, 2023",
    matchScore: 92,
  },
  {
    id: "2",
    jobTitle: "Staff Software Engineer",
    company: "Fintech Global",
    date: "Oct 10, 2023",
    matchScore: 74,
  },
  {
    id: "3",
    jobTitle: "UX Architect",
    company: "Bright Horizon",
    date: "Oct 08, 2023",
    matchScore: 48,
  },
  {
    id: "4",
    jobTitle: "Principal Solutions Analyst",
    company: "Nexus Tech",
    date: "Oct 05, 2023",
    matchScore: 86,
  },
];

function ScoreBadge({ score }) {
  if (score >= 80) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
        {score}% High Match
      </Badge>
    );
  }
  if (score >= 60) {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
        {score}% Moderate
      </Badge>
    );
  }
  return (
    <Badge className="bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800">
      {score}% Low Match
    </Badge>
  );
}

export function RecentReports({ reports }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-white dark:bg-zinc-900 shadow-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Recent Reports</h2>

        <button
          onClick={() => navigate("/reports")}
          className="text-xs font-semibold text-indigo-600 hover:underline uppercase tracking-wide"
        >
          View All
        </button>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden divide-y">
        {reports?.map((report) => (
          <div
            key={report._id}
            onClick={() => navigate(`/reports/${report._id}`)}
            className="flex items-center justify-between px-4 py-4 cursor-pointer"
          >
            {/* Left Content */}
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{report?.title}</p>

              <p className="text-xs text-muted-foreground">
                {new Date(report?.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <ScoreBadge score={report?.matchScore} />

              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 text-xs uppercase">
                Job Title
              </TableHead>
              <TableHead className="text-xs uppercase">Skill Gaps</TableHead>
              <TableHead className="text-xs uppercase">Date</TableHead>
              <TableHead className="text-xs uppercase">Match Score</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports?.map((report) => (
              <TableRow
                key={report._id}
                onClick={() => navigate(`/reports/${report._id}`)}
                className="cursor-pointer hover:bg-muted/30"
              >
                <TableCell className="pl-6 font-medium">
                  {report?.title}
                </TableCell>

                <TableCell>{report?.skillGaps?.length}</TableCell>

                <TableCell>
                  {new Date(report?.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <ScoreBadge score={report?.matchScore} />
                </TableCell>

                <TableCell className="pr-4">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
