import React from "react";
import EnquiryForm from "../../enquiry/EnquiryForm";
import { useState } from "react";

const CourseDetailsHeroCard = ({ course }) => {
  // ✅ GUARD: jab tak course load na ho
  if (!course) return null;
  const [showBrochureForm, setShowBrochureForm] = useState(false);

  const quickLinks = [
    { name: "Overview", icon: "fa-eye" },
    { name: "Highlights", icon: "fa-star" },
    { name: "Colleges", icon: "fa-university" },
    { name: "FAQs", icon: "fa-question-circle" },
  ];

  return (
    <div className="bg-[#F8FAFC] font-sans text-slate-600 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-xs font-medium text-slate-500 mb-6 uppercase tracking-wide">
          <span className="hover:text-[#DC2626]">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#DC2626]">Courses</span>
          <span className="mx-2">/</span>
          <span className="text-[#0B1C33] font-bold">{course.title}</span>
        </nav>

        {/* Jump To */}
        <div className="relative mb-8">
          <div className="bg-white/80 backdrop-blur-md p-2 pr-4 rounded-2xl shadow border flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border">
              <div className="w-8 h-8 rounded-full bg-[#0B1C33] flex items-center justify-center text-white text-xs">
                <i className="fa-solid fa-location-arrow"></i>
              </div>
              <span className="font-bold text-[#0B1C33] text-sm">Jump To:</span>
            </div>

            <div className="flex-1 overflow-x-auto flex gap-2 scrollbar-hide">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={`#${link.name.toLowerCase()}`}
                  className="px-4 py-2.5 bg-white border rounded-xl text-xs font-bold text-slate-600 hover:bg-[#DC2626] hover:text-white transition-all"
                >
                  <i className={`fa-solid ${link.icon}`}></i> {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="bg-white p-3 rounded-[2rem] shadow border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* IMAGE */}
            <div className="lg:col-span-5 relative h-64 rounded-2xl overflow-hidden">
              <img
                src={course.heroImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-3 py-1 bg-[#DC2626] text-[10px] font-bold rounded-full">
                  {course.category}
                </span>
                {course.subtitle && (
                  <p className="font-bold mt-1">{course.subtitle}</p>
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-7 py-2 pr-4">
              <h1 className="text-3xl font-extrabold text-[#0B1C33] mb-4">
                {course.title}
              </h1>

              <p className="text-lg mb-6">{course.shortAbout}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {course.duration && (
                  <span className="bg-slate-50 px-4 py-2 rounded-xl border text-sm font-medium">
                    {course.duration}
                  </span>
                )}

                {course.level && (
                  <span className="bg-slate-50 px-4 py-2 rounded-xl border text-sm font-medium">
                    {course.level}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                {course.syllabusPdf && (
                  <button

                    className="px-8 py-3 bg-[#DC2626] text-white font-bold rounded-xl"
                    onClick={() => setShowBrochureForm(true)}
                  >
                    Download Brochure
                  </button>
                )}
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
                      defaultCourse={course?.courseGroups?.[0] || ""}
                      onClose={() => setShowBrochureForm(false)}
                      onSuccess={() => {
                        setShowBrochureForm(false);
                        if (course?.syllabusPdf) {
                          window.open(course.syllabusPdf, "_blank");
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { scrollbar-width: none; }
        `}</style>
    </div>
  );
};

export default CourseDetailsHeroCard;
