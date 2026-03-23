import { createContext, useContext, useState } from 'react';

export const InterviewReportContext = createContext(null);

export const InterviewReportProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);


    return (
        <InterviewReportContext.Provider value={{ reports, setReports, loading, setLoading }}>
            {children}
        </InterviewReportContext.Provider>
    );
};

