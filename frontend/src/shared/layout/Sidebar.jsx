import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  History,
  Moon,
  Sun,
  LogOut,
  Plus,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/shared/context/ThemeContext";
import { Button } from "@/shared/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-analysis", label: "New Analysis", icon: BarChart2 },
  { to: "/history", label: "History", icon: History },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-40">
      {/* Logo */}
      <div className="px-6 py-6">
        <div className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          InterviewAI
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 dark:text-gray-500 mt-0.5">
          THE EFFICIENT MENTOR
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
              )
            }
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* New Analysis CTA */}
      <div className="px-3 pb-2">
        <Button
          className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => navigate("/new-analysis")}
        >
          <Plus className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Bottom actions */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-gray-100 dark:border-gray-800 pt-3">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 w-full transition-all"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          Theme
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 w-full transition-all">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
