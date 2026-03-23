import { useContext } from "react";
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/api.interview";
import { InterviewReportContext } from "../context/InterviewReportContext";


export const useInterview = () => {
    const context = useContext(InterviewReportContext);


    if (!context) {
        throw new Error("useInterview must be used inside InterviewReportProvider");
    }

    const { reports, setReports, loading, setLoading } = context;


    const handleGenerateInterviewReport = async (data) => {
        try {
            setLoading(true);
            const response = await generateInterviewReport(data);
            setReports(response.interviewReports);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetAllInterviewReports = async () => {
        try {
            setLoading(true);
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);

            return response.interviewReports;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetInterviewReportById = async (id) => {
        try {
            setLoading(true);
            const response = await getInterviewReportById(id);
            // setReports(response.interviewReports);
            return response.interviewReport;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        reports,
        loading,
        setLoading,
        setReports,
        handleGenerateInterviewReport,
        handleGetAllInterviewReports,
        handleGetInterviewReportById,
    };
}