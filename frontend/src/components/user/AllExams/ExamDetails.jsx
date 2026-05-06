import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MessageCircle,
  Download,
  Bell,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Loader2,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  MapPin,
  Star,
} from "lucide-react";

const API_BASE =import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ExamDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [collegesLoading, setCollegesLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) fetchExamDetails();
    fetchNotifications();
  }, [slug]);

  useEffect(() => {
    if (exam?.name) {
      fetchColleges(exam.name);
    }
  }, [exam]);

  const fetchNotifications = async () => {
    try {
      setNotifLoading(true);
      const res = await axios.get(`${API_BASE}/api/notifications`);
      if (res.data.success) {
        const examAlerts = res.data.data
          .filter(
            (n) => n.category === "Exam Alerts" && n.status === "Published",
          )
          .slice(0, 3);
        setNotifications(examAlerts);
      }
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setNotifications([]);
    } finally {
      setNotifLoading(false);
    }
  };

  const fetchColleges = async (examName) => {
    try {
      setCollegesLoading(true);
      const res = await axios.get(`${API_BASE}/api/institutes`, {
        params: { examsAccepted: examName },
      });
      if (res.data.institutes) {
        setColleges(res.data.institutes.slice(0, 6));
      }
    } catch (err) {
      console.error("Colleges fetch error:", err);
      setColleges([]);
    } finally {
      setCollegesLoading(false);
    }
  };

  const fetchExamDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE}/api/Exams/slug/${slug}`);
      if (res.data.success && res.data.data) {
        setExam(res.data.data);
      } else {
        setError("Exam not found.");
      }
    } catch (err) {
      console.error("Error fetching exam details:", err);
      if (err.response?.status === 404) {
        setError("This exam does not exist or has been removed.");
      } else {
        setError("Failed to load exam details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-red-600" size={48} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Loading exam details...
        </p>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 text-center max-w-md w-full">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-black text-[#0B1C33] mb-2 font-poppins">
            Exam Not Found
          </h2>
          <p className="text-slate-400 text-sm mb-6 font-outfit">
            {error || "The exam you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/user/exams")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white font-bold rounded-2xl hover:bg-red-700 transition-all text-sm"
          >
            <ArrowLeft size={16} /> Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const about = exam.aboutSection || {};
  const aboutTitle = about.title || "";
  const aboutKeyPoints = about.keyPoints || [];
  const aboutNote = about.note || "";
  const hasAboutSection = aboutTitle || aboutKeyPoints.length > 0 || aboutNote;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Outfit'] text-[#475569]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Poppins:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-outfit  { font-family: 'Outfit', sans-serif; }
        @keyframes pulse-green {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
          70%  { box-shadow: 0 0 0 15px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .whatsapp-pulse { animation: pulse-green 2s infinite; }
        .faq-body { transition: max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.3s ease; }
        .toc-link { transition: all 0.2s ease; }
        .toc-link:hover { background: #FEF2F2; color: #DC2626; }
        .note-box { border-left: 4px solid #3b82f6; }
      `}</style>

      {/* ── WHATSAPP FLOAT ── */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl whatsapp-pulse hover:scale-110 transition-transform group"
      >
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-white text-[#0B1C33] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
          Chat with Expert
        </span>
        <MessageCircle size={24} fill="currentColor" />
      </a>

      {/* ══════════════════════════════════════════
          HEADER — Simple solid dark blue, NO dot pattern
          pt-20 sm:pt-24 = navbar height + spacing
      ══════════════════════════════════════════ */}
      <header className="bg-[#0B1C33] text-white pt-24 sm:pt-24 pb-8 sm:pb-10 font-jakarta">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap text-[10px] font-bold text-slate-400 mb-4 sm:mb-6 uppercase tracking-widest gap-1 items-center">
            <Link to="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link
              to="/user/exams"
              className="hover:text-red-400 transition-colors"
            >
              Exams
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white capitalize">{exam.category}</span>
            <span className="opacity-40">/</span>
            <span className="text-red-400 truncate max-w-[140px] sm:max-w-xs lg:max-w-none">
              {exam.name}
            </span>
          </nav>

          {/* Top row: logo + title + CTA buttons */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Left: initials box + title */}
            <div className="flex items-start gap-3 sm:gap-5 min-w-0 flex-1">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center text-[#DC2626] font-black shadow-2xl border-4 border-white/10 shrink-0 font-poppins overflow-hidden">
                <span className="text-sm sm:text-xl leading-none text-center px-1 truncate max-w-[56px] sm:max-w-[72px]">
                  {exam.name.split(" ")[0].slice(0, 4)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start gap-2 mb-1">
                  <h1
                    className="font-black font-poppins text-white leading-tight uppercase tracking-tight break-words"
                    style={{
                      fontSize: "clamp(1.25rem, 3.5vw, 2.75rem)",
                      wordBreak: "break-word",
                    }}
                  >
                    {exam.name}
                  </h1>
                  <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-widest shrink-0 self-start mt-1">
                    National Level
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-outfit capitalize">
                  {exam.category} Entrance Exam
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
              {exam.brochureUrl ? (
                <a
                  href={exam.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none sm:min-w-[180px] px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-black rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-2 text-[11px] sm:text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Download PDF <Download size={14} />
                </a>
              ) : (
                <button
                  disabled
                  className="flex-1 sm:flex-none sm:min-w-[180px] px-4 sm:px-6 py-2.5 sm:py-3.5 bg-slate-600 text-slate-400 font-black rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 text-[11px] sm:text-sm uppercase tracking-wider cursor-not-allowed whitespace-nowrap"
                >
                  No Brochure <Download size={14} />
                </button>
              )}
              <button className="flex-1 sm:flex-none sm:min-w-[180px] px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl sm:rounded-2xl transition-all text-[11px] sm:text-sm tracking-wide whitespace-nowrap">
                Get Counselling
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed font-light font-outfit max-w-4xl line-clamp-3 sm:line-clamp-none">
            {exam.description || "Comprehensive entrance examination details."}
          </p>

          {/* Info boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl">
            <InfoBox label="Mode" value={exam.mode || "Online"} />
            <InfoBox
              label="Frequency"
              value={exam.frequency || "Once a Year"}
            />
            <InfoBox label="Duration" value={exam.duration || "3 Hours"} />
            <InfoBox label="Colleges" value={exam.collegesCount || "50+"} />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-16 sm:pb-24 font-jakarta">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          {/* ── LEFT CONTENT ── */}
          <div className="lg:col-span-9 space-y-5 sm:space-y-8">
            {/* 1. ABOUT */}
            {hasAboutSection && (
              <section
                id="about"
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
              >
                <SectionTitle>{aboutTitle || "About This Exam"}</SectionTitle>
                <div className="text-slate-600 leading-relaxed text-sm sm:text-base space-y-4 font-outfit">
                  {aboutKeyPoints.filter((p) => p.trim() !== "").length > 0 && (
                    <ul className="space-y-3 mb-4">
                      {aboutKeyPoints
                        .filter((p) => p.trim() !== "")
                        .map((point, i) => {
                          const colonIdx = point.indexOf(":");
                          const hasBold = colonIdx > -1 && colonIdx < 30;
                          return (
                            <li key={i} className="flex gap-3 items-start">
                              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                              <span>
                                {hasBold ? (
                                  <>
                                    <strong className="text-[#0B1C33]">
                                      {point.substring(0, colonIdx)}:
                                    </strong>
                                    {point.substring(colonIdx + 1)}
                                  </>
                                ) : (
                                  point
                                )}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                  {aboutNote && (
                    <div className="note-box bg-blue-50 p-4 sm:p-5 rounded-r-2xl">
                      <p className="text-sm text-blue-800 font-semibold leading-relaxed">
                        <strong>Note: </strong>
                        {aboutNote}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 2. LATEST UPDATES */}
            <section
              id="updates"
              className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
            >
              <SectionTitle
                icon={<Bell className="text-[#DC2626]" size={20} />}
              >
                Latest Updates
              </SectionTitle>
              {notifLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100 animate-pulse"
                    >
                      <div className="w-10 h-5 bg-slate-200 rounded-full shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8 text-slate-300">
                  <Bell size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold font-outfit">
                    No exam alerts right now. Check back later.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {notifications.map((notif, i) => {
                    const badgeStyle = notif.isPinned
                      ? "bg-red-100 text-red-700"
                      : i === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700";
                    const badgeLabel = notif.isPinned
                      ? "Pinned"
                      : i === 0
                        ? "New"
                        : "Info";
                    return (
                      <a
                        key={notif._id}
                        href={notif.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 bg-slate-50 hover:bg-blue-50/50 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group"
                      >
                        <span
                          className={`text-[9px] font-black px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-tighter shrink-0 mt-0.5 ${badgeStyle}`}
                        >
                          {badgeLabel}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-normal font-outfit group-hover:text-blue-700 transition-colors">
                            {notif.title}
                          </p>
                          {notif.shortSnippet && (
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-outfit line-clamp-2">
                              {notif.shortSnippet}
                            </p>
                          )}
                          <p className="text-[10px] text-slate-400 mt-1.5 font-outfit">
                            {new Date(
                              notif.displayDate || notif.createdAt,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0 mt-1">
                          &#8599;
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-3 font-outfit">
                * Showing latest Exam Alerts. Click any update to view details.
              </p>
            </section>

            {/* 3. IMPORTANT DATES */}
            {exam.importantDates && exam.importantDates.length > 0 && (
              <section
                id="dates"
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
              >
                <SectionTitle>Important Dates</SectionTitle>
                <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse min-w-[320px]">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-3 sm:p-4 text-xs font-black uppercase text-slate-400 tracking-widest border-b">
                          Event
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-black uppercase text-[#DC2626] tracking-widest border-b">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {exam.importantDates.map((d, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-[#0B1C33] font-jakarta">
                            {d.event}
                          </td>
                          <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-600 font-outfit whitespace-nowrap">
                            {d.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 4. EXAM STRUCTURE */}
            {exam.structure && exam.structure.length > 0 && (
              <section
                id="pattern"
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
              >
                <SectionTitle>Examination Pattern</SectionTitle>
                <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse min-w-[380px]">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-3 sm:p-4 text-xs font-black uppercase text-slate-400 tracking-widest border-b">
                          Feature
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-black uppercase text-[#DC2626] tracking-widest border-b text-center">
                          {exam.eligibilityTitle1 || "Standard"}
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-black uppercase text-[#0B1C33] tracking-widest border-b text-center">
                          {exam.eligibilityTitle2 || "Advanced"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {exam.structure.map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-3 sm:p-4 text-xs sm:text-sm font-black text-[#0B1C33] font-jakarta">
                            {row.feature}
                          </td>
                          <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center font-outfit">
                            {row.col1}
                          </td>
                          <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center font-outfit">
                            {row.col2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 5. ELIGIBILITY */}
            {(exam.eligibilityPoints1 || exam.eligibilityPoints2) && (
              <section
                id="eligibility"
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
              >
                <SectionTitle>Eligibility Criteria</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {exam.eligibilityPoints1 && (
                    <EligibilityBox
                      title={exam.eligibilityTitle1}
                      points={exam.eligibilityPoints1}
                    />
                  )}
                  {exam.eligibilityPoints2 && (
                    <EligibilityBox
                      title={exam.eligibilityTitle2}
                      points={exam.eligibilityPoints2}
                    />
                  )}
                </div>
              </section>
            )}

            {/* 6. PARTICIPATING COLLEGES */}
            <section
              id="colleges"
              className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
            >
              <SectionTitle>Participating Colleges</SectionTitle>
              {collegesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl animate-pulse"
                    >
                      <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : colleges.length === 0 ? (
                <div className="text-center py-10 text-slate-300">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MapPin size={28} className="opacity-40" />
                  </div>
                  <p className="text-xs font-bold font-outfit text-slate-400">
                    No colleges found that accept {exam.name}.
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1 font-outfit">
                    Check back later or contact counsellor.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {colleges.map((college, i) => (
                    <div
                      key={college._id || i}
                      onClick={() =>
                        navigate(`/user/collegedetail/${college._id}`)
                      }
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-slate-200 rounded-xl sm:rounded-2xl hover:shadow-md hover:border-slate-300 transition-all bg-slate-50/50 group cursor-pointer"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0 group-hover:bg-[#0B1C33] transition-all overflow-hidden">
                        {college.collegeLogo?.url ? (
                          <img
                            src={college.collegeLogo.url}
                            alt={college.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-[10px] font-black text-[#0B1C33] group-hover:text-white transition-colors leading-none text-center px-1">
                            {college.name
                              .split(" ")[0]
                              .slice(0, 3)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-black text-[#0B1C33] text-sm truncate font-jakarta">
                          {college.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {college.ranking && (
                            <>
                              <span className="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                                <Star size={10} fill="currentColor" />{" "}
                                {college.ranking}
                              </span>
                              <span className="text-slate-300">•</span>
                            </>
                          )}
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-outfit truncate">
                            <MapPin size={10} /> {college.city}, {college.state}
                          </span>
                          {college.type && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-[10px] text-slate-400 font-outfit">
                                {college.type}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {colleges.length > 0 && (
                <button className="w-full mt-4 sm:mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-black rounded-xl sm:rounded-2xl hover:border-[#0B1C33] hover:text-[#0B1C33] transition-all uppercase tracking-wider">
                  View All {exam.collegesCount || colleges.length + "+"}{" "}
                  Colleges →
                </button>
              )}
              <p className="text-[10px] text-slate-400 mt-2 font-outfit text-center">
                * Colleges jo <strong>{exam.name}</strong> accept karte hain.
                Actual list vary kar sakti hai.
              </p>
            </section>

            {/* 7. FAQs */}
            {exam.faqs && exam.faqs.length > 0 && (
              <section
                id="faq"
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-200 scroll-mt-28"
              >
                <SectionTitle>FAQ Corner</SectionTitle>
                <div className="space-y-3 sm:space-y-4">
                  {exam.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className={`border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                        activeFaq === i
                          ? "border-[#0B1C33] ring-2 ring-[#0B1C33]/10 shadow-lg"
                          : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full p-4 sm:p-5 text-left flex justify-between items-center group gap-3"
                      >
                        <span className="font-bold text-[#0B1C33] leading-relaxed tracking-tight text-xs sm:text-sm">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`transition-transform duration-300 shrink-0 ${
                            activeFaq === i
                              ? "rotate-180 text-red-500"
                              : "text-slate-300 group-hover:text-slate-500"
                          }`}
                          size={18}
                        />
                      </button>
                      <div
                        className={`faq-body overflow-hidden ${activeFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm leading-relaxed text-[#475569] border-t border-slate-100 bg-white font-outfit">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          {/* END LEFT CONTENT */}

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">
              {/* Guide Index */}
              <div className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 sm:p-4 border-b border-slate-100">
                  <h4 className="font-black text-[#0B1C33] text-[10px] uppercase tracking-widest font-jakarta">
                    Guide Index
                  </h4>
                </div>
                <nav className="p-2 sm:p-3 flex flex-col gap-0.5">
                  {hasAboutSection && <TocLink target="about" label="About" />}
                  <TocLink target="updates" label="Latest Updates" />
                  {exam.importantDates?.length > 0 && (
                    <TocLink target="dates" label="Important Dates" />
                  )}
                  {exam.structure?.length > 0 && (
                    <TocLink target="pattern" label="Exam Pattern" />
                  )}
                  {(exam.eligibilityPoints1 || exam.eligibilityPoints2) && (
                    <TocLink target="eligibility" label="Eligibility" />
                  )}
                  <TocLink target="colleges" label="Participating Colleges" />
                  {exam.faqs?.length > 0 && (
                    <TocLink target="faq" label="FAQs" />
                  )}
                </nav>
              </div>

              {/* Brochure Widget */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={26} className="text-[#DC2626]" />
                </div>
                <h4 className="font-black text-[#0B1C33] text-sm mb-1 uppercase tracking-tight font-jakarta">
                  Exam Brochure
                </h4>
                <p className="text-[11px] text-slate-500 mb-4 sm:mb-6 px-2 font-outfit">
                  Download official document with syllabus & marking scheme.
                </p>
                <a
                  href={exam.brochureUrl || "#"}
                  target={exam.brochureUrl ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`block w-full py-2.5 sm:py-3 border-2 font-black rounded-xl sm:rounded-2xl text-[10px] uppercase tracking-widest transition-all font-jakarta ${
                    exam.brochureUrl
                      ? "border-[#0B1C33] text-[#0B1C33] hover:bg-[#0B1C33] hover:text-white"
                      : "border-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {exam.brochureUrl ? "Download Document" : "Not Available Yet"}
                </a>
              </div>

              {/* Back to Exams */}
              <button
                onClick={() => navigate("/user/exams")}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-500 hover:text-[#0B1C33] hover:border-slate-400 font-bold text-xs rounded-xl sm:rounded-2xl transition-all font-jakarta uppercase tracking-wider"
              >
                <ArrowLeft size={13} /> Back to All Exams
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// ── Helper Components ─────────────────────────────────────────────────────────

const SectionTitle = ({ children, icon }) => (
  <h2 className="text-xl sm:text-2xl font-black text-[#0B1C33] mb-4 sm:mb-6 font-poppins flex items-center gap-3">
    {icon || (
      <span className="w-1.5 h-6 sm:h-8 bg-red-600 rounded-full shrink-0" />
    )}
    {children}
  </h2>
);

const InfoBox = ({ label, value }) => (
  <div className="bg-white/10 border border-white/10 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl backdrop-blur-md">
    <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black tracking-[0.1em] mb-0.5 sm:mb-1 font-jakarta">
      {label}
    </p>
    <p className="font-black text-white text-xs sm:text-sm leading-tight uppercase font-poppins">
      {value}
    </p>
  </div>
);

const EligibilityBox = ({ title, points }) => (
  <div className="bg-slate-50/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 flex flex-col h-full">
    <h4 className="font-black text-[#DC2626] mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-jakarta">
      <CheckCircle size={13} /> {title || "Requirements"}
    </h4>
    <div className="space-y-2 sm:space-y-3 flex-1">
      {points
        ?.split("\n")
        .filter((p) => p.trim() !== "")
        .map((point, i) => (
          <div
            key={i}
            className="flex gap-2 sm:gap-3 text-xs leading-relaxed font-semibold text-slate-600 font-outfit"
          >
            <ArrowRight size={12} className="shrink-0 text-slate-300 mt-0.5" />
            {point}
          </div>
        ))}
    </div>
  </div>
);

const TocLink = ({ target, label }) => (
  <a
    href={`#${target}`}
    className="toc-link px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold text-slate-500 flex items-center justify-between group font-jakarta"
  >
    {label}
    <ChevronDown
      size={13}
      className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all"
    />
  </a>
);

export default ExamDetails;
