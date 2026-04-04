import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
} from "../controllers/CourseController.js";

import { validateCreateCourse } from "../middleware/validateCourse.middleware.js";

const router = express.Router();

/* ===================== USER ROUTES ===================== */

// User course detail page
router.get("/slug/:slug", getCourseBySlug);

// Listing (User + Admin)
router.get("/", getAllCourses);

/* ===================== ADMIN ROUTES ===================== */

// CREATE (Full validation)
router.post("/", validateCreateCourse, createCourse);

// UPDATE (NO validation middleware)
router.put("/:id", updateCourse);

// DELETE
router.delete("/:id", deleteCourse);

// GET BY ID (Admin edit page)
router.get("/:id", getCourseById);

export default router;
