import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import EnquiryForm from "../../enquiry/EnquiryForm";
import {
  Search,
  ChevronRight,
  Headset,
  Settings,
  HeartPulse,
  Scale,
  Calculator,
  GraduationCap,
  Clock,
  MapPin,
  Loader2,
  BookOpen,
} from "lucide-react";

const API_BASE =import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const UserExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState("");
  const location = useLocation();
  // popup form
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Domains", icon: <GraduationCap size={18} /> },
    { id: "engineering", name: "Engineering", icon: <Settings size={18} /> },
    { id: "medical", name: "Medical", icon: <HeartPulse size={18} /> },
    { id: "management", name: "Management", icon: <Calculator size={18} /> },
    { id: "law", name: "Law & Comm.", icon: <Scale size={18} /> },
  ];

  // 3. YAHAN PAR YE NAYA FUNCTION (useEffect) ADD KAREIN
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");

    if (categoryFromUrl) {
      // Isse Navbar wala click detect hoga
      setActiveCategory(categoryFromUrl.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [location.search]);

  useEffect(() => {
    fetchExams();
    window.scrollTo(0, 0);
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError("");
      // isPublished:true is enforced on backend when isAdmin is not "true"
      const res = await axios.get(`${API_BASE}/exams`);
      if (res.data.success) {
        setExams(res.data.exams);
      }
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("Failed to load exams. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredExams = exams.filter((exam) => {
    const matchesCategory =
      activeCategory === "all" || exam.category === activeCategory;
    const matchesSearch = exam.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-outfit  { font-family: 'Outfit', sans-serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .card-hover   { transition: all 0.25s cubic-bezier(.4,0,.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(220,38,38,.15); border-color: #DC2626; }
      `}</style>

      {/* ── HERO HEADER ── */}
      {/* ✅ UPDATED HEADER — no dot pattern, clean simple dark blue */}
      {/* ✅ UPDATED HEADER — no dot pattern, clean simple dark blue */}
      <header className="bg-[#0B1C33] pt-28 pb-16 px-4 text-center font-jakarta">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-red-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
            Entrance Examinations 2026
          </span>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 font-poppins leading-tight tracking-tight">
            Find Your Perfect Entrance Exam
          </h1>

          <p className="text-slate-300 text-[11px] md:text-xs mb-8 max-w-xl mx-auto leading-relaxed opacity-90 font-outfit">
            Browse comprehensive details, eligibility criteria, and important
            dates for top entrance exams at your fingertips.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-1 rounded-[50px] flex items-center max-w-xl mx-auto shadow-lg transition-all focus-within:ring-4 focus-within:ring-red-500/10">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none outline-none px-5 py-2.5 text-sm text-[#475569] rounded-[50px] font-jakarta placeholder:text-slate-400"
              placeholder="Search for JEE, NEET, CLAT..."
            />
            <button className="w-10 h-10 bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 shrink-0">
              <Search size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-[#E2E8F0]">
                  <h4 className="font-bold text-[#0B1C33] text-[11px] uppercase tracking-widest font-poppins">
                    Browse Domains
                  </h4>
                </div>
                <nav className="flex flex-col">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-medium transition-all border-b border-slate-50 last:border-0 font-jakarta
                        ${
                          activeCategory === cat.id
                            ? "bg-[#FEF2F2] text-[#DC2626] border-l-4 border-l-[#DC2626]"
                            : "text-[#475569] hover:bg-slate-50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            activeCategory === cat.id
                              ? "text-[#DC2626]"
                              : "text-slate-400"
                          }
                        >
                          {cat.icon}
                        </span>
                        {cat.name}
                      </div>
                      <ChevronRight
                        size={14}
                        className={
                          activeCategory === cat.id
                            ? "translate-x-0"
                            : "opacity-0"
                        }
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Guidance Widget */}
              <div className="bg-[#DC2626] rounded-2xl p-8 text-white text-center shadow-xl">
                <Headset size={40} className="mx-auto mb-4 opacity-90" />
                <h4 className="font-bold text-lg mb-2 font-poppins text-white">
                  Need Guidance?
                </h4>
                <p className="text-xs text-white/80 mb-6 font-outfit leading-relaxed">
                  Talk to our experts to find the best exam strategy for you.
                </p>

                {/* ✅ Button par onClick add kiya */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-3 bg-white text-[#DC2626] font-extrabold rounded-xl hover:bg-slate-50 transition shadow-sm font-jakarta text-xs uppercase tracking-wider"
                >
                  Request Call Back
                </button>
              </div>
            </div>
          </aside>

          {/* EXAM LIST */}
          <div className="lg:col-span-9 space-y-6">
            {/* Header Bar */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F8FAFC] text-[#0B1C33] rounded-xl flex items-center justify-center shadow-inner">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0B1C33] font-poppins capitalize leading-none">
                    {activeCategory === "all"
                      ? "All Examinations"
                      : `${activeCategory} Entrance Exams`}
                  </h2>
                  <p className="text-[11px] text-slate-400 font-outfit mt-1">
                    Found {filteredExams.length} Available Programs
                  </p>
                </div>
              </div>
              {/* Mobile category select */}
              <div className="lg:hidden">
                <select
                  className="bg-slate-100 p-2 rounded-lg text-xs font-bold font-jakarta outline-none"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-4 rounded-2xl text-center">
                {error}
                <button
                  onClick={fetchExams}
                  className="ml-3 underline hover:no-underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-3xl border border-slate-100">
                <Loader2 className="animate-spin text-[#DC2626]" size={36} />
                <p className="text-slate-400 font-bold font-jakarta text-xs uppercase tracking-widest">
                  Fetching Examinations...
                </p>
              </div>
            ) : filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredExams.map((exam) => {
                  // Guard: if slug is missing, don't render a broken link
                  if (!exam.slug) return null;

                  return (
                    <Link
                      key={exam._id}
                      to={`/all-exams/exam-details/${exam.slug}`}
                      className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col relative card-hover"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-[0.1em] border border-slate-100 group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors font-jakarta">
                          {exam.category}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-slate-200 group-hover:text-[#DC2626] transition-colors"
                        />
                      </div>

                      <h4 className="text-md font-bold text-[#0B1C33] mb-3 font-poppins group-hover:text-[#DC2626] transition-colors uppercase leading-tight">
                        {exam.name}
                      </h4>

                      <p className="text-[#475569] text-xs mb-8 line-clamp-2 leading-relaxed font-outfit h-9">
                        {exam.description ||
                          "Comprehensive details regarding eligibility, pattern and important dates."}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock size={12} className="text-[#DC2626]" />
                          <span className="text-[10px] font-bold uppercase font-jakarta">
                            {exam.duration || "3 Hours"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin size={12} className="text-[#DC2626]" />
                          <span className="text-[10px] font-bold uppercase font-jakarta">
                            {exam.mode || "Online"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-3xl p-16 text-center">
                <Search size={40} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-[#0B1C33] font-poppins">
                  No Matches Found
                </h3>
                <p className="text-slate-400 text-xs mt-2 font-outfit">
                  Try a different search or category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 text-[#DC2626] font-bold text-xs uppercase tracking-widest font-jakarta hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* ✅ Popup Form logic yahan add karein */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
            {/* White wrapper for the form to ensure clean rounded corners */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Aapka component jisme close button pehle se hai */}
              <EnquiryForm onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserExams;
