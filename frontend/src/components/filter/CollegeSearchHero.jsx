import { useState, useEffect } from "react";

const CollegeSearchHero = ({ institutes = [], onSearch }) => {
  const [query, setQuery] = useState("");

  // 🔥 LIVE SEARCH (type karte hi)
  useEffect(() => {
    const filtered = institutes.filter((inst) =>
      (inst.name || "").toLowerCase().includes(query.toLowerCase()),
    );
    onSearch(filtered);
  }, [query, institutes, onSearch]);

  return (
    <section
      className="w-full bg-gradient-to-br from-[#0B1C33] via-[#0B1C33] to-[#081427]
                 py-16  mt-20 sm:py-12 px-4 relative overflow-hidden"
    >
      {/* Soft background dots */}
      <div className="absolute  inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Find Your Perfect College
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base md:text-text-base text-slate-300 max-w-3xl mx-auto">
          Explore top-rated institutes, check fees, placements & admission
          criteria.
        </p>

        {/* Search Bar */}
        <div className="mt-5 sm:mt-3 max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden">
            {/* Icon */}
            <div className="pl-5 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for colleges, exams (e.g. IIT Bombay, MBA)..."
              className="flex-1 px-4 py-3 text-sm sm:text-base
                         outline-none text-slate-700 placeholder-slate-400"
            />

            {/* Button */}
            <button
              type="button"
              className="bg-[#DC2626] hover:bg-[#b91c1c]
                         text-white font-bold
                         px-4 sm:px-8 py-3
                         text-sm sm:text-base
                         transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeSearchHero;
