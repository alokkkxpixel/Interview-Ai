const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const connectToDB = require("./db/db.js");
const cors = require("cors");
const app = express();

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

// 👉 User register route here
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
