import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createInstitute,
  getInstitutes,
  getInstituteById,
  updateInstitute,
  deleteInstitute,
  getInstituteBySlug,
} from "../controllers/instituteController.js";

const router = express.Router();

// ✅ PUBLIC ROUTES
router.get("/", getInstitutes);
router.get("/slug/:slug", getInstituteBySlug);
router.get("/:id", getInstituteById);

// 🔐 PROTECTED ROUTES (ADMIN)
router.post("/", auth, createInstitute);
router.put("/:id", auth, updateInstitute);
router.delete("/:id", auth, deleteInstitute);

export default router;
