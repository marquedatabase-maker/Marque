import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/api";
// import Sidebar from "../../../components/admin/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AddInstitute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    // BASIC
    name: "",
    slug: "",
    shortDescription: "",
    city: "",
    state: "",
    estYear: null,
    type: "",

    // FILTER
    stream: [],
    courseGroup: [],

    // ACADEMIC
    examsAccepted: "",
    totalCourses: "",
    ranking: "",

    // ABOUT
    aboutUniversity: "",
    keyHighlights: [],

    // PLACEMENTS
    placementRate: "",
    totalRecruiters: "",
    dedicatedPlacementTeam: "No",
    placementHighlights: [],
    collegeLogoUrl: "",
    AveragePackage: "",
    HighestPackage: "",

    // FAQ
    faqs: [{ question: "", answer: "" }],

    // MEDIA
    imageUrl: "",
    brochureUrl: "",

    syllabusPdfUrl: "",
    galleryImages: [],
    topRecruiters: [],

    // ACTION
    applyLink: "",
  });

  /* ================= CONSTANT DATA ================= */
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

  const STREAMS = [
    "Engineering",
    "Management",
    "Medical",
  ];

  const COURSE_GROUPS = [
    "B.Tech",
    "M.Tech",
    "B-ARCH",
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
  ];

  /* ================= HANDLERS ================= */
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

  const handleArrayAdd = (key) => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const handleArrayChange = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [key]: updated }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...form.faqs];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, faqs: updated }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        stream: form.stream.join(","),
        courseGroup: form.courseGroup.join(","),
        examsAccepted: form.examsAccepted,
      };

      await api.post("/institutes", payload, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });

      setMessage("✅ Institute added successfully");
      setTimeout(() => navigate("/admin/institutes"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Failed to add institute");
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
      {/* <Sidebar /> */}
      

      <div className="w-full  p-6 pb-32">
        <h1 className="text-2xl font-bold text-[#0B1C33] mb-6">
          Add New College
        </h1>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-slate-100 font-bold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ===== HERO & INFO ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Hero & Info</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Institute Name"
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                name="slug"
                placeholder="Slug (iit-bombay)"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="state"
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select State</option>
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <input
                name="estYear"
                placeholder="Est. Year"
                type="number"
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="type"
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Institute Type</option>
                <option>Government</option>
                <option>Private</option>
                <option>Deemed</option>
              </select>
            </div>

            <textarea
              name="shortDescription"
              placeholder="Short Description (max 200 chars)"
              maxLength={200}
              className={`${inputClass} mt-4`}
              onChange={handleChange}
            />
          </div>

          {/* ===== STREAM & COURSE GROUP ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Streams & Course Groups</h3>

            <p className="text-sm font-semibold mb-2">Streams</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {STREAMS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleMulti("stream", s)}
                  className={`px-3 py-1 rounded border ${
                    form.stream.includes(s)
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-sm font-semibold mb-2">Course Groups</p>
            <div className="flex flex-wrap gap-2">
              {COURSE_GROUPS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleMulti("courseGroup", c)}
                  className={`px-3 py-1 rounded border ${
                    form.courseGroup.includes(c)
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ===== ACADEMIC ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Academic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="examsAccepted"
                placeholder="Exams Accepted (JEE, NEET)"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="totalCourses"
                placeholder="Total Courses"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="ranking"
                placeholder="Ranking / Accreditation"
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* ===== PLACEMENTS ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Placements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="placementRate"
                placeholder="Placement %"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="HighestPackage"
                placeholder="HighestPackage LPA"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="AveragePackage"
                placeholder="AveragePackage"
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="totalRecruiters"
                placeholder="Total Recruiters"
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="dedicatedPlacementTeam"
                onChange={handleChange}
                className={inputClass}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>
          {/* ===== ABOUT ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">About Institute</h3>
            <textarea
              name="aboutUniversity"
              rows={5}
              className={inputClass}
              onChange={handleChange}
            />

            {form.keyHighlights.map((h, i) => (
              <input
                key={i}
                className={`${inputClass} mt-2`}
                placeholder="Key Highlight"
                onChange={(e) =>
                  handleArrayChange("keyHighlights", i, e.target.value)
                }
              />
            ))}

            <button
              type="button"
              onClick={() => handleArrayAdd("keyHighlights")}
              className="mt-2 text-blue-600 font-bold"
            >
              + Add Highlight
            </button>
            <br></br>

            {/* placementHighlights   */}

            {form.placementHighlights.map((h, i) => (
              <input
                key={i}
                className={`${inputClass} mt-2`}
                placeholder="Placement Highlight"
                onChange={(e) =>
                  handleArrayChange("placementHighlights", i, e.target.value)
                }
              />
            ))}

            <button
              type="button"
              onClick={() => handleArrayAdd("placementHighlights")}
              className="mt-2 text-blue-600 font-bold"
            >
              + Placement Highlight
            </button>
          </div>

          {/* ===== FAQ ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">FAQs</h3>

            {form.faqs.map((f, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
              >
                <input
                  placeholder="Question"
                  className={inputClass}
                  onChange={(e) =>
                    handleFaqChange(i, "question", e.target.value)
                  }
                />
                <input
                  placeholder="Answer"
                  className={inputClass}
                  onChange={(e) => handleFaqChange(i, "answer", e.target.value)}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  faqs: [...prev.faqs, { question: "", answer: "" }],
                }))
              }
              className="text-blue-600 font-bold"
            >
              + Add FAQ
            </button>
          </div>

          {/* ===== GALLERY ===== */}
          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Gallery Images</h3>

            {form.galleryImages.map((g, i) => (
              <input
                key={i}
                placeholder="Image URL"
                className={`${inputClass} mb-2`}
                onChange={(e) =>
                  handleArrayChange("galleryImages", i, e.target.value)
                }
              />
            ))}

            <button
              type="button"
              onClick={() => handleArrayAdd("galleryImages")}
              className="text-blue-600 font-bold"
            >
              + Add Image
            </button>
          </div>

          {/* topRecruiters   */}

          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Top Recruiters Logo </h3>

            {form.topRecruiters.map((g, i) => (
              <input
                key={i}
                placeholder="Logo URL"
                className={`${inputClass} mb-2`}
                onChange={(e) =>
                  handleArrayChange("topRecruiters", i, e.target.value)
                }
              />
            ))}

            <button
              type="button"
              onClick={() => handleArrayAdd("topRecruiters")}
              className="text-blue-600 font-bold"
            >
              + Add Image
            </button>
          </div>

          <div className={sectionClass}>
            <h3 className="font-bold mb-4">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="imageUrl"
                placeholder="Image URL"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="brochureUrl"
                placeholder="Brochure PDF URL"
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="collegeLogoUrl"
                placeholder="college Logo URL "
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="syllabusPdfUrl"
                placeholder="Syllabus PDF URL"
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <div
            className="fixed bottom-0 right-0 w-full lg:w-[calc(100%-260px)]
            bg-white border-t p-4 flex justify-end"
          >
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

export default AddInstitute;
