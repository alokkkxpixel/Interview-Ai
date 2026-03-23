const pdfparse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription , targetRole} = req.body;
        const pdfBuffer = req.file.buffer;
        const pdfText = await (new pdfparse.PDFParse(Uint8Array.from(pdfBuffer))).getText();
        console.log(pdfText.text);
        const interviewReportByAi = await generateInterviewReport({ resume: pdfText.text, selfDescription, jobDescription });
        const interviewReport = await InterviewReportModel.create({
            userId: req.userId._id,
            jobDescription,
            resume: pdfText.text,
            selfDescription,
            title:targetRole,
            matchScore: interviewReportByAi.matchScore,
            technicalQuestions: interviewReportByAi.technicalQuestions,
            behavioralQuestions: interviewReportByAi.behavioralQuestions,
            skillGaps: interviewReportByAi.skillGaps,
            preparationPlan: interviewReportByAi.preparationPlan,
        });


        res.status(201).json({ message: "Interview report generated successfully", success: true, interviewReport });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReportModel.find({ userId: req.userId._id });
        res.status(200).json({ success: true, interviewReports });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const interviewReport = await InterviewReportModel.findById(req.params.id);
        res.status(200).json({ success: true, message: "Interview report fetched by id successfully", interviewReport });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController }