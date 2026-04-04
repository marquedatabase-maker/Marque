import React from "react";
// import EnquiryForm from "../../enquiry/CollegeDetailEnquiryForm";
import { useState } from "react";
import EnquiryForm from "../../enquiry/EnquiryForm";
import CollegeDetailEnquiryForm from "../../enquiry/CollegeDetailEnquiryForm";
const CourseRightSideSection = ({ course }) => {
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        {/* --- Form Card (UNCHANGED) --- */}
        <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100">
          <CollegeDetailEnquiryForm />
        </div>

        {/* --- Download Syllabus (BACKEND CONNECTED) --- */}
        {course?.syllabusPdf && (
          <button
           onClick={() => setShowBrochureForm(true)}
            className="bg-white w-full p-1 rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-100 group cursor-pointer hover:shadow-lg transition-all block"
          >
            <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#DC2626] text-2xl group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-file-pdf"></i>
              </div>

              <div>
                <h4 className="font-bold text-[#0B1C33] text-sm group-hover:text-[#DC2626] transition-colors">
                  Download Syllabus
                </h4>
                <p className="text-xs text-slate-500">PDF Guide</p>
              </div>
               

              <i className="fa-solid fa-download ml-auto text-[#0B1C33] group-hover:text-[#DC2626]"></i>
            </div>
          </button>
        )}
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
  );
};

export default CourseRightSideSection;
