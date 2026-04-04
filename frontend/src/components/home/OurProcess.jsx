import logo from "../../assets/images/marque-logo.png";
import { useState } from "react";
import EnquiryForm from "../enquiry/EnquiryForm";
const OurProcess = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="relative w-full min-h-[600px] lg:h-[70vh] flex items-center py-16 lg:py-0 overflow-hidden bg-white">

      {/* dotted background */}
      <div
        className="absolute right-0 top-1/4 w-64 h-64 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 2px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1300px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT – image collage */}
          <div className="relative h-[420px] sm:h-[460px] lg:h-[500px]">
            <div className="grid grid-cols-12 grid-rows-12 h-full gap-4">

              {/* main image */}
              <div className="col-span-6 row-span-12 relative rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
                  alt="Counseling Session"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1C33]">Verified</p>
                    <p className="text-[10px] text-slate-500">Partner Colleges</p>
                  </div>
                </div>
              </div>

              {/* success card */}
              <div className="col-span-3 row-span-4 bg-[#DC2626] rounded-2xl flex flex-col items-center justify-center text-white shadow-md hover:-translate-y-1 transition">
                <span className="text-3xl font-extrabold">98%</span>
                <span className="text-[10px] uppercase tracking-wide text-center">
                  Success Rate
                </span>
              </div>

              {/* support card */}
              <div className="col-span-3 row-span-4 bg-[#0B1C33] rounded-2xl flex flex-col items-center justify-center text-white shadow-md hover:-translate-y-1 transition">
                <span className="text-2xl font-extrabold">24/7</span>
                <span className="text-[10px] uppercase tracking-wide">
                  Support
                </span>
              </div>

              {/* second image */}
              <div className="col-span-6 row-span-8 relative rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] group">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop"
                  alt="Happy Students"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </div>
          </div>

          {/* RIGHT – content */}
          <div className="flex flex-col justify-center">

            {/* section tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-[0.2em]">
                Our Process
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#0B1C33] leading-[1.15] mb-5">
              A Seamless Path From <br />
              <span className="text-slate-400">Confusion to College</span>
            </h2>

            <p className="text-sm lg:text-base text-slate-500 mb-10 max-w-xl">
              We simplify the complex admission journey. From selecting the right
              course to getting your offer letter, our experts guide you through
              every milestone.
            </p>

            {/* steps */}
            <div className="space-y-8 mb-10">

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B1C33] font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1C33] mb-1">
                    Expert Career Counseling
                  </h4>
                  <p className="text-sm text-slate-500">
                    Our AI-driven assessment matches your profile with the
                    best-fit universities and courses.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#DC2626] font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1C33] mb-1">
                    Application & Admission
                  </h4>
                  <p className="text-sm text-slate-500">
                    We handle paperwork, SOPs, and tracking for a hassle-free
                    admission experience.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-8 border-t border-slate-100 pt-8">

              <button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition active:scale-95 flex items-center gap-2"
              onClick={() => setOpenForm(true)}
              >
                
                Start Journey →

              </button>
              {openForm && (
                <div className="fixed inset-0 z-[9999]">
                  <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/70 ">
                    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
                      <EnquiryForm onClose={() => setOpenForm(false)} />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="CEO"
                  className="w-10 h-10 rounded-full object-full border-2 border-white shadow-md bg-red-600"
                />
                <div>
                  <div className="text-xl text-[#0B1C33] font-serif">
                    Marque Career
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    CEO & Founder
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurProcess;
