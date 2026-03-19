import { useState } from "react";
import { useOutletContext } from "react-router-dom";
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

// Circular Progress SVG
function CircularProgress({ value }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-28 sm:w-28 transition transition-all duration-500">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transition="all 0.5s ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {value}%
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            MATCH
          </span>
        </div>
      </div>
    </div>
  );
}

// Question card with expand/collapse
function QuestionCard({ question }) {
  const [expanded, setExpanded] = useState(question.expanded || false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <button
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">
            {question.category}
          </span>
          <p className="text-xs sm:text-sm  font-semibold text-gray-900 dark:text-white leading-snug">
            {question.question}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
        )}
      </button>

      {expanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100 dark:border-gray-800 pt-4 space-y-4">
          {question.interviewerIntent && (
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                INTERVIEWER'S INTENT
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {question.interviewerIntent}
              </p>
            </div>
          )}

          {question.howToAnswer && question.howToAnswer.length > 0 && (
            <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
                HOW TO ANSWER
              </h4>
              <ul className="space-y-2">
                {question.howToAnswer.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple Tabs
function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-0 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex-shrink-0 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
            activeTab === tab.value
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
  const report = sampleReport;
  const [activeTab, setActiveTab] = useState("technical");

  const tabList = [
    { value: "technical", label: "Technical Questions" },
    { value: "behavioral", label: "Behavioral Questions" },
    { value: "gaps", label: "Skill Gaps" },
    { value: "plan", label: "Preparation Plan" },
  ];

  return (
    <>
      <div className="flex  sm:w-full   flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 sm:p-3">
          {/* Job Header Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:py-6 sm:px-10 mb-4  sm:mb-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                  {report.companyLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                    {report.company}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {report.jobTitle}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {report.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {report.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <CircularProgress value={75} />
              </div>
            </div>
          </div>

          {/* Main content — stacks on mobile, side-by-side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left: Tabs (full width on mobile, 2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} />

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
                    {report.technicalQuestions.map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                  </div>
                )}

                {activeTab === "behavioral" && (
                  <div className="space-y-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Behavioral Questions
                    </h2>
                    {report.behavioralQuestions.map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                  </div>
                )}

                {activeTab === "gaps" && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Identified Skill Gaps
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {report.criticalGaps.map((gap) => (
                        <span
                          key={gap}
                          className="px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/30"
                        >
                          • {gap}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                      These are the key areas where your profile doesn't fully align
                      with the job requirements. Focus on these during your 7-day sprint.
                    </p>
                  </div>
                )}

                {activeTab === "plan" && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      7-Day Preparation Plan
                    </h2>
                    <div className="space-y-4">
                      {report.sprintDays.map((day) => (
                        <div key={day.day} className="flex items-start gap-3">
                          {day.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300 dark:text-gray-700 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              DAY {day.day}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {day.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {day.description}
                            </div>
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
                  {report.criticalGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium"
                    >
                      • {gap}
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
                  {report.mentorNote}
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
                  {report.sprintDays.slice(0, 2).map((day) => (
                    <div key={day.day} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border-2 flex-shrink-0",
                            day.day === 1
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-300 dark:border-gray-700"
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
