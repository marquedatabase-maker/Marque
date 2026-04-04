import React from 'react';
import { Lightbulb, ListChecks, Handshake, Binoculars } from "lucide-react";

const values = [
  {
    title: "Transparent Guidance",
    desc: "No hidden agendas. Recommendations based solely on your future.",
    icon: <Lightbulb className="text-[#DC2626] mb-4" size={24} />,
  },
  {
    title: "Process-Driven",
    desc: "Structured counselling with clear milestones and outcomes.",
    icon: <ListChecks className="text-[#DC2626] mb-4" size={24} />,
  },
  {
    title: "Ethical Support",
    desc: "Guidance aligned with your interests, not our incentives.",
    icon: <Handshake className="text-[#DC2626] mb-4" size={24} />,
  },
  {
    title: "Long-Term Vision",
    desc: "Focus on career progression and alumni success.",
    icon: <Binoculars className="text-[#DC2626] mb-4" size={24} />,
  },
];

const ValuesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12">

          {/* Left */}
          <div className="md:w-1/3">
            <span className="text-[#DC2626] font-bold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl font-bold text-[#0B1C33] mt-2 mb-6">
              Why Students Trust Us
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We don't believe in one-size-fits-all counselling. Every student is
              different — and so is every admission journey.
            </p>
            <button className="px-6 py-3 border-2 border-[#0B1C33] text-[#0B1C33] font-bold rounded-xl hover:bg-[#0B1C33] hover:text-white transition shadow-sm">
              Read Reviews
            </button>
          </div>

          {/* Right */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Added Icon Here */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {v.icon}
                </div>
                
                <h4 className="font-bold text-[#0B1C33] mb-3 text-lg">{v.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;