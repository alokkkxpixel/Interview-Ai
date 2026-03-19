import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { cn } from "@/utils/cn";

export default function TopBar({
  breadcrumb,
  showSearch = false,
  searchPlaceholder = "Search...",
  userName = "Alok",
  userInitials = "AL",
  userRole,
  actions,
}) {
  const [hasNotification] = useState(true);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-30">
      {/* Left: Breadcrumb or Search */}
      fdfdlfksdfklsdnf fsdflopsdkfmksdmf

      {/* Right: Actions + Notifications + User */}
      <div className="flex items-center gap-3">
        {actions}

        {!showSearch && (
          <button className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors">
            <Search className="h-4 w-4" />
          </button>
        )}

        {/* Notifications */}
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors">
          <Bell className="h-4 w-4" />
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full" />
          )}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          {userRole && (
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{userName}</div>
              <div className="text-xs text-gray-400 font-semibold tracking-wide">{userRole}</div>
            </div>
          )}
          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300 flex-shrink-0">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
