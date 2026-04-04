import React from "react";

const TopColleges = () => {
  // --- Data ---
  const topColleges = [
    {
      id: 1,
      name: "IIT Bombay - Indian Institute of Technology",
      location: "Mumbai, MH",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: "4.8",
      rank: "#3 NIRF",
      type: "Public",
      tags: ["B.Tech", "M.Tech", "+5"],
      badge: "Top Rated",
      badgeColor: "orange",
    },
    {
      id: 2,
      name: "Amity University, Noida",
      location: "Noida, UP",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: "4.5",
      rank: "#15 NIRF",
      type: "Private",
      tags: ["BBA", "MBA", "+12"],
      badge: "Admission Open",
      badgeColor: "green",
    },
    {
      id: 3,
      name: "Chandigarh University",
      location: "Mohali, PB",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: "4.6",
      rank: "NAAC A+",
      type: "Private",
      tags: ["B.E", "MBA", "+8"],
      badge: "Trending",
      badgeColor: "purple",
    },
    {
      id: 4,
      name: "IIT Delhi - Indian Institute of Technology",
      location: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: "4.5",
      rank: "#5 NIRF",
      type: "Public",
      tags: ["B.Tech", "M.Tech", "+15"],
      badge: "Featured",
      badgeColor: "teal",
    },
  ];

  // --- Helper Functions ---
  const getBadgeStyle = (color) => {
    const styles = {
      orange: "bg-orange-50/95 border-orange-200/50 text-orange-700",
      green: "bg-green-50/95 border-green-200/50 text-green-700",
      purple: "bg-purple-50/95 border-purple-200/50 text-purple-700",
      teal: "bg-teal-50/95 border-teal-200/50 text-teal-700",
    };
    return styles[color] || styles.orange;
  };

  const getBadgeDot = (color) => {
    const styles = {
      orange: "bg-orange-500",
      green: "bg-green-500",
      purple: "hidden",
      teal: "hidden",
    };
    return styles[color];
  };

  return (
    <section
      id="colleges"
      className="bg-slate-50 py-16 border-t border-slate-200 font-[Plus_Jakarta_Sans]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0B1C33] border-l-4 border-[#DC2626] pl-3">
              Top Colleges for B.Tech
            </h2>
            <p className="text-slate-500 text-sm mt-2 ml-4">
              Explore best institutes offering B.Tech programs in India.
            </p>
          </div>
          <a
            href="#"
            className="text-[#DC2626] font-bold text-sm hover:underline"
          >
            View All Colleges <i className="fa-solid fa-arrow-right ml-1"></i>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
          {topColleges.map((college) => (
            <article
              key={college.id}
              className="group relative w-full max-w-[340px] bg-white rounded-3xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(220,38,38,0.2),0_20px_40px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col mx-auto"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden m-1.5 rounded-[1.2rem]">
                <img
                  src={college.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={college.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm flex items-center gap-1.5 border ${getBadgeStyle(
                      college.badgeColor,
                    )}`}
                  >
                    {college.badgeColor === "purple" ||
                    college.badgeColor === "teal" ? (
                      <i
                        className={`fa-solid ${
                          college.badgeColor === "purple"
                            ? "fa-bolt"
                            : "fa-star"
                        } text-xs`}
                      ></i>
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${getBadgeDot(
                          college.badgeColor,
                        )}`}
                      ></span>
                    )}
                    <span className="text-[10px] font-extrabold uppercase tracking-wide">
                      {college.badge}
                    </span>
                  </span>
                </div>

                <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors border border-white/20">
                  <i className="fa-regular fa-heart text-xs"></i>
                </button>

                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <i className="fa-solid fa-location-dot text-[#DC2626] text-[10px]"></i>
                    <span className="text-[11px] font-bold tracking-wide">
                      {college.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="px-5 pt-3 pb-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-extrabold uppercase tracking-wider">
                    {college.type}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                    {college.rank}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-[#0B1C33] leading-tight group-hover:text-[#DC2626] transition-colors line-clamp-2 h-11">
                  {college.name}
                </h3>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {college.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded border text-[10px] ${
                          tag.startsWith("+")
                            ? "border-dashed border-gray-300 text-gray-400 font-medium"
                            : "bg-slate-50 border-slate-100 text-slate-600 font-bold"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                    <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i>
                    <span className="text-[11px] font-bold text-[#0B1C33]">
                      {college.rating}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-50 my-1"></div>

                <div className="flex items-center gap-3 mt-auto">
                  <button className="flex-1 bg-gradient-to-r from-[#DC2626] to-[#b91c1c] hover:from-red-600 text-white font-bold py-3 rounded-xl shadow-[0_10px_15px_-3px_rgba(220,38,38,0.2)] active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                    Apply Now
                  </button>
                  <button className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-100 text-[#0B1C33] hover:border-[#0B1C33] hover:bg-[#0B1C33] hover:text-white transition-all active:scale-95 group/icon">
                    <i className="fa-solid fa-arrow-right group-hover/icon:animate-bounce"></i>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopColleges;
