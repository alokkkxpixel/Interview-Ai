import React from "react";
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

// Circular Progress SVG
import { useEffect, useState } from "react";

function CircularProgress({ value }) {
  const r = 36;
  const circ = 2 * Math.PI * r;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    let end = value;

    const duration = 600;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    let current = start;

    const counter = setInterval(() => {
      current += increment;

      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        current = end;
        clearInterval(counter);
      }

      setDisplayValue(Math.round(current));
    }, stepTime);

    return () => clearInterval(counter);
  }, [value]);

  const offset = circ - (displayValue / 100) * circ;

  const getColor = (score) => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 60) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-28 sm:w-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          {/* Background circle */}
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
          />

          {/* Progress circle */}
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={getColor(displayValue)}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s ease-in-out",
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {displayValue}%
          </span>

          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            MATCH
          </span>
        </div>
      </div>
    </div>
  );
}

export default CircularProgress;
