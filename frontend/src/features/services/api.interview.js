import axios from "axios";

export const apiInterview = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/interview`,
});

export const generateInterviewReport = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await apiInterview.post("/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllInterviewReports = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await apiInterview.get("/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getInterviewReportById = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await apiInterview.get(`/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const generateResume = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await apiInterview.post(`/generate-resume/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
    });
    return response.data;
};