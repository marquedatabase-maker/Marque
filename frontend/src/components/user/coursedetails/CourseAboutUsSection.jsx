import React, { useState } from "react";

const CourseAboutUsSection = ({ course }) => {
  return (
    <div className="lg:col-span-8 space-y-10">
      {/* --- Notification --- */}
      <div className="bg-blue-50/50 border-l-4 border-[#0B1C33] p-5 rounded-r-2xl flex items-start gap-4">
        <div className="p-2 bg-[#0B1C33] text-white rounded-lg shrink-0 shadow-sm">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div>
          <h4 className="text-[#0B1C33] font-bold font-[Outfit] mb-1 text-lg">
            Latest Updates
          </h4>
          <p className="text-sm text-slate-600">
            Stay updated with the latest announcements and admission related
            information for this course.
          </p>
        </div>
      </div>

      {/* --- Overview --- */}
      <div
        id="overview"
        className="bg-white p-8 rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-100"
      >
        <h2 className="text-2xl font-[Outfit] font-bold text-[#0B1C33] mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-[#DC2626] rounded-full"></span>
          About the Course
        </h2>

        <div className="prose text-slate-600 space-y-4 leading-relaxed font-medium">
          <p>{course.aboutCourse}</p>
        </div>
      </div>

      {/* --- Highlights Table --- */}
      <div
        id="highlights"
        className="bg-white rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-[Outfit] font-bold text-[#0B1C33]">
            Course Highlights
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              {course.highlights?.map((item, idx) => (
                <tr key={idx}>
                  <td className="w-1/3 p-4 font-bold text-[#0B1C33] bg-slate-50/30">
                    {item.label}
                  </td>
                  <td className="p-4 text-slate-600">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FAQs Accordion --- */}
      <div
        id="faqs"
        className="bg-white p-8 rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-100"
      >
        <h2 className="text-2xl font-[Outfit] font-bold text-[#0B1C33] mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {course.faqs?.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- FAQ Item ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 text-left transition-colors"
      >
        <span className="font-bold text-[#0B1C33] text-sm">{question}</span>
        <i
          className={`fa-solid fa-chevron-down text-[#DC2626] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      <div
        className={`bg-slate-50 px-4 overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="py-4 text-sm text-slate-600">{answer}</p>
      </div>
    </div>
  );
};

export default CourseAboutUsSection;
