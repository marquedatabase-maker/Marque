import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/api";
import EnquiryForm from "../enquiry/EnquiryForm";
import CollegeDetailEnquiryForm from "../enquiry/CollegeDetailEnquiryForm";
import HomeInstitutesSection from "../home/HomeInstitutesSection";
import {
  MapPin,
  Download,
  Heart,
  Check,
  ChevronDown,
  ArrowRight,
  Bed,
  Wifi,
  Dumbbell,
  BookOpen,
  Coffee,
  Monitor,
  HeartPulse,
  Microscope,
  Briefcase,
  Newspaper,
  Image,
  X,
  Lightbulb,
  FileText,
  Share2,
  GraduationCap,
} from "lucide-react";

const CollegeDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [randomColleges, setRandomColleges] = useState([]);
  const [showBrochureForm, setShowBrochureForm] = useState(false);

  // --- 1. GLOBAL STYLES (Injected directly) ---
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');

    body { font-family: 'Outfit', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .glass-input {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: white;
      transition: all 0.3s ease;
    }
    .glass-input:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
      outline: none;
    }
    .glass-input::placeholder { color: rgba(255, 255, 255, 0.6); }
    .glass-input option { color: #333; }

    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    .custom-scroll::-webkit-scrollbar-thumb:hover { background: #DC2626; }

    @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  `;

  // --- 2. MOCK DATA FETCH ---

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/institutes/slug/${slug}`);
        const data = res.data;

        setCollege({
          // BASIC
          name: data.name,
          location: `${data.city}, ${data.state}`,
          city: data.city,
          state: data.state,
          type: data.type,
          founded: data.estYear ? data.estYear : "NA",
          streams: data.stream || [],
          examsAccepted: data.examsAccepted || [],

          // ✅ COURSE GROUPS (for chips)
          courseGroups: data.courseGroup || [],

          // fetchCollege ke andar setCollege mein ye bhi add karein:

          news: data.news || [],
          facilities: [
            { name: "AC Hostels", icon: <Bed /> },
            { name: "Wi-Fi Campus", icon: <Wifi /> },
            { name: "Gymnasium", icon: <Dumbbell /> },
            { name: "Central Library", icon: <BookOpen /> },
            { name: "Food Court", icon: <Coffee /> },
            { name: "Apple Lab", icon: <Monitor /> },
            { name: "Medical Center", icon: <HeartPulse /> },
            { name: "Research Labs", icon: <Microscope /> },
          ],

          // MEDIA
          heroImage:
            data?.image?.url && data.image.url.trim() !== ""
              ? data.image.url
              : data?.imageUrl && data.imageUrl.trim() !== ""
                ? data.imageUrl
                : data?.image && typeof data.image === "string"
                  ? data.image
                  : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          logo:
            data?.collegeLogo?.url && data.collegeLogo.url.trim() !== ""
              ? data.collegeLogo.url
              : "https://placehold.co/150x150?text=Logo",

          // brochure is added here in setCollege so that it can be easily accessed in the CTA button without worrying about nested properties or missing data. This way, we have a single source of truth for the brochure URL that is derived from the original API response but is now safely stored in our college state object.
          brochure: data?.brochure || null,

          // TEXT
          shortDescription: data.shortDescription || "",
          aboutUniversity: data.aboutUniversity || "",

          // HIGHLIGHTS
          highlights: data.keyHighlights || [],
          placementHighlights: data.placementHighlights || [],

          // STATS
          stats: {
            highestPkg: data.HighestPackage || "NA",
            avgPkg: data.AveragePackage || "NA",
            rank: data.ranking || "NA",
            accreditation: data.type || "Private",
          },

          // PLACEMENTS
          placements: {
            rate: data.placementRate || "NA",
            totalOffers: data.totalRecruiters || "NA",
            avgPkg: data.AveragePackage || "NA",
            recruiters: (data.topRecruiters || []).map((logo) => ({
              icon: (
                <img
                  src={logo}
                  className="h-8 object-contain"
                  alt="Recruiter Logo"
                />
              ),
            })),
          },

          // NAYA CODE (Safe mapping):
          courses: Array.isArray(data.stream)
            ? data.stream.map((s, i) => ({
                id: i,
                stream: s,
                icon: <Monitor className="w-5 h-5" />,
                programs: [],
              }))
            : typeof data.stream === "string"
              ? data.stream.split(",").map((s, i) => ({
                  id: i,
                  stream: s,
                  icon: <Monitor className="w-5 h-5" />,
                  programs: [],
                }))
              : [], // Agar data na ho ya kuch aur ho to empty array

          // FAQ
          faqs: (data.faqs || []).map((f) => ({
            q: f.question,
            a: f.answer,
          })),

          // show card

          // GALLERY
          galleryImages: data.gallery || [],

          // SIMILAR (future)
          similarColleges: [],
        });

        // 🔹 Random 8 Colleges
        const allRes = await api.get("/institutes");
        const allColleges = allRes?.data?.institutes || [];

        const filtered = allColleges.filter((item) => item.slug !== slug);

        const shuffled = filtered.sort(() => 0.5 - Math.random());

        setRandomColleges(shuffled.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  const toggleAccordion = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold text-[#0B1C33]">Loading Institute...</span>
        </div>
      </div>
    );
  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">No Data Found</h2>
          <p className="text-slate-500">
            Hume is college ki jankari nahi mili.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div className="bg-[#F8FAFC] font-sans text-slate-700 min-h-screen pb-20 pt-20">
        {/* --- 3. GALLERY MODAL --- */}
        {showGallery && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 text-white hover:text-[#DC2626] transition p-2 bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-5xl w-full">
              <img
                src={college.heroImage}
                alt="Gallery"
                className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
              />
              <p className="text-center text-white mt-4 font-bold text-lg tracking-wide">
                Campus View
              </p>
            </div>
          </div>
        )}

        {/* --- 4. STICKY HEADER & NAV --- */}
        <header className="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ScrollSpy Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-8 border-t border-slate-100">
              {["Overview", "Courses", "Facilities", "Placements", "FAQs"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="py-4 text-sm font-bold text-slate-600 hover:text-[#0B1C33] whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-[#DC2626] uppercase tracking-wide"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* --- 5. HERO CARD --- */}
          <div className="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] border border-slate-100 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Hero Image */}
              <div
                className="lg:col-span-5 relative h-72 lg:h-auto rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setShowGallery(true)}
              >
                <img
                  src={college.heroImage}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C33]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Times Group
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/30">
                      Estd. {college.founded}
                    </span>
                  </div>
                  <p className="font-bold text-xl flex items-center gap-2 font-poppins">
                    <MapPin className="w-4 h-4 text-[#DC2626]" />{" "}
                    {college.location}
                  </p>
                </div>
              </div>

              {/* Hero Info */}
              <div className="lg:col-span-7 flex flex-col justify-center py-2 lg:pr-6">
                <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-2 shadow-sm">
                      <img
                        src={college.logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-1xl lg:text-3xl font-bold text-[#0B1C33] leading-tight font-poppins">
                        {college.name}
                      </h1>
                      <div className="flex items-center gap-2 mt-2"></div>
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => {
                        const shareData = {
                          title: document.title,
                          text: "Check this page 👇",
                          url: window.location.href,
                        };

                        if (navigator.share) {
                          navigator.share(shareData);
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:border-[#DC2626] text-slate-500 transition"
                    >
                      <Share2 className="w-4 h-4 hover:border-[#DC2626]" />
                    </button>

                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border transition
                      ${
                        isLiked
                          ? "border-[#DC2626] text-[#DC2626]"
                          : "border-slate-200 text-slate-500 hover:text-[#DC2626] hover:border-[#DC2626]"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition ${
                          isLiked ? "fill-[#DC2626]" : "fill-none"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed font-medium text-sm lg:text-base">
                  {college.shortDescription}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  <StatBox
                    label="Highest Pkg"
                    value={
                      <>
                        {college.stats.highestPkg}{" "}
                        <span className="text-[12px] font-semibold">LPA</span>
                      </>
                    }
                  />
                  <StatBox
                    label="Avg Pkg"
                    value={
                      <>
                        {college.stats.avgPkg}{" "}
                        <span className="text-[12px] font-semibold">LPA</span>
                      </>
                    }
                  />
                  <StatBox label="Rank" value={college.stats.rank} />
                  <StatBox
                    label="Accreditation"
                    value={college.stats.accreditation}
                    highlight
                  />
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <button
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                    onClick={() => setShowBrochureForm(true)}
                  >
                    <Download className="w-4 h-4" /> Brochure
                  </button>
                  <button
                    onClick={() => setShowGallery(true)}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-white text-[#0B1C33] border-2 border-slate-200 hover:border-[#0B1C33] font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                  >
                    <Image className="w-4 h-4" /> Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
            {/* --- 6. LEFT CONTENT --- */}
            <div className="lg:col-span-8 space-y-8">
              {/* Overview */}
              <Section id="overview" title="About the University">
                <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                  <p>{college.aboutUniversity}</p>
                  <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mt-4">
                    <h3 className="font-bold text-[#0B1C33] mb-3 flex items-center gap-2 font-poppins">
                      <Lightbulb className="w-5 h-5 text-[#DC2626]" /> Key
                      Highlights
                    </h3>
                    <ul className="grid gap-3">
                      {college.highlights.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              {/* Courses */}
              <Section id="streams-courses" title="Streams & Course Groups">
                <div className="space-y-6">
                  {/* STREAMS */}
                  <div>
                    <h3 className="text-base font-bold text-[#0B1C33] mb-3">
                      Stream (Category)
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {college.streams.map((stream, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-[#0B1C33] bg-white hover:bg-slate-50 transition"
                        >
                          {stream}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* COURSE GROUPS */}
                  <div>
                    <h3 className="text-base font-bold text-[#0B1C33] mb-3">
                      Course Groups
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {college.courseGroups.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-[#0B1C33] bg-white hover:bg-slate-50 transition"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Exams Accepted */}
                {college.examsAccepted?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-base font-bold text-[#0B1C33] mb-3">
                      Exams Accepted
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {college.examsAccepted.map((exam, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg text-sm font-semibold
                     bg-red-50 text-[#DC2626] border border-red-100
                     "
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {/* Facilities */}
              <Section id="facilities" title="Infrastructure & Facilities">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {college.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition hover:border-blue-200 group"
                    >
                      <div className="text-[#DC2626] mb-3 group-hover:scale-110 transition-transform">
                        {React.cloneElement(fac.icon, { className: "w-8 h-8" })}
                      </div>
                      <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wide">
                        {fac.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Placements */}
              <Section id="placements" title="Placements">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Placement Rate
                    </p>
                    <p className="text-2xl font-extrabold text-green-600 mt-1 font-poppins">
                      {college.placements.rate} %
                    </p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Total Offers
                    </p>
                    <p className="text-2xl font-extrabold text-blue-600 mt-1 font-poppins">
                      {college.placements.totalOffers} LPA
                    </p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Avg Package
                    </p>
                    <p className="text-2xl font-extrabold text-purple-600 mt-1 font-poppins">
                      {college.placements.avgPkg} LPA
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h4 className="font-bold text-[#0B1C33] mb-4 text-sm uppercase tracking-wide font-poppins">
                    Top Recruiters
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {college.placements.recruiters.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-[#DC2626] transition group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                          {rec.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {rec.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-5">
                  {/* Placement Highlights */}
                  {college.placementHighlights?.length > 0 && (
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
                      <h3 className="font-bold text-[#0B1C33] mb-3 flex items-center gap-2 font-poppins">
                        <GraduationCap className="w-5 h-5 text-[#DC2626]" />
                        Placement Highlights
                      </h3>

                      <ul className="grid gap-3">
                        {college.placementHighlights.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>

              {/* FAQs */}
              <Section id="faqs" title="Frequently Asked Questions">
                <div className="space-y-3">
                  {college.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => toggleAccordion(`faq-${idx}`)}
                        className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 text-left transition-colors"
                      >
                        <span className="font-bold text-[#0B1C33] text-sm font-poppins">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#DC2626] transition-transform ${activeAccordion === `faq-${idx}` ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 overflow-hidden bg-slate-50 ${activeAccordion === `faq-${idx}` ? "max-h-40" : "max-h-0"}`}
                      >
                        <p className="p-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* --- 7. RIGHT COLUMN (Sticky Sidebar) --- */}
            <div className="lg:col-span-4 sticky top-24 h-fit space-y-6">
              {/* Admission Form */}
              {/* INLINE ENQUIRY FORM (NO POPUP) */}
              <CollegeDetailEnquiryForm
                defaultCourse={college?.courseGroups?.[0] || ""}
              />

              {/* Brochure Download */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-[#DC2626] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#DC2626] rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1C33] font-poppins">
                      Brochure
                    </h4>
                    <p className="text-xs text-slate-500">2026 Guide</p>
                  </div>
                </div>
                <button
                  className="w-10 h-10 bg-slate-50 text-[#DC2626] rounded-full flex items-center justify-center hover:bg-[#DC2626] hover:text-white transition-all"
                  onClick={() => setShowBrochureForm(true)}
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              {/* News Widget */}

              {/* Similar Colleges (New Section) */}
            </div>
          </div>
        </main>
      </div>
      {showBrochureForm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]"
          onClick={() => setShowBrochureForm(false)}
        >
          <div
            className="w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <EnquiryForm
              defaultCourse={college?.courseGroups?.[0] || ""}
              onClose={() => setShowBrochureForm(false)}
              onSuccess={() => {
                setShowBrochureForm(false);
                if (college?.brochure?.url) {
                  window.open(college.brochure.url, "_blank");
                  console.log(college.brochure);
                }
              }}
            />
          </div>
        </div>
      )}
      <HomeInstitutesSection
        title="Explore More Colleges"
        institutesData={randomColleges} // ✅ random 8 colleges
        hideFilter={true} // ✅ filter hide
        showMoreButton={true}
      />
    </>
  );
};

/* ================================
   REUSABLE SUB-COMPONENTS
   ================================ */

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] border border-slate-100 scroll-mt-36"
  >
    <h2 className="text-2xl font-bold text-[#0B1C33] mb-6 flex items-center gap-3 font-poppins">
      <span className="w-1.5 h-8 bg-[#DC2626] rounded-full"></span> {title}
    </h2>
    {children}
  </section>
);

const StatBox = ({ label, value, highlight }) => (
  <div
    className={`p-4 py-1.5 rounded-xl border transition-all hover:shadow-sm cursor-default ${highlight ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100 hover:border-slate-300"}`}
  >
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
      {label}
    </p>
    <p
      className={`text-xl font-extrabold ${highlight ? "text-green-700" : "text-[#0B1C33]"}`}
    >
      {value}
    </p>
  </div>
);

export default CollegeDetail;
