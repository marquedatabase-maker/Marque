import express from "express";
import {
  saveExam,
  getExams,
  getExamById,
  getExamBySlug,
  updateExamStatus,
  deleteExam,
} from "../controllers/examController.js";

const router = express.Router();

// Public Routes
router.get("/", getExams);

// ⚠️ CRITICAL: /slug/:slug MUST be ABOVE /:id
// Otherwise Express will treat "slug" as an :id param
router.get("/slug/:slug", getExamBySlug);
router.get("/:id", getExamById);

// Admin Routes
router.post("/", saveExam);
router.patch("/:id/status", updateExamStatus);
router.delete("/:id", deleteExam);

export default router;
