import express from "express";
import {
  submitAdmission,
  getAdmissions,
  getAllAdmissions
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/submit-form", submitAdmission);
router.get("/get-admissions", getAdmissions);
router.get("/get-all-admissions", getAllAdmissions);

export default router;
