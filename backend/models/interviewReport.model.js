const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide question"],
    },
    answer: {
      type: String,
      required: [true, "Please provide answer"],
    },
    intention: {
      type: String,
      required: [true, "Please provide intention"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide question"],
    },
    answer: {
      type: String,
      required: [true, "Please provide answer"],
    },
    intention: {
      type: String,
      required: [true, "Please provide intention"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Please provide skill"],
    },
    severity: {
      type: String,
      enum: ["high", "medium", "low"],
      required: [true, "Please provide severity"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Please provide day"],
    },
    focus: {
      type: String,
      required: [true, "Please provide focus"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Please provide tasks"],
      },
    ],
  },
  {
    _id: false,
  },
);

const interviewReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
  },
  jobDescription: {
    type: String,
    required: [true, "Please provide job description"],
  },
  resume: {
    type: String,
    // required: [true,"Please provide resume"]
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
});

const InterviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);
module.exports = InterviewReportModel;
