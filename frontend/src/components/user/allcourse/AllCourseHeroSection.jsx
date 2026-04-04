import React from "react";

const AllCourseHeroSection = ({ search, setSearch }) => {
  return (
    <div className="bg-[#F8FAFC] font-sans text-[#475569] pt-10">
      {/* === HEADER SECTION === */}
      <header className="bg-[#0B1C33] relative pt-16 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            Academic Programs
          </span>

          <h1 className="text-3xl md:text-4.5xl font-bold text-white mb-4 font-[Poppins]">
            Find Your Perfect Course
          </h1>

          <p className="text-slate-300 text-sm mb-5">
            Browse 50+ Undergraduate and Postgraduate programs across 6 major
            domains.
          </p>

          {/* 🔍 SEARCH BAR */}
          <div className="bg-white p-1 rounded-[50px] flex items-center max-w-3xl mx-auto shadow-lg">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update parent state
              className="flex-1 border-none outline-none px-6 py-3 text-base text-[#475569] rounded-[50px]"
              placeholder="Search for B.Tech, MBA, MBBS..."
            />

            <button
              type="button"
              className="w-12 h-12 bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer border-none"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AllCourseHeroSection;
