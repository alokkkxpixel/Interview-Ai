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
import { useInterview } from "../hooks/useInterview";
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

export function RecentReports() {
  const navigate = useNavigate();

  const { handleGetAllInterviewReports, reports } = useInterview()
  const data = useInterview()

  async function getAllReports() {
    await handleGetAllInterviewReports();
  }
  useEffect(() => {
    getAllReports()
  }, []);


  return (
    <div className="rounded-xl border border-border bg-background shadow-none overflow-hidden">
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

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground pl-6">
              Job Title
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Company
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Match Score
            </TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports?.map((report) => (
            <TableRow
              key={report._id}
              onClick={() => navigate(`/reports/${report.id}`)}
              className="cursor-pointer hover:bg-muted/30 transition-colors"
            >
              <TableCell className="pl-6 font-medium">{report?.jobDescription}</TableCell>
              <TableCell className="text-muted-foreground">{report?.company}</TableCell>
              <TableCell className="text-muted-foreground">{report?.createdAt}</TableCell>
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
  );
}
