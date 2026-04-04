import React from 'react';
import { Landmark, ListChecks, BarChart3, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Academic Profiling",
    desc: "Understanding your academic background, strengths, and areas for improvement to build a strong foundation.",
  },
  {
    title: "Goal Assessment",
    desc: "Identifying your career aspirations and long-term academic objectives to align with the right institutions.",
  },
  {
    title: "Course & College Shortlisting",
    desc: "Data-driven college recommendations that match your profile, budget, and location preferences.",
  },
  {
    title: "Application Support",
    desc: "Complete documentation assistance, SOP guidance, and application form filling support.",
  },
  {
    title: "Final Selection",
    desc: "Personalized counselling to help you make the final decision and secure your admission.",
  },
];

const ecosystemItems = [
  { label: "1000+ Colleges", icon: <Landmark className="text-[#DC2626] mb-2" size={24} /> },
  { label: "Smart Shortlist", icon: <ListChecks className="text-[#DC2626] mb-2" size={24} /> },
  { label: "Real Insights", icon: <BarChart3 className="text-[#DC2626] mb-2" size={24} /> },
  { label: "Alumni Network", icon: <GraduationCap className="text-[#DC2626] mb-2" size={24} /> },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#DC2626] font-bold text-sm uppercase tracking-wider sm:text-center">
              Our Process
            </span>
            <h2 className="text-3xl font-bold text-[#0B1C33] mt-2 ">
              What We Do
            </h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm md:text-right">
            Complete support across every stage of your admission journey, from
            profile assessment to final selection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Timeline */}
          <div className="pl-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative pl-12 pb-12 border-l-2 border-slate-200 last:border-l-transparent"
              >
                <div className="absolute left-[-18px] top-0 w-9 h-9 bg-[#0B1C33] text-white rounded-full flex items-center justify-center font-bold border-4 border-white shadow">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-[#0B1C33] mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Sticky Ecosystem Card */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                <h3 className="text-2xl font-bold text-[#0B1C33] mb-4">
                  Our Ecosystem
                </h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                  Our platform brings together colleges, courses, entrance exams,
                  and locations in one structured ecosystem.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {ecosystemItems.map((item) => (
                    <div
                      key={item.label}
                      className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      {item.icon}
                      <span className="font-bold text-sm text-[#0B1C33]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;