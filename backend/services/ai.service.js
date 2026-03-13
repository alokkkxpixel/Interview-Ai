const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "the match score between 0 to 100 indicating how well the candidate's profile matchs the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The techincal question can be asked in the interview"),
        answer: z
          .string()
          .describe(
            "How you answer this question , what points to cover, what  approach you should take to answer this technical question",
          ),
        intention: z
          .string()
          .describe(
            "The intention of  interviewer behind asking this technical question",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and answer",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview"),
        answer: z
          .string()
          .describe(
            "How you answer this question , what points to cover, what  approach you should take to answer this behavioral question",
          ),
        intention: z
          .string()
          .describe(
            "The intention of  interviewer behind asking this behavioral question",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and answer",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("the skill which the candidate is lacking"),
        severity: z
          .enum(["high", "medium", "low"])
          .describe(
            "the severity of the skill gap, i.e. how important it is for the candidate to improve this skill",
          ),
      }),
    )
    .describe(
      "list of skill gaps that the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("the day number of the preparation plan"),
        focus: z.string().describe("the primary focus or topic for this day"),
        tasks: z
          .array(z.string().describe("a specific task to complete"))
          .describe("list of tasks to complete on this day"),
      }),
    )
    .describe(
      "a day-by-day preparation plan to help the candidate improve their skills",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "",
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  console.log(response.text);
}

module.exports = { invokeGemini };
