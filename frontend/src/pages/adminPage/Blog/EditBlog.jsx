

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../Services/api";

/* ================= STYLES ================= */
const sectionClass =
  "bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm";
const inputClass =
  "w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500";

const CATEGORIES = ["Exam News", "Technology", "Campus Life", "Placements"];

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    tags: "",
    status: "Draft",
    publishDate: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "", // URL
  });

  const [imageFile, setImageFile] = useState(null); // gallery image
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/blog/admin/${id}`, {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });

        const blog = res.data.blog;

        if (blog) {
          setFormData({
            title: blog.title || "",
            slug: blog.slug || "",
            content: blog.content || "",
            category: blog.category || "",
            tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
            status: blog.status || "Draft",
            publishDate: blog.publishDate || "",
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            featuredImage: blog.featuredImage || "",
          });

          setImagePreview(blog.featuredImage || "");
        }
      } catch (err) {
        console.error(
          "Fetch error:",
          err.response?.status,
          err.response?.data || err,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE BLOG ================= */
  const handleSubmit = async (e, publish = true) => {
    e.preventDefault();
    setSaving(true);

    try {
      let payload;
      let headers = {};

      // 🔥 IF IMAGE FILE SELECTED → FormData
      if (imageFile) {
        payload = new FormData();

        Object.keys(formData).forEach((key) => {
          payload.append(key, formData[key]);
        });

        payload.append("status", publish ? "Published" : "Draft");
        payload.append("featuredImage", imageFile);

        headers = { "Content-Type": "multipart/form-data" };
      }
      // 🔥 NO IMAGE FILE → NORMAL JSON
      else {
        payload = {
          ...formData,
          status: publish ? "Published" : "Draft",
        };
      }

      await api.put(`/blog/${id}`, payload,
        {headers: { Authorization: localStorage.getItem("adminToken") }}
      );

      // ✅ SUCCESS → BLOG LIST
      navigate("/admin/blog");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err);
      alert("Update failed. Please check backend.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center font-bold">Loading Blog...</div>;
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:flex">
        <div className="w-full r p-4 sm:p-6 pb-32">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B1C33]">
                Edit Blog
              </h1>
              <p className="text-xs text-slate-500">Blogs / Edit</p>
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
                disabled={saving}
                className="px-6 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-bold disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Post"}
              </button>
            </div>
          </div>

          <form>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">
                <div className={sectionClass}>
                  <label className="font-bold">Blog Title *</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <label className="font-bold mt-4 block">Slug</label>
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <label className="font-bold mt-4 block">Content</label>
                  <textarea
                    name="content"
                    rows={12}
                    value={formData.content}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className={sectionClass}>
                  <h3 className="font-bold mb-4">SEO Settings</h3>

                  <label className="font-bold">Meta Title</label>
                  <input
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <label className="font-bold mt-4 block">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    rows={3}
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* FEATURED IMAGE */}
                <div className={sectionClass}>
                  <h3 className="font-bold mb-3">Featured Image</h3>

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}

                  {/* Upload from gallery */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-3"
                  />

                  {/* OR Image URL */}
                  <input
                    name="featuredImage"
                    placeholder="Or paste image URL"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* STATUS */}
                <div className={sectionClass}>
                  <label className="font-bold">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>

                {/* CATEGORY */}
                <div className={sectionClass}>
                  <label className="font-bold">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
