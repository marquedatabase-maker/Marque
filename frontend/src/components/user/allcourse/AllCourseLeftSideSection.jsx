import React, { useRef } from "react";

const AllCourseLeftSideSection = ({
  activeCategory,
  setActiveCategory,
  onOpenForm,
}) => {
  const scrollRef = useRef(null);
  const categories = [
    { id: "all", title: "All Courses" },
    { id: "engineering", title: "Engineering" },
    { id: "management", title: "Management" },
    { id: "medical", title: "Medical" },
    { id: "law", title: "Law" },
    { id: "commerce", title: "Commerce" },
    { id: "humanities", title: "Humanities" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ✅ MOBILE SECTION - NO SIDE OVERLAYS & IMPROVED SPACING */}
      <div className="lg:hidden col-span-full w-full">
        {/* Slider Section - Negative margin added to move card up */}
        <div className="relative z-10 -mb-6">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto w-full py-4 px-4 no-scrollbar snap-x touch-pan-x items-center"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setActiveCategory(domain.id)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 snap-start border ${activeCategory === domain.id
                    ? "bg-[#DC2626] text-white border-[#DC2626] shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] scale-105"
                    : "bg-white text-slate-600 border-slate-200 shadow-sm active:bg-slate-50"
                  }`}
              >
                {domain.title}
              </button>
            ))}
            <div className="flex-shrink-0 w-4 h-full"></div>
          </div>
        </div>

        {/* ✅ Controls Section - Tightened Spacing */}
        <div className="flex items-center justify-between mt-2 mb-4 px-5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Discover Domains
            </span>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5 shadow-sm">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:text-[#DC2626]"
            >
              <i className="fa-solid fa-chevron-left text-[10px]"></i>
            </button>
            <div className="w-[1px] h-3 bg-slate-200 mx-0.5"></div>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:text-[#DC2626]"
            >
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ DESKTOP SIDEBAR - NO CHANGES */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-4 border-b border-[#E2E8F0]">
              <h4 className="font-bold text-[#0B1C33] text-xs uppercase tracking-wider">
                Browse Domains
              </h4>
            </div>
            <nav>
              {categories.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setActiveCategory(domain.id)}
                  className={`w-full flex items-center justify-between p-4 px-6 font-medium border-b transition-all duration-200 hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:pl-7 ${activeCategory === domain.id
                      ? "bg-[#FEF2F2] text-[#DC2626] pl-7 border-l-4 border-l-[#DC2626]"
                      : "text-[#475569] border-l-4 border-l-transparent"
                    }`}
                >
                  <span>{domain.title}</span>
                  <i
                    className={`fa-solid fa-chevron-right text-xs ${activeCategory === domain.id ? "opacity-100" : "opacity-0"}`}
                  ></i>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 bg-[#DC2626] text-white p-8 rounded-2xl text-center shadow-lg shadow-red-500/30">
            <i className="fa-solid fa-headset text-4xl mb-4 text-white/90"></i>
            <h4 className="font-bold text-xl mb-2 font-[Poppins]">
              Need Guidance?
            </h4>
            <p className="text-sm text-white/80 mb-6">
              Talk to our admission experts to find the best course for you.
            </p>

            {/* ✅ Is button par logic add karein */}
            <button
              onClick={onOpenForm}
              className="w-full py-3 bg-white text-[#DC2626] font-bold rounded-xl hover:bg-slate-50 transition shadow-sm"
            >
              Request Call Back
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default AllCourseLeftSideSection;
