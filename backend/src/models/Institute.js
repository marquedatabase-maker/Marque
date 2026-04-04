

import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    estYear: Number,

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Government", "Private", "Deemed"],
      required: true,
    },

    /* ================= FILTER FIELDS ================= */
    stream: {
      type: [String],
      required: true,
    },

    courseGroup: {
      type: [String],
      required: true,
    },

    /* ================= SEARCHABLE FIELDS ================= */
    // text search ke liye
    searchText: {
      type: String,
    },

    /* ================= ACADEMIC INFO ================= */
    examsAccepted: {
      type: [String],
      default: [],
    },

    totalCourses: {
      type: Number,
      default: 0,
    },

    ranking: String,

    syllabusPdf: {
      url: String,
    },

    aboutUniversity: String,

    keyHighlights: [String],

    /* ================= PLACEMENT INFO ================= */
    HighestPackage: Number,
    AveragePackage: Number,

    placementRate: Number,
    totalRecruiters: Number,

    dedicatedPlacementTeam: {
      type: Boolean,
      default: false,
    },

    topRecruiters: {
      type: [String],
      default: [],
    },

    placementHighlights: [String],

    /* ================= MEDIA ================= */
    image: {
      url: String,
    },

    collegeLogo: {
      url: String,
    },

    gallery: [String],

    brochure: {
      url: String,
    },

    /* ================= FAQ ================= */
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    applyLink: String,
  },
  { timestamps: true },
);

/* ================= INDEXES ================= */
instituteSchema.index({ state: 1 });
instituteSchema.index({ stream: 1 });
instituteSchema.index({ courseGroup: 1 });

// Text search index (name + city + state + shortDescription)
instituteSchema.index({
  name: "text",
  city: "text",
  state: "text",
  shortDescription: "text",
});

export default mongoose.model("Institute", instituteSchema);
