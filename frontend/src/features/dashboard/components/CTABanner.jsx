import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTABanner() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
      {/* subtle circle decorations */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold">Ready for a new simulation?</h3>
          <p className="mt-1 max-w-md text-sm text-indigo-100">
            Upload a job description and your resume to generate a custom
            interview analysis in under 60 seconds.
          </p>
        </div>
        <Button
          onClick={() => navigate("/analysis/new")}
          size="lg"
          className="shrink-0 bg-white text-indigo-700 font-semibold hover:bg-indigo-50 shadow-none"
        >
          Start New Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
