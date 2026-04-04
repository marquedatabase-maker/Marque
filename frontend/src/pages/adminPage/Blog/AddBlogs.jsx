import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/api";

import "@fortawesome/fontawesome-free/css/all.min.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",

    status: "Draft",
    publishDate: "",

    category: "Exam News",
    tags: "",

    metaTitle: "",
    metaDescription: "",

    featuredImage: "",
    imageUrl: "",
  });

  // 🔥 ADDED (gallery upload support)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  /* ================= CONSTANT DATA ================= */
  const CATEGORIES = [
    "Exam News",
    "Career Advice",
    "College Life",
    "Study Tips",
    "Technology",
  ];

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADDED
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e, publish = true) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let payload;
      let headers = {
        Authorization: localStorage.getItem("adminToken"),
      };

      // 🔥 ADDED: if image selected → FormData
      if (imageFile) {
        payload = new FormData();

        Object.keys(form).forEach((key) => {
          payload.append(key, form[key]);
        });

        payload.append("status", publish ? "Published" : "Draft");
        payload.append("featuredImage", imageFile);

        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = {
          ...form,
          status: publish ? "Published" : "Draft",
        };
      }

      await api.post("/blog", payload, { headers });

      setMessage("✅ Blog published successfully");
      setTimeout(() => navigate("/admin/blog"), 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Failed to publish blog"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= STYLES ================= */
  const sectionClass =
    "bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm";
  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm";

  return (
    <div className="flex bg-slate-50 min-h-screen">
     

      <div className="w-full  p-6 pb-32">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1C33]">
              Write New Blog
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Blogs / Create
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/blog")}
              className="px-4 py-2 border rounded-lg text-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e, true)}
              className="px-6 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-bold"
            >
              Publish Post
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-slate-100 font-bold">
            {message}
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, true)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <div className={sectionClass}>
                <label className="block font-bold mb-2">
                  Blog Title *
                </label>
                <input
                  name="title"
                  placeholder="e.g. 5 Tips to Crack JEE Main 2026"
                  onChange={handleChange}
                  className={inputClass}
                  required
                />

                <label className="block font-bold mt-5 mb-2">
                  Slug (URL) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    domain.com/blog/
                  </span>
                  <input
                    name="slug"
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <label className="block font-bold mt-6 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  rows={14}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Start writing your article..."
                />
              </div>

              {/* SEO */}
              <div className={sectionClass}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                  SEO Settings
                </h3>

                <label className="block font-bold mb-2">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  onChange={handleChange}
                  className={inputClass}
                />

                <label className="block font-bold mt-4 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows={3}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* PUBLISH */}
              <div className={sectionClass}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-globe text-slate-400"></i>
                  Publish
                </h3>

                <label className="block font-bold mb-2">
                  Status
                </label>
                <select
                  name="status"
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Pending</option>
                </select>

                <label className="block font-bold mt-4 mb-2">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  name="publishDate"
                  onChange={handleChange}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  className="mt-4 w-full py-2 border rounded-lg font-bold text-sm"
                >
                  Save as Draft
                </button>
              </div>

              {/* ORGANIZATION */}
              <div className={sectionClass}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-slate-400"></i>
                  Organization
                </h3>

                <label className="block font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <label className="block font-bold mt-4 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="JEE, Engineering, Tips"
                />
              </div>

              {/* FEATURED IMAGE */}
              <div className={sectionClass}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-image text-slate-400"></i>
                  Featured Image
                </h3>

                {/* 🔥 ADDED: preview */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}

                {/* 🔥 ADDED: gallery upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-3"
                />

                {/* EXISTING IMAGE URL INPUT (UNCHANGED) */}
                <input
                  name="featuredImage"
                  placeholder="Image URL"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* FOOTER ACTION BAR */}
          <div className="fixed bottom-0 right-0 w-full lg:w-[calc(100%-260px)] bg-white border-t p-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-red-600 text-white font-bold rounded"
            >
              {loading ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
