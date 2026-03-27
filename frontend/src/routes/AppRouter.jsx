import { Route, Routes, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import { LoginCardPage } from "../features/auth/pages/LoginCardPage";
import { RegisterCardPage } from "../features/auth/pages/RegisterCardPage";
import ProtectedWrapper from "../features/auth/components/ProtectedWrapper";
import ReportDetailPage from "@/features/myReport/pages/ReportDetailPage";
import NewAnalysisPage from "@/features/NewAnalysis/pages/NewAnalysisPage";
import HistoryPage from "@/features/History/pages/Historypage";
import HomePage from "@/pages/HomePage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />

      <Route path="/auth/login" element={<LoginCardPage />} />
      <Route path="/auth/register" element={<RegisterCardPage />} />

      {/* Protected routes — wrapped in AppLayout (sidebar + header) */}
      <Route
        element={
          <ProtectedWrapper>
            <AppLayout />
          </ProtectedWrapper>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Placeholder routes — add pages here as you build them */}
        <Route path="/analysis/new" element={<NewAnalysisPage />} />
        <Route path="/reports/:id" element={<ReportDetailPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
