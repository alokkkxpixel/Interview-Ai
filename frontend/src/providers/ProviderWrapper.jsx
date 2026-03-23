

import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { InterviewReportProvider } from '@/features/context/InterviewReportContext'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

function ProviderWrapper({ children }) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <InterviewReportProvider>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </InterviewReportProvider>
            </AuthProvider>
        </BrowserRouter>


    )
}

export default ProviderWrapper