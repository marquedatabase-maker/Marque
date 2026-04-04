import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../Services/api";
import Sidebar from "../../../components/admin/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const EditInstitute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- FORM STATE ---
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    type: "",
    stream: [], // Changed to array for Chip UI
    courseGroup: [], // Only one state for all course/program selections
    examsAccepted: "",
    totalCourses: "",
    ranking: "",
    applyLink: "",
    imageUrl: "",
    brochureUrl: "",
    // new data
    slug: "",
    shortDescription: "",
    estYear: "",
    aboutUniversity: "",
    keyHighlights: [],
    placementRate: "",
    totalRecruiters: "",
    dedicatedPlacementTeam: "No",
    placementHighlights: [],
    collegeLogoUrl: "",
    AveragePackage: "",
    HighestPackage: "",
    faqs: [{ question: "", answer: "" }],
    syllabusPdfUrl: "",
    galleryImages: [],
    topRecruiters: [],
  });

  // --- DATA LISTS (Consistent with AddInstitute) ---
  const STREAMS = [
    { id: "Engineering", icon: "fa-gear", label: "Engineering" },
    { id: "Management", icon: "fa-chart-line", label: "Management" },
    { id: "Medical", icon: "fa-user-doctor", label: "Medical" },
    // { id: "Law", icon: "fa-scale-balanced", label: "Law & Comm." },
    // { id: "Science", icon: "fa-flask", label: "Science" },
    // { id: "Commerce", icon: "fa-calculator", label: "Commerce" },
    // { id: "Arts", icon: "fa-palette", label: "Arts & Humanities" },
    // { id: "Education", icon: "fa-book-open", label: "Education" },
    // { id: "Agriculture", icon: "fa-leaf", label: "Agriculture" },
    // { id: "IT", icon: "fa-laptop-code", label: "IT & Software" },
  ];

  const PROGRAM_GROUPS = {
    Engineering: ["B.Tech / B.E", "B.Arch", "M.Tech"],
    Management: [
      "BCOM",
      "MCOM",
      "BBA",
      "BA",
      "LLB",
      "PSYCHOLOGY",
      "MBA",
      "MCA",
      "BCA",
      "BA-LLB",
      "BCOM-LLB",
      "BBA-LLB",
      "FASHION DESIGING",
    ],
    Medical: [
      "Medical- MBBS/PG",
      "Dental- bds/mds",
      "Ayurved- bams/bams-pg",
      "Parameduical- nursing/pharmacy/bpt",
    ],
    // "Law & Comm.": [
    //   "LLB (3 Year)",
    //   "BA LLB",
    //   "BBA LLB",
    //   "LLM",
    //   "B.Com",
    //   "M.Com",
    // ],
    // Science: ["B.Sc", "M.Sc", "BCA", "MCA"],
    // "Arts & Ed": ["BA", "MA", "B.Ed", "M.Ed", "PhD"],
  };

  const STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi NCR",
    "Chandigarh",
  ];

  // --- HELPERS ---
  // Helper to convert comma-separated string or single string to array
  const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (typeof data === "string" && data.includes(",")) return data.split(",");
    if (data) return [data];
    return [];
  };

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    api
      .get(`/institutes/${id}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      })
      .then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          city: data.city || "",
          state: data.state || "",
          type: data.type || "",
          // Ensure these are arrays for the Multi-select UI
          stream: toArray(data.stream),
          courseGroup: toArray(data.courseGroup),
          examsAccepted: Array.isArray(data.examsAccepted)
            ? data.examsAccepted.join(",")
            : data.examsAccepted || "",
          totalCourses: data.totalCourses || "",
          ranking: data.ranking || "",
          applyLink: data.applyLink || "",
          imageUrl: data.image?.url || "",
          brochureUrl: data.brochure?.url || "",

          // new data

          slug: data.slug || "",
          shortDescription: data.shortDescription || "",
          estYear: data.estYear || "",
          aboutUniversity: data.aboutUniversity || "",
          keyHighlights: data.keyHighlights || [],

          placementRate: data.placementRate || "",
          totalRecruiters: data.totalRecruiters || "",
          dedicatedPlacementTeam: data.dedicatedPlacementTeam ? "Yes" : "No",
          placementHighlights: data.placementHighlights || [],

          collegeLogoUrl: data.collegeLogo?.url || "",
          AveragePackage: data.AveragePackage || "",
          HighestPackage: data.HighestPackage || "",

          faqs: data.faqs || [{ question: "", answer: "" }],

          syllabusPdfUrl: data.syllabusPdf?.url || "",
          galleryImages: data.gallery || [],
          topRecruiters: data.topRecruiters || [],
        });
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load institute details");
        setLoading(false);
      });
  }, [id]);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMulti = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {

      await api.put(
        `/institutes/${id}`,
        {
          ...form,

          // Arrays → string format (backend split karta hai)
          stream: form.stream.join(","),
          courseGroup: form.courseGroup.join(","),

          keyHighlights: form.keyHighlights.join("|"),
          placementHighlights: form.placementHighlights.join("|"),

          // Backend JSON.parse karega
          faqs: JSON.stringify(form.faqs),
          gallery: JSON.stringify(form.galleryImages),
          topRecruiters: JSON.stringify(form.topRecruiters),

          dedicatedPlacementTeam: form.dedicatedPlacementTeam === "Yes",

          // Media URLs
          imageUrl: form.imageUrl,
          brochureUrl: form.brochureUrl,
          collegeLogoUrl: form.collegeLogoUrl,
          syllabusPdfUrl: form.syllabusPdfUrl,
        },
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        },
      );

      setMessage("✅ Institute updated successfully!");
      setTimeout(() => navigate("/admin/institutes"), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "❌ Update failed. Please try again.";
      setMessage(errorMsg);
      console.error("UPDATE ERROR:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // --- UI CLASSES ---
  const sectionClass =
    "bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm";
  const labelClass =
    "block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wide";
  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33] outline-none transition-all placeholder:text-slate-400";
  const chipBase =
    "cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all select-none";
  const chipActive =
    "bg-blue-50 border-blue-500 text-blue-700 shadow-sm ring-1 ring-blue-200";
  const chipInactive =
    "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700";

  // --- LOADING STATE ---
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-sans text-slate-600">
        <i className="fa-solid fa-circle-notch fa-spin text-2xl mr-3 text-[#0B1C33]"></i>
        <span className="font-bold">Loading Data...</span>
      </div>
    );

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* CONTENT */}
      <div className="w-full  transition-all duration-300 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-500 hover:text-[#0B1C33]"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#0B1C33]">
                Edit Institute
              </h2>
              <nav className="text-xs text-slate-500 font-medium">
                <span
                  className="cursor-pointer hover:text-[#DC2626]"
                  onClick={() => navigate("/admin/institutes")}
                >
                  Colleges
                </span>{" "}
                / <span>{form.name || "Edit Details"}</span>
              </nav>
            </div>
          </div>
          <div className="w-9 h-9 bg-[#0B1C33] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
            M
          </div>
        </header>

        {/* FORM AREA */}
        <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full flex-grow pb-24">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm font-bold shadow-sm ${message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              <i
                className={`fa-solid ${message.includes("✅") ? "fa-check-circle" : "fa-exclamation-circle"}`}
              ></i>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 1. OVERVIEW */}
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-[#DC2626]"></i>{" "}
                Institute Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    Institute Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. IIT Bombay"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Slug</label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Established Year</label>
                  <input
                    type="number"
                    name="estYear"
                    value={form.estYear}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Institute Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select Type</option>

                    <option value="Private">Private</option>
                    <option value="Deemed">Deemed University</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select State</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. STREAMS (DOMAINS) */}
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-[#DC2626]"></i>{" "}
                Select Streams (Domains)
              </h3>
              <div className="flex flex-wrap gap-3">
                {STREAMS.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => toggleMulti("stream", s.id)}
                    className={`${chipBase} ${form.stream.includes(s.id) ? chipActive : chipInactive}`}
                  >
                    <i
                      className={`fa-solid ${s.icon} ${form.stream.includes(s.id) ? "text-blue-600" : "text-slate-400"}`}
                    ></i>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. PROGRAMS */}
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-graduation-cap text-[#DC2626]"></i>{" "}
                Select Course Programs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(PROGRAM_GROUPS).map(([category, progList]) => (
                  <div key={category}>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {progList.map((prog) => (
                        <div
                          key={prog}
                          onClick={() => toggleMulti("courseGroup", prog)} // Updating 'courseGroup' directly
                          className={`cursor-pointer px-3 py-1.5 rounded text-[11px] font-bold border transition-colors
                            ${
                              form.courseGroup.includes(prog)
                                ? "bg-slate-800 text-white border-slate-800"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                            }`}
                        >
                          {prog}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. ACADEMICS */}
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-book-open text-[#DC2626]"></i>{" "}
                Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Exams Accepted</label>
                  <input
                    name="examsAccepted"
                    value={form.examsAccepted}
                    onChange={handleChange}
                    placeholder="e.g. JEE Main, NEET"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Total Courses</label>
                  <input
                    name="totalCourses"
                    type="number"
                    value={form.totalCourses}
                    onChange={handleChange}
                    placeholder="e.g. 25"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Ranking / Accreditation</label>
                  <input
                    name="ranking"
                    value={form.ranking}
                    onChange={handleChange}
                    placeholder="e.g. Rank #1 NIRF"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold mb-4">About Institute</h3>

              <textarea
                name="aboutUniversity"
                value={form.aboutUniversity}
                onChange={handleChange}
                className={inputClass}
              />

              {form.keyHighlights.map((item, index) => (
                <input
                  key={index}
                  value={item}
                  onChange={(e) => {
                    const updated = [...form.keyHighlights];
                    updated[index] = e.target.value;
                    setForm({ ...form, keyHighlights: updated });
                  }}
                  className={`${inputClass} mt-2`}
                  placeholder="Key Highlight"
                />
              ))}

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    keyHighlights: [...form.keyHighlights, ""],
                  })
                }
                className="text-blue-600 font-bold mt-2"
              >
                + Add Highlight
              </button>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold mb-4">Placement Details</h3>

              <input
                name="placementRate"
                value={form.placementRate}
                onChange={handleChange}
                placeholder="Placement %"
                className={inputClass}
              />

              <input
                name="AveragePackage"
                value={form.AveragePackage}
                onChange={handleChange}
                placeholder="Average Package"
                className={`${inputClass} mt-2`}
              />

              <input
                name="HighestPackage"
                value={form.HighestPackage}
                onChange={handleChange}
                placeholder="Highest Package"
                className={`${inputClass} mt-2`}
              />

              <input
                name="totalRecruiters"
                value={form.totalRecruiters}
                onChange={handleChange}
                placeholder="Total Recruiters"
                className={`${inputClass} mt-2`}
              />

              <select
                name="dedicatedPlacementTeam"
                value={form.dedicatedPlacementTeam}
                onChange={handleChange}
                className={`${inputClass} mt-2`}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold mb-4">FAQs</h3>

              {form.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
                >
                  <input
                    value={faq.question}
                    placeholder="Question"
                    className={inputClass}
                    onChange={(e) => {
                      const updated = [...form.faqs];
                      updated[index].question = e.target.value;
                      setForm({ ...form, faqs: updated });
                    }}
                  />
                  <input
                    value={faq.answer}
                    placeholder="Answer"
                    className={inputClass}
                    onChange={(e) => {
                      const updated = [...form.faqs];
                      updated[index].answer = e.target.value;
                      setForm({ ...form, faqs: updated });
                    }}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    faqs: [...form.faqs, { question: "", answer: "" }],
                  })
                }
                className="text-blue-600 font-bold"
              >
                + Add FAQ
              </button>
            </div>

            {/* 5. MEDIA */}
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-photo-film text-[#DC2626]"></i> Media
                & Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Official Application Link
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-link absolute left-3 top-3 text-slate-400"></i>
                    <input
                      name="applyLink"
                      value={form.applyLink}
                      onChange={handleChange}
                      placeholder="https://college.edu/apply"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>College Image URL</label>
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Brochure PDF URL</label>
                  <input
                    name="brochureUrl"
                    value={form.brochureUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <input
                  name="collegeLogoUrl"
                  value={form.collegeLogoUrl}
                  onChange={handleChange}
                  placeholder="College Logo URL"
                  className={`${inputClass} mt-2`}
                />

                <input
                  name="syllabusPdfUrl"
                  value={form.syllabusPdfUrl}
                  onChange={handleChange}
                  placeholder="Syllabus PDF URL"
                  className={`${inputClass} mt-2`}
                />
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="fixed bottom-0 right-0 w-full lg:w-[calc(100%-260px)] bg-white border-t border-slate-200 p-4 z-40 flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button
                type="button"
                onClick={() => navigate("/admin/institutes")}
                className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-2.5 bg-[#DC2626] text-white rounded-lg font-bold text-sm shadow-md hover:bg-[#b91c1c] transition-all flex items-center gap-2 ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>{" "}
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInstitute;
