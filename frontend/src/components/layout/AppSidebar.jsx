import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  History,
  BarChart2,
  Settings,
  Moon,
  Sun,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "New Analysis", icon: PlusCircle, to: "/analysis/new", highlight: true },
  { label: "My Reports", icon: FileText, to: "/reports" },
  { label: "History", icon: History, to: "/history" },
  { label: "Skill Tracker", icon: BarChart2, to: "/skills" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export function AppSidebar({ user }) {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const navigate = useNavigate();

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
  }

  function handleLogout() {
    // TODO: wire to auth context logout
    navigate("/auth/login");
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* ── Logo ── */}
      <SidebarHeader className="px-4 py-5 gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-base tracking-tight">InterviewAI</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              The Efficient Mentor
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── User profile ── */}
      <div className="flex items-center gap-3 px-4 py-3 group-data-[collapsible=icon]:justify-center">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-semibold">
            {user?.username?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-semibold truncate">
            {user?.username ?? "Alok"}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {user?.email ?? "alok@example.com"}
          </span>
        </div>
      </div>

      <SidebarSeparator />

      {/* ── Nav items ── */}
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, icon: Icon, to, highlight }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild tooltip={label}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : highlight
                            ? "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                            : "text-foreground hover:bg-accent",
                        ].join(" ")
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: Theme + Logout ── */}
      <SidebarFooter className="border-t border-border pb-4 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={dark ? "Light Mode" : "Dark Mode"}
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
            >
              {dark ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
              <span className="group-data-[collapsible=icon]:hidden">
                {dark ? "Light Mode" : "Dark Mode"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
