import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const QuestionCard = ({ question, answer, intention }) => {
  // Question card with expand/collapse

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

          {answer && (
            <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3">
                HOW TO ANSWER
              </h4>
              <ul className="space-y-2">
                {answer && (
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    {answer}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
