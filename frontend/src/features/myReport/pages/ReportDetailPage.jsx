import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  CheckCircle2,
  Circle,
  Zap,
} from "lucide-react";
import TopBar from "@/shared/layout/TopBar";
import { sampleReport } from "../data/reportData";
import { cn } from "@/utils/cn";
import QuestionCard from "../components/QuestionCard";
import CircularProgress from "../components/CircularProgress";
import { useInterview } from "@/features/hooks/useInterview";

// Simple Tabs
function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-0 border-b  border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex-shrink-0 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
            activeTab === tab.value
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function ReportDetailPage() {
  // const { openSidebar } = useOutletContext();

  const [activeTab, setActiveTab] = useState("technical");

  const tabList = [
    { value: "technical", label: "Technical Questions" },
    { value: "behavioral", label: "Behavioral Questions" },
    { value: "gaps", label: "Skill Gaps" },
    { value: "plan", label: "Preparation Plan" },
  ];

  const { id } = useParams();
  const { handleGetInterviewReportById } = useInterview();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await handleGetInterviewReportById(id);
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading Report...</div>;
  }

  if (!report) {
    return <div className="p-10 text-center">Report Not Found</div>;
  }

  return (
    <>
      <div className="flex  sm:w-full   flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 sm:p-3">
          {/* Job Header Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:py-6 sm:px-10 mb-4  sm:mb-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                  {report?.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                    {report?.company}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {report?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{" "}
                      {report?.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{" "}
                      {report?.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <CircularProgress value={report.matchScore} />
              </div>
            </div>
          </div>

          {/* Main content — stacks on mobile, side-by-side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left: Tabs (full width on mobile, 2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <Tabs
                tabs={tabList}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              <div className="mt-3 sm:mt-4">
                {activeTab === "technical" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Priority Questions
                      </h2>
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                        TOP PICKS
                      </span>
                    </div>
                    {report?.technicalQuestions?.map((q) => (
                      <QuestionCard
                        key={q.id}
                        question={q}
                        answer={q.answer}
                        intention={q.interviewerIntent}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "behavioral" && (
                  <div className="space-y-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Behavioral Questions
                    </h2>
                    {report?.behavioralQuestions?.map((q) => (
                      <QuestionCard
                        key={q.id}
                        question={q}
                        answer={q.answer}
                        intention={q.interviewerIntent}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "gaps" && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Identified Skill Gaps
                    </h2>

                    {["high", "medium", "low"].map((level) => {
                      const skills = report?.skillGaps?.filter(
                        (gap) => gap.severity === level,
                      );

                      if (!skills?.length) return null;

                      const levelStyle = {
                        high: "text-red-600 dark:text-red-400",
                        medium: "text-amber-600 dark:text-amber-400",
                        low: "text-green-600 dark:text-green-400",
                      };

                      return (
                        <div key={level} className="mb-4">
                          <span
                            className={`text-sm font-semibold uppercase tracking-wide ${levelStyle[level]}`}
                          >
                            {level}
                          </span>

                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                            —{" "}
                            {skills.map((skill, i) => (
                              <span key={i} className="p-2 rounded-full ">
                                {skill.skill}
                                {i !== skills.length - 1 && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      );
                    })}

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                      These are the key areas where your profile doesn't fully
                      align with the job requirements. Focus on these during
                      your 7-day sprint.
                    </p>
                  </div>
                )}

                {activeTab === "plan" && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      7-Day Preparation Plan
                    </h2>

                    <div className="space-y-6">
                      {report?.preparationPlan?.map((day) => (
                        <div key={day.day} className="flex items-start gap-3">
                          <Circle className="h-5 w-5 text-gray-300 dark:text-gray-700 mt-1 flex-shrink-0" />

                          <div className="w-full">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              DAY {day.day}
                            </div>

                            {/* focus */}
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {day.focus}
                            </div>

                            {/* tasks */}
                            <ul className="mt-2 space-y-1 text-xs text-gray-500">
                              {day.tasks?.map((task, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-indigo-500">•</span>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              {/* Critical Gaps */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3">
                  Critical Gaps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.skillGaps.map((gap, index) => (
                    <span
                      key={index}
                      className="p-2 text-xs rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium border border-red-100 dark:border-red-900/30"
                    >
                      {" "}
                      • {gap.skill}{" "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentor Note */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Mentor Note
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {/* {report?.mentorNote} */}
                </p>
              </div>

              {/* 7-Day Sprint */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm">
                {/* Mock session banner */}
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg px-3 py-2.5 flex items-center gap-2 mb-4">
                  <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">
                    Ready for a mock session?
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3">
                  7-Day Sprint
                </h3>
                <div className="space-y-4">
                  {report?.preparationPlan?.slice(0, 2).map((day) => (
                    <div key={day.day} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border-2 flex-shrink-0",
                            day.day === 1
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-300 dark:border-gray-700",
                          )}
                        />
                        {day.day < 2 && (
                          <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-2 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              DAY {day.day}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                              {day.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {day.description}
                            </div>
                          </div>
                          {day.day === 1 && (
                            <button className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                              <Play className="h-3.5 w-3.5 text-white fill-white" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors">
                  Open Full Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
