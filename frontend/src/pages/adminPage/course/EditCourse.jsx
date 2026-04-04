import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Plus, Trash2, Loader2, BookOpen } from "lucide-react";
import { getCourseById, updateCourse } from "../../../Services/api.js";

const INITIAL_FORM = {
  title: "",
  subtitle: "",
  category: "",
  level: "",
  duration: "",
  aboutCourse: "",
  shortAbout: "",
  heroImage: "",
  syllabusPdf: "",
  brochurePdf: "",
  highlights: [],
  faqs: [],
};

const Field = ({ label, required, children, hint }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
  </div>
);

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33] focus:bg-white transition-colors";

const SectionCard = ({ title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
      {title}
    </h2>
    <div className="space-y-5">{children}</div>
  </div>
);

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Existing course data fetch karo
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(id);
        const data = res.data.data;
        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          category: data.category || "",
          level: data.level || "",
          duration: data.duration || "",
          aboutCourse: data.aboutCourse || "",
          shortAbout: data.shortAbout || "",
          heroImage: data.heroImage || "",
          syllabusPdf: data.syllabusPdf || "",
          brochurePdf: data.brochurePdf || "",
          highlights: data.highlights || [],
          faqs: data.faqs || [],
        });
      } catch (err) {
        setError("Course data load karne mein error aaya.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Highlights
  const addHighlight = () =>
    setForm((p) => ({
      ...p,
      highlights: [...p.highlights, { label: "", value: "" }],
    }));
  const updateHighlight = (i, field, val) =>
    setForm((p) => {
      const arr = [...p.highlights];
      arr[i] = { ...arr[i], [field]: val };
      return { ...p, highlights: arr };
    });
  const removeHighlight = (i) =>
    setForm((p) => ({
      ...p,
      highlights: p.highlights.filter((_, idx) => idx !== i),
    }));

  // FAQs
  const addFaq = () =>
    setForm((p) => ({ ...p, faqs: [...p.faqs, { question: "", answer: "" }] }));
  const updateFaq = (i, field, val) =>
    setForm((p) => {
      const arr = [...p.faqs];
      arr[i] = { ...arr[i], [field]: val };
      return { ...p, faqs: arr };
    });
  const removeFaq = (i) =>
    setForm((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateCourse(id, form);
      setSuccess("Course successfully update ho gaya!");
      setTimeout(() => navigate("/admin/course"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Update karne mein error aaya.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center gap-3 text-slate-500">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Course data load ho raha hai...</span>
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={() => navigate("/admin/course")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={14} /> Wapas Courses List par Jao
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/admin/course")}
              className="mb-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft size={14} /> Wapas Courses List par
            </button>
            <h1 className="text-2xl font-bold text-[#0B1C33]">Edit Course</h1>
            <p className="text-xs text-slate-400 mt-0.5">ID: {id}</p>
          </div>
          <BookOpen size={28} className="text-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Basic Info */}
          <SectionCard title="Basic Information">
            <Field label="Course Title" required>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Master of Business Administration"
                className={inputCls}
              />
            </Field>
            <Field label="Subtitle">
              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="e.g. A complete guide to modern business"
                className={inputCls}
              />
            </Field>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Category" required>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Engineering, Law, Python"
                  className={inputCls}
                />
              </Field>
              <Field label="Level" required>
                <input
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Undergraduate, Postgraduate, Beginner"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Duration" required>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                placeholder="e.g. 6 months, 1 year, 40 hours"
                className={inputCls}
              />
            </Field>
          </SectionCard>

          {/* SECTION 2: Description */}
          <SectionCard title="Description">
            <Field
              label="Short About"
              required
              hint="Max 300 characters — listing cards mein dikhega"
            >
              <textarea
                name="shortAbout"
                value={form.shortAbout}
                onChange={handleChange}
                required
                maxLength={300}
                rows={3}
                placeholder="Brief course description..."
                className={inputCls}
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {form.shortAbout.length}/300
              </p>
            </Field>
            <Field label="About Course (Full Detail)" required>
              <textarea
                name="aboutCourse"
                value={form.aboutCourse}
                onChange={handleChange}
                required
                rows={8}
                placeholder="Complete course details..."
                className={inputCls}
              />
            </Field>
          </SectionCard>

          {/* SECTION 3: Media */}
          <SectionCard title="Media & Documents">
            <Field label="Hero Image URL" required>
              <input
                name="heroImage"
                value={form.heroImage}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
                className={inputCls}
              />
            </Field>
            {form.heroImage && (
              <img
                src={form.heroImage}
                alt="Preview"
                className="h-32 w-auto rounded-lg border border-slate-200 object-cover mt-2"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Syllabus PDF URL">
                <input
                  name="syllabusPdf"
                  value={form.syllabusPdf}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputCls}
                />
              </Field>
              <Field label="Brochure PDF URL">
                <input
                  name="brochurePdf"
                  value={form.brochurePdf}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputCls}
                />
              </Field>
            </div>
          </SectionCard>

          {/* SECTION 4: Highlights */}
          <SectionCard title="Course Highlights">
            {form.highlights.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-2">
                Koi highlight nahi. Neeche se add karo.
              </p>
            )}
            {form.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  value={h.label}
                  onChange={(e) => updateHighlight(i, "label", e.target.value)}
                  placeholder="Label (e.g. Mode)"
                  className={`${inputCls} flex-1`}
                />
                <input
                  value={h.value}
                  onChange={(e) => updateHighlight(i, "value", e.target.value)}
                  placeholder="Value (e.g. Online)"
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-500 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <Plus size={15} /> Highlight Add Karo
            </button>
          </SectionCard>

          {/* SECTION 5: FAQs */}
          <SectionCard title="FAQs">
            {form.faqs.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-2">
                Koi FAQ nahi. Neeche se add karo.
              </p>
            )}
            {form.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 p-4 space-y-3 bg-slate-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    FAQ #{i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    className="p-1 text-red-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                  placeholder="Question likho..."
                  className={inputCls}
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  placeholder="Answer likho..."
                  rows={3}
                  className={inputCls}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-500 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <Plus size={15} /> FAQ Add Karo
            </button>
          </SectionCard>

          {/* Messages */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600 font-medium">
              {success}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pb-10">
            <button
              type="button"
              onClick={() => navigate("/admin/course")}
              className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#0B1C33] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1a3050] transition-colors disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Save ho raha hai..." : "Changes Save Karo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
