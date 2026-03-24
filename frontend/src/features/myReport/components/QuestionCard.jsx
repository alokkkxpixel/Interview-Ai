import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckCircle2, Lightbulb } from "lucide-react";

export default function QuestionsAccordion({
  question,
  answer,
  intention,
  value,
}) {
  return (
    <AccordionItem
      value={value}
      className="border-b px-4 gap-5   last:border-b-0"
    >
      {/* Question */}
      <AccordionTrigger className="text-left hover:no-underline">
        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white leading-snug">
          {question}
        </p>
      </AccordionTrigger>

      {/* Expanded Content */}
      <AccordionContent className="pt-4 pb-4 space-y-4">
        {/* Interviewer Intent */}
        {intention && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              INTERVIEWER'S INTENT
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {intention}
            </p>
          </div>
        )}

        {/* How To Answer */}
        {answer && (
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-3 sm:p-4">
            <h4 className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
              HOW TO ANSWER
            </h4>

            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              {answer}
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
