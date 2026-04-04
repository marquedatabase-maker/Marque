import Blog from "../models/Blog.js";
import slugify from "slugify";

/* ============ CREATE BLOG ============ */
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      readTime,
      author,
    } = req.body;

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      readTime,
      author,
      // Handle image from Multer (file) or plain URL string
      featuredImage: req.file ? req.file.path : req.body.featuredImage,
      publishDate: status === "Published" ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getBlogByIdAdmin = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.json({
    success: true,
    blog,
  });
};

/* ============ GET ALL BLOGS ============ */
export const getAllBlogs = async (req, res) => {
  try {
    const { q, category, tag } = req.query;

    // Base filter
    const query = { status: "Published" };

    if (category) query.category = category;
    if (tag) query.tags = tag;

    // Search logic (safe regex)
    if (q) {
      const safeSearch = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(safeSearch, "i");

      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { category: searchRegex },
        { tags: searchRegex },
      ];
    }

    const blogs = await Blog.find(query).sort({ publishDate: -1 });

    res.json({
      success: true,
      blogs,
      total: blogs.length,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
    });
  }
};

/* ============ GET SINGLE BLOG ============ */
/* ============ GET SINGLE BLOG (BY ID) ============ */
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get Blog By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Invalid blog ID or server error",
    });
  }
};

/* ============ UPDATE BLOG ============ */
export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Update slug if title is changed
    if (req.body.title) {
      updateData.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    // Image Handling (File upload takes priority over URL string)
    if (req.file) {
      updateData.featuredImage = req.file.path;
    } else if (req.body.featuredImage) {
      updateData.featuredImage = req.body.featuredImage;
    }

    // Update publishDate if status changes to Published
    if (req.body.status === "Published") {
      updateData.publishDate = new Date();
    }

    // Prevent empty updates
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog already deleted or not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// getallblofadmin

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { q, category, status } = req.query;

    const query = {}; // ✅ no status restriction

    if (status && status !== "all") {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (q) {
      const safeSearch = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safeSearch, "i");

      query.$or = [
        { title: regex },
        { excerpt: regex },
        { category: regex },
        { tags: regex },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Admin Blog Fetch Error", error);
    res.status(500).json({ success: false });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "Published",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Slug fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};