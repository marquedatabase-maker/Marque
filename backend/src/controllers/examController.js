import Exam from "../models/ExamModel.js";

// 🟢 SAVE EXAM (Create & Update in One)
export const saveExam = async (req, res) => {
  try {
    const { _id, slug, status, name, category } = req.body;

    if (!_id && (!name || !slug || !category)) {
      return res.status(400).json({
        success: false,
        message: "Name, Slug aur Category required hain",
      });
    }

    const isPublished = status === "published";
    const filter = _id ? { _id } : { slug: slug.toLowerCase().trim() };

    const updatedExam = await Exam.findOneAndUpdate(
      filter,
      { ...req.body, isPublished },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: isPublished ? "Exam Published!" : "Draft Saved!",
      data: updatedExam,
    });
  } catch (error) {
    console.error("saveExam Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL EXAMS
export const getExams = async (req, res) => {
  try {
    const { search, category, isAdmin } = req.query;

    let query = isAdmin === "true" ? {} : { isPublished: true };

    if (category && category !== "all") query.category = category;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const exams = await Exam.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: exams.length, exams });
  } catch (error) {
    console.error("getExams Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET SINGLE EXAM BY ID
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }
    res.status(200).json({ success: true, exam });
  } catch (error) {
    console.error("getExamById Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE EXAM BY SLUG
export const getExamBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const exam = await Exam.findOne({ slug: slug.toLowerCase().trim() });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Is slug ka koi exam nahi mila.",
      });
    }

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    console.error("getExamBySlug Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE EXAM STATUS (Publish / Unpublish)
export const updateExamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["published", "draft"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status required: 'published' ya 'draft'",
      });
    }

    const isPublished = status === "published";
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true },
    );

    if (!updatedExam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    res.status(200).json({
      success: true,
      message: isPublished ? "Exam Published!" : "Exam moved to Draft",
      data: updatedExam,
    });
  } catch (error) {
    console.error("updateExamStatus Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE EXAM
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    console.error("deleteExam Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
