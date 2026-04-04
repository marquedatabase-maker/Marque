import { Course } from "../models/CourseModel.js";

export const createCourse = async (req, res) => {
  console.log("createCourse called");

  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      message: "Course created (Draft)",
      data: course,
    });
  } catch (error) {
    console.error("Error in createCourse:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create course",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const { category, search, published } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (published === "true") filter.isPublished = true;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error("Get All Courses Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    console.error("Get Course By ID Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      isPublished: true,
    });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    console.error("Get Course By Slug Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      message: "Course updated",
      data: course,
    });
  } catch (error) {
    console.error("Update Course Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("Delete Course Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
