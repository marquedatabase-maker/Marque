import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String },
    mode: { type: String },
    frequency: { type: String },
    duration: { type: String },
    collegesCount: { type: String },

    aboutSection: {
      title: { type: String },
      keyPoints: [{ type: String }],
      note: { type: String },
    },

    // UI dynamic sections
    updates: [{ type: { type: String }, text: String }],
    structure: [{ feature: String, col1: String, col2: String }],
    faqs: [{ q: String, a: String }],
    importantDates: [{ event: String, date: String }],

    // Eligibility
    eligibilityTitle1: String,
    eligibilityPoints1: String,
    eligibilityTitle2: String,
    eligibilityPoints2: String,

    heroImage: String,
    brochureUrl: String,

    // Production Logic Fields
    category: { type: String, required: true, lowercase: true }, // e.g., 'engineering'
    isPublished: { type: Boolean, default: false }, // Draft = false, Published = true
  },
  { timestamps: true },
);

// Search optimization
examSchema.index({ name: "text", slug: "text", category: "text" });

export default mongoose.model("Exam", examSchema);
