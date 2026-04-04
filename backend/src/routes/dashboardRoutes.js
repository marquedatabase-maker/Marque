import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/* =======================
   INLINE MODELS (SAFE)
======================= */

// USER MODEL
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

// INSTITUTE MODEL
const instituteSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    state: String,
    stream: [String],
    courseGroup: [String],
    createdAt: Date
  },
  { timestamps: true }
);

const Institute =
  mongoose.models.Institute ||
  mongoose.model("Institute", instituteSchema);

/* =======================
   DASHBOARD API
======================= */

router.get("/", async (req, res) => {
  try {
    /* ===== COUNTS ===== */
    const totalUsers = await User.countDocuments();
    const totalInstitutes = await Institute.countDocuments();

    // (Dummy – future me leads/blog models se connect kar sakte ho)
    const totalLeads = totalInstitutes * 3; // placeholder logic
    const blogPosts = 0;

    /* ===== LEAD TREND (Last 7 days) ===== */
    const leadTrend = [
      { day: "Mon", value: 12 },
      { day: "Tue", value: 18 },
      { day: "Wed", value: 10 },
      { day: "Thu", value: 22 },
      { day: "Fri", value: 16 },
      { day: "Sat", value: 9 },
      { day: "Sun", value: 14 }
    ];

    /* ===== TRAFFIC SOURCES ===== */
    const trafficSources = [
      { label: "Google", value: 55 },
      { label: "Direct", value: 30 },
      { label: "Social", value: 15 }
    ];

    /* ===== FINAL RESPONSE (FRONTEND MATCH) ===== */
    res.status(200).json({
      cards: {
        totalLeads,
        totalInstitutes,
        blogPosts,
        systemUsers: totalUsers
      },
      leadTrend,
      trafficSources
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Dashboard fetch failed"
    });
  }
});

export default router;
