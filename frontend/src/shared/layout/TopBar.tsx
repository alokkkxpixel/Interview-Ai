import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { cn } from "@/utils/cn";

interface TopBarProps {
  title?: string;
  breadcrumb?: { label: string; to?: string }[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  userName?: string;
  userInitials?: string;
  userAvatar?: string;
  userRole?: string;
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({
  breadcrumb,
  showSearch = false,
  searchPlaceholder = "Search...",
  userName = "Alok",
  userInitials = "AL",
  userRole,
  actions,
}) => {
  const [hasNotification] = useState(true);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-30">
      {/* Left: Breadcrumb or Search */}
      <div className="flex-1">
        {showSearch ? (
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>
        ) : (
          breadcrumb && (
            <nav className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase">
              {breadcrumb.map((item, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-2">/</span>}
                  <span className={cn(i === breadcrumb.length - 1 && "text-gray-500 dark:text-gray-400")}>
                    {item.label}
                  </span>
                </span>
              ))}
            </nav>
          )
        )}
      </div>

      {/* Right: Actions + Notifications + User */}
      <div className="flex items-center gap-3">
        {actions}

        {/* Search icon (when search bar not shown) */}
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
              <div className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{userRole}</div>
            </div>
          )}
          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-semibold text-sm overflow-hidden">
            <span>{userInitials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
