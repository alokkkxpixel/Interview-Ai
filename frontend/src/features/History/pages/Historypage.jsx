import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import TopBar from "@/shared/layout/TopBar";
import { cn } from "@/utils/cn";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useInterview } from "@/features/hooks/useInterview";
import toast from "react-hot-toast";

function ImprovementChart({ data }) {
  const chartData = data.map((item) => ({
    name: item.jobTitle,
    score: item.matchScore,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#6366f1"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-zinc-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-indigo-600 h-2 rounded-full transition-all"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export default function HistoryPage() {
  const navigate = useNavigate();
  // const { openSidebar } = useOutletContext();
  const { loading, handleGetAllInterviewReports } = useInterview();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await handleGetAllInterviewReports();
        const mappedData = data.map((report) => ({
          ...report,
          id: report._id,
          jobTitle: report.title || "Unknown Title",
          company: report.company || "N/A",
          location: report.location || "Remote",
          matchScore: report.matchScore || 0,
          dateEvaluated: report.createdAt
            ? new Date(report.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A",
          questions:
            (report.technicalQuestions?.length || 0) +
            (report.behavioralQuestions?.length || 0),
          skillGaps: report.skillGaps?.length || 0,
          roleType: report.roleType || "engineering",
        }));
        setReports(mappedData);
      } catch (error) {
        toast.error(`Failed to fetch reports ${error}`);
      }

      if (loading) {
        return <div className="p-10 text-center">Loading Report...</div>;
      }

      if (!reports) {
        return <div className="p-10 text-center">Report Not Found</div>;
      }
    }
    fetchReports();
  }, []);

  const [sortBy, setSortBy] = useState("latest");
  const [roleType, setRoleType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = reports.filter((item) => {
    if (roleType === "all") return true;
    return item.roleType === roleType;
  });
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "score") return b.matchScore - a.matchScore;
    if (sortBy === "date")
      return new Date(b.dateEvaluated) - new Date(a.dateEvaluated);
    return new Date(b.dateEvaluated) - new Date(a.dateEvaluated);
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const getScoreColor = (score) => {
    if (score >= 85) return "text-indigo-600 dark:text-indigo-400";
    if (score >= 70) return "text-indigo-500 dark:text-indigo-400";
    return "text-indigo-400 dark:text-indigo-500";
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [roleType, sortBy]);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
              OVERVIEW
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Past Evaluations
            </h1>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase block mb-1">
                SORT BY
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100 min-w-[140px]"
              >
                <option value="latest">Latest Evaluation</option>
                <option value="score">Match Score</option>
                <option value="date">Date</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase block mb-1">
                ROLE TYPE
              </label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="h-9 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100 min-w-[120px]"
              >
                <option value="all">All Roles</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl py-3 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          {/* Desktop Table Header */}
          <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr] gap-3 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800">
            {[
              "JOB TITLE",
              "MATCH SCORE",
              "DATE EVALUATED",
              "QUESTIONS",
              "SKILL GAPS",
              "ACTIONS",
            ].map((h) => (
              <span
                key={h}
                className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {paginatedItems.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                idx < paginatedItems.length - 1 &&
                  "border-b border-zinc-100 dark:border-zinc-800",
              )}
            >
              {/* Desktop row */}
              <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr] gap-3 px-6 py-5 items-center">
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.jobTitle}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {item.company} • {item.location}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-[80px]">
                    <ProgressBar value={item.matchScore} />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      getScoreColor(item.matchScore),
                    )}
                  >
                    {item.matchScore}%
                  </span>
                </div>

                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.dateEvaluated}
                </span>

                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  {item.questions}
                </span>

                <span
                  className={cn(
                    "inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold",
                    item.skillGaps <= 2
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
                  )}
                >
                  {item.skillGaps}
                </span>

                <button
                  onClick={() => navigate(`/reports/${item.id}`)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left"
                >
                  View Report
                </button>
              </div>

              {/* Mobile card row */}
              <div
                className="md:hidden px-4 py-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                onClick={() => navigate(`/my-reports/${item.id}`)}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {item.jobTitle}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {item.company} • {item.location}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold flex-shrink-0",
                      getScoreColor(item.matchScore),
                    )}
                  >
                    {item.matchScore}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={item.matchScore} />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      {item.questions}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-semibold",
                        item.skillGaps <= 2
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-600",
                      )}
                    >
                      {item.skillGaps}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {item.dateEvaluated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center px-4 justify-end gap-2 ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="h-8 w-8 flex items-center justify-center rounded-lg border"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-8 w-8 flex items-center justify-center rounded-lg border"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom section — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Improvement Trajectory */}
          <div className="sm:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Improvement Trajectory
                </h3>
                <p className="text-xs text-zinc-400">
                  Average match score increased by 14% this month.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <ImprovementChart data={paginatedItems} />
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-indigo-600 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-widest text-indigo-200 uppercase border border-indigo-400 px-2 py-0.5 rounded-full">
                PRO TIP
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-3">
                Focus on Distributed Systems
              </h3>
              <p className="text-sm text-indigo-200 mt-2 leading-relaxed">
                Your last 3 reports highlight consistent skill gaps in system
                architecture patterns.
              </p>
            </div>
            <button className="mt-4 w-full px-4 py-2.5 bg-white text-indigo-700 hover:bg-zinc-50 font-semibold text-sm rounded-lg transition-colors">
              Explore Learning Path
            </button>
          </div>
        </div>

        {/* Mobile New Analysis button */}
        <div className="sm:hidden pb-2">
          <button
            onClick={() => navigate("/new-analysis")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            + New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
