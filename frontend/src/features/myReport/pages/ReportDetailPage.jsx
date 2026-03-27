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
import { Accordion } from "@/components/ui/accordion";
import QuestionsAccordion from "../components/QuestionCard";
import toast from "react-hot-toast";

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
  const {
    handleGetInterviewReportById,
    handleGenerateResume: generateResumeApi,
  } = useInterview();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeLoading, setResumeLoading] = useState(false);

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

  const handleGenerateResume = async () => {
    try {
      setResumeLoading(true);
      const data = await generateResumeApi(id);

      const url = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Resume generated successfully");
    } catch (err) {
      toast.error("Failed to generate resume");
      console.error(err);
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <>
      <div className="flex  sm:w-full   flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 sm:p-3">
          {/* Job Header Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:py-6 sm:px-10 mb-4  sm:mb-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-900 dark:bg-zinc-800 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                  {report?.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-1">
                    {report?.company}
                  </div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tighter leading-none">
                    {report?.title}
                  </h1>
                  <div className="mt-2">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {report?.jobDescription}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <CircularProgress value={report.matchScore} />
                <button
                  onClick={handleGenerateResume}
                  disabled={resumeLoading}
                  className={cn(
                    "bg-indigo-600 text-white sm:px-4 sm:py-2 rounded-lg p-2 text-xs mt-5 capitalize tracking-tight flex items-center gap-2",
                    resumeLoading && "opacity-70 cursor-not-allowed",
                  )}
                >
                  {resumeLoading ? (
                    <>
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    "generate ATS resume"
                  )}
                </button>
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
                    <Accordion
                      type="multiple"
                      collapsible
                      className="rounded-xl"
                      defaultValue={["q-0"]}
                    >
                      {report?.technicalQuestions?.map((q, i) => (
                        <QuestionsAccordion
                          key={i}
                          value={`q-${i}`}
                          question={q.question}
                          answer={q.answer}
                          intention={q.intention}
                        />
                      ))}
                    </Accordion>
                  </div>
                )}

                {activeTab === "behavioral" && (
                  <div className="space-y-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Behavioral Questions
                    </h2>
                    <Accordion
                      type="multiple"
                      className="rounded-xl "
                      defaultValue={["q-0"]}
                    >
                      {report?.behavioralQuestions?.map((q, i) => (
                        <QuestionsAccordion
                          key={i}
                          value={`q-${i}`}
                          question={q.question}
                          answer={q.answer}
                          intention={q.intention}
                        />
                      ))}
                    </Accordion>
                  </div>
                )}

                {activeTab === "gaps" && (
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 ">
                    <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-4">
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

                          <span className="text-sm text-zinc-600 dark:text-gray-200 ml-2">
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
                  <div className=" rounded-xl  dark:border-zinc-800 p-4 sm:p-6 ">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      7-Day Preparation Plan
                    </h2>

                    <div className="space-y-6">
                      {report?.preparationPlan?.map((day) => (
                        <div key={day.day} className="flex items-start gap-3">
                          <Circle className="h-5 w-5 text-gray-300 dark:text-gray-700 mt-1 flex-shrink-0" />

                          <div className="w-full">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wide">
                              DAY {day.day}
                            </div>

                            {/* focus */}
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {day.focus}
                            </div>

                            {/* tasks */}
                            <ul className="mt-2 space-y-1 text-sm text-gray-500">
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
              <div className=" rounded-lg  p-4 sm:p-5 ">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-3">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
