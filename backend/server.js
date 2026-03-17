const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const interviewRoutes = require("./routes/interview.routes.js");
const connectToDB = require("./db/db.js");
const cors = require("cors");
const app = express();
// const { generateInterviewReport } = require("./services/ai.service.js");

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

connectToDB(); // database connection
// invokeOpenAI();
// invokeGemini();
app.use(express.json());
app.use(cookieParser());
// console.log(process.env.MONGO_URI);

// all routes here , auth , interviews
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
