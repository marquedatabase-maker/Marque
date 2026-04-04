import mongoose from "mongoose";
import slugify from "slugify";

/* ---------- FAQ SUB-SCHEMA ---------- */
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

/* ---------- HIGHLIGHT SUB-SCHEMA ---------- */
const highlightSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
});

/* ---------- MAIN COURSE SCHEMA ---------- */
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    level: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    aboutCourse: {
      type: String,
      required: true,
    },

    shortAbout: {
      type: String,
      required: true,
      maxlength: 300,
    },

    heroImage: {
      type: String,
      required: true,
    },

    syllabusPdf: {
      type: String,
    },

    brochurePdf: {
      type: String,
    },

    highlights: {
      type: [highlightSchema],
      default: [],
    },

    faqs: {
      type: [faqSchema],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: false, // draft by default
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ---------- AUTO SLUG (DUPLICATE SAFE) ---------- */
courseSchema.pre("save", async function () {
  if (!this.slug && this.title) {
    const baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let count = 1;

    // Ensure unique slug
    while (await mongoose.models.Course.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
});

/* ---------- MODEL EXPORT ---------- */
export const Course = mongoose.model("Course", courseSchema);
