import express from "express";
import auth from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogByIdAdmin,
  getAllBlogsAdmin,
  getBlogBySlug
} from "../controllers/blogControllers.js";

const router = express.Router();

/* ================= ADMIN ROUTES (MOST SPECIFIC FIRST) ================= */

// ✅ ADMIN – LIST ALL BLOGS (FIXED)
router.get("/admin/blogs", auth, getAllBlogsAdmin);

// ✅ ADMIN – GET SINGLE BLOG BY ID
router.get("/admin/:id", auth, getBlogByIdAdmin);

// ✅ ADMIN – CREATE / UPDATE / DELETE
router.post("/", auth, upload.single("featuredImage"), createBlog);
router.put("/:id", auth, upload.single("featuredImage"), updateBlog);
router.delete("/:id", auth, deleteBlog);

/* ================= PUBLIC ROUTES ================= */

// ✅ PUBLIC – ALL BLOGS
router.get("/", getAllBlogs);

// ✅ PUBLIC – SINGLE BLOG (ALWAYS LAST)
router.get("/slug/:slug", getBlogBySlug);

export default router;
