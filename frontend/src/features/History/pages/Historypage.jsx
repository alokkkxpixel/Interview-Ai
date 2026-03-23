import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import TopBar from "@/shared/layout/TopBar";
import { historyItems, improvementData } from "../data/historyData";
import { cn } from "@/utils/cn";

function ImprovementChart() {
    return (
        <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24">
            {improvementData.map((h, i) => (
                <div
                    key={i}
                    className={cn(
                        "flex-1 rounded-t-md transition-all",
                        i === improvementData.length - 1
                            ? "bg-indigo-400"
                            : "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>
    );
}

function ProgressBar({ value }) {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
    const [sortBy, setSortBy] = useState("latest");
    const [roleType, setRoleType] = useState("all");

    const getScoreColor = (score) => {
        if (score >= 85) return "text-indigo-600 dark:text-indigo-400";
        if (score >= 70) return "text-indigo-500 dark:text-indigo-400";
        return "text-indigo-400 dark:text-indigo-500";
    };

    return (
        <div className="flex flex-col h-full">


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
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr] gap-3 px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                        {["JOB TITLE", "MATCH SCORE", "DATE EVALUATED", "QUESTIONS", "SKILL GAPS", "ACTIONS"].map(
                            (h) => (
                                <span
                                    key={h}
                                    className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase"
                                >
                                    {h}
                                </span>
                            )
                        )}
                    </div>

                    {/* Table Rows */}
                    {historyItems.map((item, idx) => (
                        <div
                            key={item.id}
                            className={cn(
                                idx < historyItems.length - 1 &&
                                "border-b border-gray-100 dark:border-gray-800"
                            )}
                        >
                            {/* Desktop row */}
                            <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr] gap-3 px-6 py-5 items-center">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {item.jobTitle}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5">
                                        {item.company} • {item.location}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex-1 max-w-[80px]">
                                        <ProgressBar value={item.matchScore} />
                                    </div>
                                    <span className={cn("text-sm font-bold", getScoreColor(item.matchScore))}>
                                        {item.matchScore}%
                                    </span>
                                </div>

                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.dateEvaluated}
                                </span>

                                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    {item.questions}
                                </span>

                                <span
                                    className={cn(
                                        "inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold",
                                        item.skillGaps <= 2
                                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                            : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                                    )}
                                >
                                    {item.skillGaps}
                                </span>

                                <button
                                    onClick={() => navigate(`/my-reports/${item.id}`)}
                                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left"
                                >
                                    View Report
                                </button>
                            </div>

                            {/* Mobile card row */}
                            <div
                                className="md:hidden px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                onClick={() => navigate(`/my-reports/${item.id}`)}
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {item.jobTitle}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            {item.company} • {item.location}
                                        </div>
                                    </div>
                                    <span className={cn("text-sm font-bold flex-shrink-0", getScoreColor(item.matchScore))}>
                                        {item.matchScore}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <ProgressBar value={item.matchScore} />
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400">
                                            {item.questions}
                                        </span>
                                        <span
                                            className={cn(
                                                "inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-semibold",
                                                item.skillGaps <= 2
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-orange-100 text-orange-600"
                                            )}
                                        >
                                            {item.skillGaps}
                                        </span>
                                        <span className="text-xs text-gray-400">{item.dateEvaluated}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Showing{" "}
                            <strong className="text-gray-900 dark:text-white">1 - 4</strong>{" "}
                            of{" "}
                            <strong className="text-gray-900 dark:text-white">24</strong> reports
                        </span>
                        <div className="flex gap-1">
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom section — stacks on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Improvement Trajectory */}
                    <div className="sm:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                    Improvement Trajectory
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Average match score increased by 14% this month.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <ImprovementChart />
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
                        <button className="mt-4 w-full px-4 py-2.5 bg-white text-indigo-700 hover:bg-gray-50 font-semibold text-sm rounded-lg transition-colors">
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
