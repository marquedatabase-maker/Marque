import React, { useState } from "react";
import { createCourse, updateCourse } from "../../../Services/api.js";

import {
  Save,
  Plus,
  Trash2,
  X,
  Type,
  Tag,
  FileText,
  Clock,
  Layers,
  Image as ImageIcon,
  FilePen,
  Send,
} from "lucide-react";

// --- INITIAL EMPTY STATE ---
const initialCourseState = {
  courseName: "",
  subtitle: "",
  category: "",
  level: "",
  duration: "",
  description: "",
  shortAbout: "",
  heroImage: "",
  syllabusPdf: "",
  brochurePdf: "",
  highlights: [{ key: "", value: "" }],
  faqs: [{ q: "", a: "" }],
};

const AddCourse = ({ onBack }) => {
  const [courseId, setCourseId] = useState(null);
  const [courseData, setCourseData] = useState(initialCourseState);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (index, field, value) => {
    const updated = [...courseData.highlights];
    updated[index][field] = value;
    setCourseData((prev) => ({ ...prev, highlights: updated }));
  };

  const addHighlight = () => {
    setCourseData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { key: "", value: "" }],
    }));
  };

  const removeHighlight = (index) => {
    const updated = courseData.highlights.filter((_, i) => i !== index);
    setCourseData((prev) => ({ ...prev, highlights: updated }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...courseData.faqs];
    updated[index][field] = value;
    setCourseData((prev) => ({ ...prev, faqs: updated }));
  };

  const addFaq = () => {
    setCourseData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: "", a: "" }],
    }));
  };

  const removeFaq = (index) => {
    const updated = courseData.faqs.filter((_, i) => i !== index);
    setCourseData((prev) => ({ ...prev, faqs: updated }));
  };

  // --- ✅ NEW VALIDATION FUNCTION ---
  const validateForm = () => {
    const errors = [];
    if (!courseData.courseName.trim()) errors.push("Course Title");
    if (!courseData.category.trim()) errors.push("Category");
    if (!courseData.level.trim()) errors.push("Level");
    if (!courseData.duration.trim()) errors.push("Duration");

    // Aap aur bhi fields add kar sakte hain jo mandatory hon

    return errors;
  };

  // --- SAVE HANDLER (Draft / Publish) ---
  const handleSave = async (isPublished) => {
    // ✅ STEP 1: VALIDATION CHECK (Sirf Publish karte waqt check karein, ya Draft me bhi, apki marzi)
    // Agar aap chahte hain ki Draft me bhi naam hona zaruri hai, toh is condition ko remove kar dein.
    if (isPublished) {
      const missingFields = validateForm();
      if (missingFields.length > 0) {
        alert(
          `Please fill the required fields: \n- ${missingFields.join("\n- ")}`,
        );
        return; // 🛑 YAHAN RETURN KAR DIYA - Code aage nahi jayega, form clear nahi hoga.
      }
    } else {
      // Draft ke liye kam se kam Title hona chahiye
      if (!courseData.courseName.trim()) {
        alert("Course Title is required to save a draft.");
        return;
      }
    }

    try {
      const payload = {
        title: courseData.courseName,
        subtitle: courseData.subtitle,
        category: courseData.category,
        level: courseData.level,
        duration: courseData.duration,
        aboutCourse: courseData.description,
        shortAbout: courseData.shortAbout,
        heroImage: courseData.heroImage,
        syllabusPdf: courseData.syllabusPdf,
        brochurePdf: courseData.brochurePdf,
        isPublished,
        highlights: courseData.highlights.map((item) => ({
          label: item.key,
          value: item.value,
        })),
        faqs: courseData.faqs.map((item) => ({
          question: item.q,
          answer: item.a,
        })),
      };

      let res;
      if (courseId) {
        res = await updateCourse(courseId, payload);
      } else {
        res = await createCourse(payload);
        // setCourseId(res.data.data._id); // Agar form clear karna hai to ID set karne ki zarurat nahi
      }

      alert(
        isPublished
          ? "Course Published Successfully!"
          : "Draft Saved Successfully!",
      );

      // ✅ STEP 2: CLEAR FORM ONLY ON SUCCESS
      // Agar yahan tak code pohancha, matlab backend save ho gaya hai. Ab form clear karo.
      setCourseData(initialCourseState);
      setCourseId(null);

      // onBack?.(); // Uncomment if you want to go back to list automatically
    } catch (error) {
      console.error("Save Error:", error);
      // Agar backend se error aya, toh alert dikhao, par form clear mat karo
      alert(
        error.response?.data?.message ||
          "Something went wrong. Data not saved.",
      );
    }
  };

  // --- UI CLASSES ---
  const ui = {
    input:
      "w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm text-slate-700 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 outline-none transition-all placeholder:text-slate-400 font-medium",
    label:
      "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5",
    card: "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
    cardHeader:
      "px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-white",
    cardTitle: "font-bold text-slate-800 text-base",
  };

  return (
    <div className="bg-[#F8FAFC] font-sans text-slate-800 w-full animate-fade-in ">
      {/* --- HEADER --- */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Course Manager
          </p>
          <h2 className="font-bold text-slate-800 text-xl">
            {courseData.courseName ? (
              <>
                Edit{" "}
                <span className="text-red-600">{courseData.courseName}</span>
              </>
            ) : (
              "Add New Course"
            )}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="hidden xl:block text-sm font-bold text-slate-500 hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Discard
          </button>

          <button
            onClick={() => handleSave(false)}
            className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-2"
          >
            <FilePen size={18} />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            onClick={() => handleSave(true)}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/30 transition-all flex items-center gap-2 active:scale-95"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Save & Publish</span>
          </button>
        </div>
      </header>

      {/* --- FORM BODY --- */}
      <div className="p-6 lg:p-10 max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          {/* Primary Details */}
          <div className={ui.card}>
            <div className={ui.cardHeader}>
              <h3 className={ui.cardTitle}>Course Details</h3>
            </div>
            <div className="p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={ui.label}>
                    <Type size={14} /> Course Title{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={courseData.courseName}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="e.g. Bachelor of Technology"
                  />
                </div>
                <div>
                  <label className={ui.label}>
                    <Type size={14} /> Subtitle (Specialization)
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={courseData.subtitle}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={ui.label}>
                    <Tag size={14} /> Category{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="e.g. Engineering"
                  />
                </div>
                <div>
                  <label className={ui.label}>
                    <Layers size={14} /> Level{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="level"
                    value={courseData.level}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="e.g. Undergraduate"
                  />
                </div>
                <div>
                  <label className={ui.label}>
                    <Clock size={14} /> Duration{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={courseData.duration}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="e.g. 4 Years"
                  />
                </div>
              </div>

              <div>
                <label className={ui.label}>
                  <FileText size={14} /> Full Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  className={`${ui.input} resize-none leading-relaxed`}
                  value={courseData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed course description here..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Visual Assets */}
          <div className={ui.card}>
            <div className={ui.cardHeader}>
              <h3 className={ui.cardTitle}>Visual Assets</h3>
            </div>
            <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={ui.label}>
                  <ImageIcon size={14} /> Hero Image URL
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                    {courseData.heroImage ? (
                      <img
                        src={courseData.heroImage}
                        className="w-full h-full object-cover"
                        alt="preview"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                  </div>
                  <input
                    type="url"
                    name="heroImage"
                    value={courseData.heroImage}
                    onChange={handleChange}
                    className={ui.input}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div>
                <label className={ui.label}>
                  <FileText size={14} /> Syllabus PDF Link
                </label>
                <input
                  type="url"
                  name="syllabusPdf"
                  value={courseData.syllabusPdf}
                  onChange={handleChange}
                  className={ui.input}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={ui.label}>
                  <FileText size={14} /> Brochure PDF Link
                </label>
                <input
                  type="url"
                  name="brochurePdf"
                  value={courseData.brochurePdf}
                  onChange={handleChange}
                  className={ui.input}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className={ui.card}>
            <div className={ui.cardHeader}>
              <h3 className={ui.cardTitle}>Course Highlights</h3>
              <button
                onClick={addHighlight}
                className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Row
              </button>
            </div>
            <div className="p-6 lg:p-8">
              <div className="space-y-3">
                {courseData.highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 group">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={item.key}
                        onChange={(e) =>
                          handleHighlightChange(idx, "key", e.target.value)
                        }
                        className={`${ui.input} font-bold`}
                        placeholder="Label"
                      />
                    </div>
                    <div className="w-2/3 flex gap-3">
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          handleHighlightChange(idx, "value", e.target.value)
                        }
                        className={ui.input}
                        placeholder="Value"
                      />
                      {courseData.highlights.length > 1 && (
                        <button
                          onClick={() => removeHighlight(idx)}
                          className="text-slate-300 hover:text-red-500 transition-colors px-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className={`${ui.card} border-l-4 border-l-[#0B1C33]`}>
              <div className={ui.cardHeader}>
                <h3 className={ui.cardTitle}>Short About Course</h3>
              </div>
              <div className="p-6">
                <label className={ui.label}>Summary / Meta Desc</label>
                <textarea
                  name="shortAbout"
                  rows="4"
                  className={`${ui.input} text-xs leading-relaxed resize-none`}
                  value={courseData.shortAbout}
                  onChange={handleChange}
                  placeholder="Brief summary..."
                ></textarea>
                <p className="text-[10px] text-slate-400 mt-2 text-right">
                  {courseData.shortAbout.length} characters
                </p>
              </div>
            </div>

            <div className={ui.card}>
              <div className={ui.cardHeader}>
                <h3 className={ui.cardTitle}>FAQs</h3>
              </div>
              <div className="p-5 space-y-4">
                {courseData.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 relative group hover:bg-white hover:shadow-sm transition-all"
                  >
                    {courseData.faqs.length > 1 && (
                      <button
                        onClick={() => removeFaq(idx)}
                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) =>
                        handleFaqChange(idx, "q", e.target.value)
                      }
                      className="w-full bg-transparent font-bold text-xs text-slate-700 mb-2 focus:outline-none placeholder:text-slate-400"
                      placeholder="Question..."
                    />
                    <textarea
                      rows="2"
                      value={faq.a}
                      onChange={(e) =>
                        handleFaqChange(idx, "a", e.target.value)
                      }
                      className="w-full bg-transparent text-[11px] text-slate-500 resize-none focus:outline-none placeholder:text-slate-400"
                      placeholder="Answer..."
                    ></textarea>
                  </div>
                ))}
                <button
                  onClick={addFaq}
                  className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold rounded-xl hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all flex justify-center items-center gap-2"
                >
                  <Plus size={14} /> New Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
