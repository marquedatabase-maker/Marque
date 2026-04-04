// src/models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    excerpt: { type: String },        // 🔥 REQUIRED FOR LIST PAGE
    content: { type: String },        // 🔥 FULL HTML CONTENT

    category: { type: String, index: true },
    tags: [{ type: String, index: true }],

    featuredImage: String,             // 🔥 frontend uses this

    author: { type: String, default: "Admin" },
    readTime: String,

    metaTitle: String,
    metaDescription: String,

    status: {
      type: String,
      enum: ["Draft", "Published", "Pending"],
      default: "Draft",
      index: true,
    },

    publishDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);



