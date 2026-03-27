const express = require("express");
const { authMiddleware } = require("../middleware/user.middleware");
const { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController, generateResumeController } = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");
const router = express.Router();


/**
 * @route POST /api/interview/
 * @description Generate new interview report on the basis of user resume pdf , selfdescription and job description
 * @access Private
 */

router.post("/", authMiddleware, upload.single("uploadedFile"), generateInterviewReportController)

/**
 * @route GET /api/interview/
 * @description Get all interview reports of the user
 * @access Private
 */
router.get("/", authMiddleware, getAllInterviewReportsController)


/**
 * @route GET /api/interview/:id
 * @description Get interview report by id
 * @access Private
 */
router.get("/:id", authMiddleware, getInterviewReportByIdController)


/**
 * @route POST /api/interview/generate-resume/:interviewReportId
 * @description Generate resume for the user on the basis of interview report
 * @access Private
 */
router.post("/generate-resume/:interviewReportId",authMiddleware,generateResumeController)

module.exports = router;
