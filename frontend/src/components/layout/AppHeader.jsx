import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/dashboard": ["Overview", "Dashboard"],
  "/analysis/new": ["Analysis", "New Analysis"],
  "/reports": ["Reports", "My Reports"],
  "/history": ["Reports", "History"],
  "/skills": ["Insights", "Skill Tracker"],
  "/settings": ["Account", "Settings"],
};

export function AppHeader({ user }) {
  const { pathname } = useLocation();
  const crumbs = breadcrumbMap[pathname] ?? ["Overview", "Dashboard"];

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 shrink-0">
      {/* Left: sidebar trigger + breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <nav className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>{crumbs[0]}</span>
          <span className="mx-1">/</span>
          <span className="text-foreground">{crumbs[1]}</span>
        </nav>
      </div>

      {/* Right: search, notifications, avatar */}
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Search className="h-4 w-4" />
        </button>
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500" />
        </button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-semibold">
            {user?.username?.[0]?.toUpperCase() ?? "A"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
