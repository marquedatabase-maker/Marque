import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  FileText,
  Info,
  Trash2,
  GripVertical,
  HelpCircle,
  Image as ImageIcon,
  CheckCircle,
  Loader2,
  ArrowLeft,
  CircleHelp,
  Calendar,
  Send,
  FileDown,
  Wand2,
} from "lucide-react";

const API_BASE =import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialFormState = {
  name: "",
  slug: "",
  category: "engineering",
  description: "",
  mode: "Online (CBT)",
  frequency: "",
  duration: "",
  collegesCount: "",
  updates: [],
  structure: [],
  faqs: [],
  importantDates: [],
  eligibilityTitle1: "For JEE Main",
  eligibilityPoints1: "",
  eligibilityTitle2: "For JEE Advanced",
  eligibilityPoints2: "",
  heroImage: "",
  brochureUrl: "",
  aboutSection: {
    title: "",
    keyPoints: [""],
    note: "",
  },
};

const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AddExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: "", msg: "" });
  const [formData, setFormData] = useState(initialFormState);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (id) {
      setFetchLoading(true);
      setSlugManuallyEdited(true);
      axios
        .get(`${API_BASE}/api/exams/${id}`)
        .then((res) => {
          if (res.data.success && res.data.exam) {
            const exam = res.data.exam;
            setFormData({
              ...initialFormState,
              ...exam,
              updates: exam.updates || [],
              structure: exam.structure || [],
              faqs: exam.faqs || [],
              importantDates: exam.importantDates || [],
              aboutSection: exam.aboutSection || initialFormState.aboutSection,
            });
          } else {
            setSaveStatus({ type: "error", msg: "Exam data not found." });
          }
        })
        .catch((err) => {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Failed to load exam data.";
          setSaveStatus({ type: "error", msg });
        })
        .finally(() => setFetchLoading(false));
    } else {
      setFormData(initialFormState);
      setSlugManuallyEdited(false);
    }
  }, [id]);

  const handleNameChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      ...(!slugManuallyEdited && !id ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleSlugChange = (value) => {
    setSlugManuallyEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: value
        .toLowerCase()
        .replace(/[^\w-]/g, "")
        .replace(/-+/g, "-"),
    }));
  };

  const regenerateSlug = () => {
    const slug = generateSlug(formData.name);
    setFormData((prev) => ({ ...prev, slug }));
    setSlugManuallyEdited(false);
  };

  const addRow = (field, def) =>
    setFormData((p) => ({ ...p, [field]: [...p[field], def] }));
  const removeRow = (field, idx) =>
    setFormData((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== idx),
    }));
  const handleDynamicChange = (field, idx, subField, value) => {
    const arr = [...formData[field]];
    arr[idx][subField] = value;
    setFormData((p) => ({ ...p, [field]: arr }));
  };

  // About Section helpers
  const handleAboutChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      aboutSection: { ...prev.aboutSection, [key]: value },
    }));
  };

  const addKeyPoint = () => {
    setFormData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        keyPoints: [...(prev.aboutSection?.keyPoints || []), ""],
      },
    }));
  };

  const updateKeyPoint = (idx, value) => {
    const updated = [...(formData.aboutSection?.keyPoints || [])];
    updated[idx] = value;
    handleAboutChange("keyPoints", updated);
  };

  const removeKeyPoint = (idx) => {
    const updated = (formData.aboutSection?.keyPoints || []).filter(
      (_, i) => i !== idx,
    );
    handleAboutChange("keyPoints", updated);
  };

  const handleSave = async (status = "published") => {
    if (!formData.name.trim()) {
      setSaveStatus({ type: "error", msg: "Exam name is required" });
      return;
    }
    if (!formData.slug.trim()) {
      setSaveStatus({ type: "error", msg: "Slug is required" });
      return;
    }

    setIsSaving(true);
    setSaveStatus({
      type: "loading",
      msg: status === "draft" ? "Saving Draft..." : "Publishing...",
    });

    try {
      const payload = { ...formData, status, _id: id || undefined };
      const res = await axios.post(`${API_BASE}/api/exams`, payload);

      if (res.data.success) {
        const msg = id
          ? "Updated Successfully!"
          : status === "draft"
            ? "Draft Saved!"
            : "Exam Published!";
        setSaveStatus({ type: "success", msg });
        if (!id) {
          setFormData(initialFormState);
          setSlugManuallyEdited(false);
        }
        setTimeout(() => {
          setSaveStatus({ type: "", msg: "" });
          navigate("/admin/exam");
        }, 2000);
      }
    } catch (err) {
      setSaveStatus({
        type: "error",
        msg: err.response?.data?.message || "Error saving exam",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Discard all changes?")) {
      setFormData(initialFormState);
      navigate(-1);
    }
  };

  const inputCls =
    "w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33]/10 text-sm transition-all";
  const labelCls =
    "block text-[11px] font-black text-[#64748B] uppercase mb-1.5 tracking-widest";
  const cardCls =
    "bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden";
  const cardHeaderCls =
    "px-4 sm:px-5 py-3 sm:py-3.5 border-b border-[#F1F5F9] flex items-center gap-2";

  if (fetchLoading)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="animate-spin text-[#DC2626] mx-auto" size={36} />
          <p className="text-slate-400 text-sm font-bold">
            Loading exam data...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans'] text-[#334155] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>

      {/* ── STICKY HEADER ─────────────────────────────────────────── */}
      <header className="h-[56px] sm:h-[68px] bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all shrink-0"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">
              Admin
            </span>
            <h1 className="text-sm sm:text-lg font-extrabold text-[#0B1C33] leading-tight truncate">
              {id ? "Edit Exam" : "Add New Exam"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          {/* Status Badge — only on sm+ */}
          {saveStatus.msg && (
            <span
              className={`hidden sm:inline text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap
              ${
                saveStatus.type === "error"
                  ? "bg-red-50 text-red-600"
                  : saveStatus.type === "success"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600 animate-pulse"
              }`}
            >
              {saveStatus.msg}
            </span>
          )}
          <button
            onClick={handleDiscard}
            className="text-xs sm:text-sm font-bold text-slate-400 hover:text-red-600 transition-colors px-1"
          >
            Discard
          </button>
          <button
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0B1C33] hover:bg-slate-50 transition-all shadow-sm"
          >
            <Save size={14} className="text-slate-400" /> Draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-2 bg-[#DC2626] hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-red-200 transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={13} />
            ) : (
              <Send size={13} />
            )}
            <span className="ml-1">{id ? "Update" : "Publish"}</span>
          </button>
        </div>
      </header>

      {/* Mobile status bar */}
      {saveStatus.msg && (
        <div
          className={`sm:hidden px-4 py-1.5 text-[10px] font-black uppercase text-center
          ${
            saveStatus.type === "error"
              ? "bg-red-50 text-red-600"
              : saveStatus.type === "success"
                ? "bg-green-50 text-green-600"
                : "bg-blue-50 text-blue-600"
          }`}
        >
          {saveStatus.msg}
        </div>
      )}

      {/* ── MAIN GRID ─────────────────────────────────────────────── */}
      <div className="p-3 sm:p-5 lg:p-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-6">
        {/* ── LEFT COLUMN ────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-5">
          {/* ── 1. BASIC OVERVIEW ── */}
          <div className={cardCls}>
            <div className={cardHeaderCls}>
              <FileText size={14} className="text-slate-400" />
              <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest">
                Basic Overview
              </h3>
            </div>
            <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
              {/* Name + Slug + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Exam Title *</label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. JEE Main 2025"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    URL Slug *
                    <button
                      onClick={regenerateSlug}
                      title="Auto-generate from title"
                      className="ml-2 inline-flex items-center gap-0.5 text-blue-500 hover:text-blue-700 normal-case font-bold text-[10px]"
                    >
                      <Wand2 size={10} /> Auto
                    </button>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                      /
                    </span>
                    <input
                      type="text"
                      className={`${inputCls} pl-6`}
                      value={formData.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="exam-slug"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select
                    className={`${inputCls} bg-white`}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                    <option value="management">Management</option>
                    <option value="law & comm">Law & Comm</option>
                    <option value="humanities">Humanities</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  rows="3"
                  className={`${inputCls} leading-relaxed resize-none`}
                  placeholder="Brief description about this exam..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* Quick Info — 2 cols on mobile, 4 on sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100">
                {[
                  { key: "mode", label: "Mode" },
                  { key: "frequency", label: "Frequency" },
                  { key: "duration", label: "Duration" },
                  { key: "collegesCount", label: "Colleges" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={formData[key]}
                      className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-white text-xs outline-none focus:border-[#0B1C33] transition-all"
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2. ABOUT SECTION ── */}
          <div className={cardCls}>
            <div className={cardHeaderCls}>
              <Info size={14} className="text-slate-400" />
              <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest">
                About Section
              </h3>
            </div>
            <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
              {/* Title */}
              <div>
                <label className={labelCls}>Section Title</label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.aboutSection?.title || ""}
                  onChange={(e) => handleAboutChange("title", e.target.value)}
                  placeholder="e.g. What is JEE?"
                />
              </div>

              {/* Key Points */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelCls}>Key Points</label>
                  <button
                    type="button"
                    onClick={addKeyPoint}
                    className="text-[10px] font-black text-[#DC2626] hover:underline uppercase"
                  >
                    + Add Point
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.aboutSection?.keyPoints?.length
                    ? formData.aboutSection.keyPoints
                    : [""]
                  ).map((point, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className={inputCls}
                        value={point}
                        onChange={(e) => updateKeyPoint(idx, e.target.value)}
                        placeholder={`Point ${idx + 1} — e.g. JEE Main: For admission to NITs, IIITs...`}
                      />
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(idx)}
                        className="text-slate-300 hover:text-red-500 shrink-0 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Each point will appear as a bullet in the About section.
                </p>
              </div>

              {/* Note */}
              <div>
                <label className={labelCls}>Note (highlighted box)</label>
                <textarea
                  rows="2"
                  className={`${inputCls} resize-none`}
                  value={formData.aboutSection?.note || ""}
                  onChange={(e) => handleAboutChange("note", e.target.value)}
                  placeholder="e.g. Candidates must rank among the top 2.5 Lakh in JEE Main to be eligible for JEE Advanced."
                />
                <p className="text-[10px] text-slate-400 mt-1.5">
                  This will appear as a highlighted note box below the key
                  points.
                </p>
              </div>
            </div>
          </div>

          {/* ── 3. EXAM STRUCTURE ── */}
          <div className={cardCls}>
            <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-[#F1F5F9] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-slate-400" />
                <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest">
                  Exam Structure
                </h3>
              </div>
              <button
                onClick={() =>
                  addRow("structure", { feature: "", col1: "", col2: "" })
                }
                className="text-[10px] font-black bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors uppercase"
              >
                + Add Row
              </button>
            </div>
            <div className="p-3 sm:p-5">
              {formData.structure.length === 0 ? (
                <div className="text-center py-6 text-slate-300 text-xs font-bold italic">
                  No rows added yet. Click "+ Add Row" to begin.
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Column headers — hidden on very small screens */}
                  <div className="hidden xs:grid grid-cols-12 gap-2 px-1 text-[10px] uppercase font-black text-slate-400">
                    <div className="col-span-3">Feature</div>
                    <div className="col-span-4 text-center">
                      {formData.eligibilityTitle1 || "Col 1"}
                    </div>
                    <div className="col-span-4 text-center">
                      {formData.eligibilityTitle2 || "Col 2"}
                    </div>
                  </div>
                  {formData.structure.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center group"
                    >
                      <input
                        className="col-span-3 p-1.5 sm:p-2 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold outline-none focus:border-[#0B1C33]"
                        value={row.feature}
                        placeholder="Feature"
                        onChange={(e) =>
                          handleDynamicChange(
                            "structure",
                            idx,
                            "feature",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        className="col-span-4 p-1.5 sm:p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0B1C33]"
                        value={row.col1}
                        placeholder="Value 1"
                        onChange={(e) =>
                          handleDynamicChange(
                            "structure",
                            idx,
                            "col1",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        className="col-span-4 p-1.5 sm:p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0B1C33]"
                        value={row.col2}
                        placeholder="Value 2"
                        onChange={(e) =>
                          handleDynamicChange(
                            "structure",
                            idx,
                            "col2",
                            e.target.value,
                          )
                        }
                      />
                      <button
                        onClick={() => removeRow("structure", idx)}
                        className="col-span-1 text-slate-300 hover:text-red-500 transition-colors flex justify-center"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 4. ELIGIBILITY ── */}
          <div className={cardCls}>
            <div className={cardHeaderCls}>
              <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest">
                Eligibility Criteria
              </h3>
            </div>
            <div className="p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {[
                {
                  titleKey: "eligibilityTitle1",
                  pointsKey: "eligibilityPoints1",
                },
                {
                  titleKey: "eligibilityTitle2",
                  pointsKey: "eligibilityPoints2",
                },
              ].map(({ titleKey, pointsKey }, i) => (
                <div key={i} className="space-y-2">
                  <label className={labelCls}>Column {i + 1} Title</label>
                  <input
                    type="text"
                    className={`${inputCls} font-bold`}
                    value={formData[titleKey]}
                    onChange={(e) =>
                      setFormData({ ...formData, [titleKey]: e.target.value })
                    }
                  />
                  <textarea
                    rows="7"
                    className={`${inputCls} font-mono text-xs leading-relaxed resize-none`}
                    value={formData[pointsKey]}
                    onChange={(e) =>
                      setFormData({ ...formData, [pointsKey]: e.target.value })
                    }
                    placeholder="Add criteria (1 per line)..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* END LEFT COLUMN */}

        {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-5">
          <div className="lg:sticky lg:top-[72px] space-y-3 sm:space-y-5">
            {/* MEDIA ASSETS */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-3 sm:p-5 space-y-3 sm:space-y-4">
              <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} className="text-slate-400" /> Media Assets
              </h3>
              <div>
                <label className={labelCls}>Hero Image</label>
                <div className="w-full h-24 sm:h-28 bg-slate-100 rounded-xl overflow-hidden border border-[#E2E8F0] mb-2">
                  {formData.heroImage ? (
                    <img
                      src={formData.heroImage}
                      className="w-full h-full object-cover"
                      alt="Hero preview"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-1">
                      <ImageIcon size={22} />
                      <span className="text-[10px] font-bold">Preview</span>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.heroImage}
                  onChange={(e) =>
                    setFormData({ ...formData, heroImage: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="border-t border-slate-100 pt-3 sm:pt-4">
                <label className={`${labelCls} text-red-500`}>
                  Brochure PDF URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <FileDown
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={13}
                    />
                    <input
                      type="text"
                      className={`${inputCls} pl-8`}
                      value={formData.brochureUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brochureUrl: e.target.value,
                        })
                      }
                      placeholder="Paste PDF link..."
                    />
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-all
                    ${
                      formData.brochureUrl
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-slate-50 border-slate-200 text-slate-300"
                    }`}
                  >
                    <CheckCircle size={15} />
                  </div>
                </div>
              </div>
            </div>

            {/* IMPORTANT DATES */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-3 sm:p-5 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400" /> Important
                  Dates
                </h3>
                <button
                  onClick={() =>
                    addRow("importantDates", { event: "", date: "" })
                  }
                  className="text-[10px] font-black text-[#DC2626] hover:underline uppercase"
                >
                  + Add
                </button>
              </div>
              {formData.importantDates.length === 0 ? (
                <p className="text-slate-300 text-[11px] italic text-center py-2">
                  No dates added
                </p>
              ) : (
                formData.importantDates.map((item, idx) => (
                  <div key={idx} className="flex gap-1.5 sm:gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Event name"
                      className="flex-1 p-2 border border-[#CBD5E1] rounded-lg text-xs outline-none focus:border-[#0B1C33] min-w-0"
                      value={item.event}
                      onChange={(e) =>
                        handleDynamicChange(
                          "importantDates",
                          idx,
                          "event",
                          e.target.value,
                        )
                      }
                    />
                    <input
                      type="text"
                      placeholder="Date"
                      className="w-20 sm:w-24 p-2 border border-[#CBD5E1] rounded-lg text-xs outline-none focus:border-[#0B1C33] shrink-0"
                      value={item.date}
                      onChange={(e) =>
                        handleDynamicChange(
                          "importantDates",
                          idx,
                          "date",
                          e.target.value,
                        )
                      }
                    />
                    <button
                      onClick={() => removeRow("importantDates", idx)}
                      className="text-slate-300 hover:text-red-500 shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FAQs */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-[#0B1C33] text-xs uppercase tracking-widest flex items-center gap-2">
                  <CircleHelp size={14} className="text-slate-400" /> FAQs
                </h3>
                <span className="text-[10px] font-black text-slate-400">
                  {formData.faqs.length} added
                </span>
              </div>
              {formData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 group relative hover:border-red-200 transition-all"
                >
                  <input
                    className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none mb-1.5 pr-5"
                    value={faq.q}
                    onChange={(e) =>
                      handleDynamicChange("faqs", idx, "q", e.target.value)
                    }
                    placeholder="Question?"
                  />
                  <textarea
                    className="w-full text-[11px] text-slate-500 bg-transparent outline-none resize-none leading-relaxed"
                    rows="2"
                    value={faq.a}
                    onChange={(e) =>
                      handleDynamicChange("faqs", idx, "a", e.target.value)
                    }
                    placeholder="Answer..."
                  />
                  <button
                    onClick={() => removeRow("faqs", idx)}
                    className="absolute top-2.5 right-2.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addRow("faqs", { q: "", a: "" })}
                className="w-full py-2.5 border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black rounded-xl hover:border-red-300 hover:text-red-500 transition-all uppercase"
              >
                + New FAQ
              </button>
            </div>

            {/* SAVE DRAFT — mobile only */}
            <button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="sm:hidden w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0B1C33] hover:bg-slate-50 transition-all shadow-sm"
            >
              <Save size={15} className="text-slate-400" /> Save as Draft
            </button>

            {/* ADMIN TIP */}
            <div className="p-3 sm:p-5 bg-[#0B1C33] text-white rounded-2xl shadow-xl relative overflow-hidden group">
              <HelpCircle
                size={56}
                className="absolute -right-3 -bottom-3 opacity-10 group-hover:scale-110 transition-transform duration-500 text-red-400"
              />
              <div className="relative z-10">
                <h4 className="font-black text-xs mb-2 flex items-center gap-2 text-red-400 uppercase">
                  <Info size={13} /> Admin Tip
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Use <b className="text-white">Auto</b> button next to slug to
                  generate it from the exam title. Always use hyphens, no
                  spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* END RIGHT COLUMN */}
      </div>
    </div>
  );
};

export default AddExam;
