import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { InterviewReportProvider } from "@/features/context/InterviewReportContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function ProviderWrapper({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster />
          <InterviewReportProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </InterviewReportProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default ProviderWrapper;
