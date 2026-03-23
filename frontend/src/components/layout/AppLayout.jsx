import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Outlet } from "react-router-dom";

// TODO: replace with real user from auth context
const mockUser = {
  username: "Alok",
  email: "alok@example.com",
  avatar: null,
};

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar */}
        <AppSidebar user={mockUser} />

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader user={mockUser} />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-3 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
