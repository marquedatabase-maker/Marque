import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import instituteRoutes from "./src/routes/instituteRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import admissionRoutes from "./src/routes/enquiryRoutes.js";
// pradeep
import courseRoutes from "./src/routes/CourseRoutes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
// pradeep exam
import examRoutes from "./src/routes/examRoutes.js"; // 1. Import Exam Routes

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admission", admissionRoutes);

// pradeep
app.use("/api/courses", courseRoutes);
//blog
app.use("/api/blog", blogRoutes);
app.use("/api/notification-list", notificationRoutes);
app.use("/api/notifications", notificationRoutes);


// pradeep
// 2. Register Exam Routes
app.use("/api/exams", examRoutes);

// ❗ ALWAYS LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
