const express = require("express");
const { authMiddleware } = require("../middleware/user.middleware");
const { generateInterviewReportController } = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");
const router = express.Router();


/**
 * @route POST /api/interview/
 * @description Generate new interview report on the basis of user resume pdf , selfdescription and job description
 * @access Private
 */

router.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)

module.exports = router;
