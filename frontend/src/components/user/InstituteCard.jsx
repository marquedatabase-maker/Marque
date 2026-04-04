import React from "react";
import EnquiryForm from "../enquiry/EnquiryForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import EnquiryModal from "../enquiry/EnquiryModal";
const InstituteCard = ({ data }) => {
  // Destructure with Safety Checks
  const {
    name = "Institute Name",
    city = "City",
    state = "State",
    type = "Private",
    ranking,
    examsAccepted,
    stream = [],

    courseGroup = [],
  } = data || {};
  const [openForm, setOpenForm] = useState(false);
  const brochureUrl = data?.brochure?.url || null;
  const [showBrochureForm, setShowBrochureForm] = useState(false);

  // 🔥 FIX: ROBUST IMAGE LOGIC
  // Ye logic check karega ki image kaha chupi hai
  const instituteImage =
    data?.image?.url || // Case 1: Agar backend object bhej rha h {image: {url: "..."}}
    data?.imageUrl || // Case 2: Agar direct key hai {imageUrl: "..."}
    data?.image || // Case 3: Agar image key hi string hai {image: "..."}
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; // Fallback

  // Helper: Parse Exams
  const examsList = Array.isArray(examsAccepted)
    ? examsAccepted
    : examsAccepted?.split(",")?.filter((e) => e) || ["NEET", "JEE"];

  // Helper: Tags
  const displayTags = [
    ...(Array.isArray(stream) ? stream : [stream]),
    ...(Array.isArray(courseGroup) ? courseGroup : [courseGroup]),
  ]
    .filter((t) => t)
    .slice(0, 4);

  return (
    <article className="group relative w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out flex flex-col md:flex-row">
      {/* 1. LEFT: IMAGE SECTION */}
      <div className="relative w-full md:w-[320px] lg:w-[340px] shrink-0 h-40 md:h-auto overflow-hidden bg-slate-100">
        {/* ✅ FIX: Using the smart 'instituteImage' variable here */}
        <Link to={`/all-college/${data?.slug}`} className="block w-full h-full">
          <img
            src={instituteImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
            }}
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 md:opacity-60 pointer-events-none"></div>

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#0B1C33] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 border border-white/50">
            <span className="text-yellow-500">★</span> 4.8/5 Rating
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-[#DC2626]/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-sm border border-white/20">
            {ranking || "Rank #5 in NIRF"}
          </span>
        </div>
      </div>

      {/* 2. RIGHT: CONTENT SECTION (Same as before) */}
      <div className="flex-1 p-3 md:p-3 flex flex-col justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2  ">
            <span
              className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider border ${type === "Government"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : "bg-blue-50 text-blue-700 border-blue-100"
                }`}
            >
              {type}
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium ml-auto">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {city}, {state}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#DC2626] transition-colors mb-2 ">
            {name}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mt-3 mb-3">
            <span className="text-xs font-bold text-[#0B1C33] uppercase tracking-wide mr-1">
              Exams:
            </span>
            {examsList.length > 0 ? (
              examsList.map((exam, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-700"
                >
                  {exam}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">
                Not Specified
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-slate-100/50">
            {displayTags.length > 0 ? (
              displayTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-xs font-medium text-slate-400">
                Multiple Courses Available
              </span>
            )}
            <p className="text-xs text-slate-500 font-semibold mt-1">
              + {data.totalCourses || 0} Courses
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setOpenForm(true)}
              className="w-full sm:flex-1 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold py-1.5 px-6 rounded-xl shadow-lg shadow-red-500/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Apply Now</span>
              {/* <svg
                className="w-4 h-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg> */}
            </button>
            {openForm && <EnquiryModal onClose={() => setOpenForm(false)} />}

            <button
              className="w-full sm:w-auto bg-white border-2 border-[#0B1C33] text-[#0B1C33] hover:bg-[#0B1C33] hover:text-white font-bold py-1 px-6 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              onClick={() => setShowBrochureForm(true)}
            >
              <svg
                className="w-4 h-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Brochure
            </button>

            <Link
              to={`/all-college/${data?.slug}`}
              className="text-sm font-bold text-slate-400 hover:text-[#0B1C33] transition-colors px-4 py-1 sm:ml-auto whitespace-nowrap"
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
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
              defaultCourse={data?.courseGroups?.[0] || ""}
              onClose={() => setShowBrochureForm(false)}
              onSuccess={() => {
                setShowBrochureForm(false);
                if (data?.brochure?.url) {
                  window.open(data.brochure.url, "_blank");
                }
              }}
            />
          </div>
        </div>
      )}
    </article>
  );
};

export default InstituteCard;
