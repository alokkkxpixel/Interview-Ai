import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import TopBar from "@/shared/layout/TopBar";
import { Button } from "@/shared/ui/button";
import { cn } from "@/utils/cn";
import { useInterview } from "@/features/hooks/useInterview";

const steps = [
  { id: 1, label: "UPLOAD RESUME" },
  { id: 2, label: "JOB DETAILS" },
  { id: 3, label: "REVIEW & GENERATE" },
];

const NewAnalysisPage = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selfDescription, setSelfDescription] = useState("");
  const [targetJobDescription, setTargetJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const fileInputRef = useRef(null);

  const currentStep = !uploadedFile
    ? 1
    : !selfDescription || !targetJobDescription || !targetRole
      ? 2
      : 3;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setFileError("");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setFileError("");
    }
  };

  const AnalysisData = {
    selfDescription,
    targetJobDescription,
    targetRole,
    uploadedFile,
  };

  const { handleGenerateInterviewReport, loading } = useInterview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      setFileError("Resume is required. Please upload your resume.");
      return;
    }

    setFileError("");
    try {
      const response = await handleGenerateInterviewReport(AnalysisData);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const canProceed = () => currentStep === 3;

  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {/* Stepper */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center overflow-x-auto pb-2">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                      step.id === currentStep
                        ? "bg-indigo-600 text-white"
                        : step.id < currentStep
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-400",
                    )}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-widest mt-1.5 uppercase",
                      step.id === currentStep
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400",
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-3 mb-4 transition-all",
                      step.id < currentStep
                        ? "bg-indigo-600"
                        : "bg-gray-200 dark:bg-gray-700",
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Craft your winning narrative.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm sm:text-base">
            The Intelligent Calm helps you align your professional journey with
            your next big opportunity.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Left: Main Form */}
          <div className="md:col-span-3 space-y-6">
            {/* Step 1: Document Upload */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Step 1: Document Upload
                </h2>

                {fileError ? (
                  <span className="text-xs font-semibold tracking-widest px-2 py-1 border border-gray-300 dark:border-gray-600 text-red-500 rounded uppercase">
                    REQUIRED!!
                  </span>
                ) : (
                  <span className="text-xs font-semibold tracking-widest px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-500 rounded uppercase">
                    REQUIRED
                  </span>
                )}
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all cursor-pointer",
                  fileError
                    ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                    : isDragging
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10"
                      : uploadedFile
                        ? "border-green-400 bg-green-50 dark:bg-green-900/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700",
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileSelect}
                  aria-required
                />

                {uploadedFile ? (
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>

                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {uploadedFile.name}
                    </div>

                    <div className="text-xs text-gray-400">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mx-auto">
                      <Upload className="h-6 w-6 text-indigo-500" />
                    </div>

                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      Drop your resume here
                    </div>

                    <div className="text-sm text-gray-400">
                      PDF, DOCX up to 10MB. Our mentor will extract your skills
                      and experience automatically.
                    </div>

                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Upload className="h-4 w-4" />
                      Select File
                    </Button>
                  </div>
                )}
              </div>
              {fileError && (
                <p className="text-red-500 text-sm mt-2">{fileError}</p>
              )}
            </div>

            {/* Step 2: Contextual Details */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Step 2: Contextual Details
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Help us bridge the gap between where you are and where you're
                  going.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Self Description */}
                <div>
                  <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase block mb-2">
                    SELF DESCRIPTION
                  </label>

                  <textarea
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    rows={6}
                    required
                    aria-required
                    className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase block mb-2">
                    TARGET JOB DESCRIPTION
                  </label>

                  <textarea
                    value={targetJobDescription}
                    onChange={(e) => setTargetJobDescription(e.target.value)}
                    rows={6}
                    required
                    aria-required
                    className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase block mb-2">
                  TARGET ROLE TITLE
                </label>

                <input
                  value={targetRole}
                  required
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-2 space-y-4">
            {/* Mentor Tip */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">
                  THE MENTOR TIP
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Our AI analyzes your unique syntax and historical impact to
                suggest interview responses that sound authentically like you.
              </p>
            </div>

            {/* Draft Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
                DRAFT SUMMARY
              </h3>

              {loading ? (
                <Button
                  // variant="outline"

                  className="w-full gap-2 bg-indigo-600  transition-all duration-200 text-white hover:bg-indigo-700 hover:text-white border-0"
                >
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Generating Report....
                </Button>
              ) : (
                <Button
                  // variant="outline"
                  type="submit"
                  className="w-full gap-2 bg-indigo-600  transition-all duration-200 text-white hover:bg-indigo-700 hover:text-white border-0"
                  //   disabled={}
                  onClick={handleSubmit}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Report!
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewAnalysisPage;
