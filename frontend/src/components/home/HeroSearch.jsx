import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HeroSearch = () => {
  const [blobPositions, setBlobPositions] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setBlobPositions({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    navigate(
      `/Home/search-results?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`,
    );
  };

  const trendingCourses = [
    { icon: "fa-code", label: "B.Tech CSE", color: "brandRed" },
    { icon: "fa-briefcase", label: "MBA", color: "blue" },
    { icon: "fa-user-doctor", label: "MBBS", color: "green" },
  ];

  const companies = [
    "fa-google",
    "fa-microsoft",
    "fa-amazon",
    "fa-spotify",
    "fa-airbnb",
    "fa-uber",
  ];

  return (
    <div className="hero-search-container min-h-screen font-body text-slate-600 bg-white antialiased relative">
      <style>{`
    /* 1. Scoped the font to only THIS section */
    .hero-search-container {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* 2. Target specific elements instead of '*' */
    .hero-search-container h1, 
    .hero-search-container h2, 
    .hero-search-container h3, 
    .hero-search-container h4, 
    .hero-search-container h5, 
    .hero-search-container h6 {
      font-family: 'Outfit', sans-serif;
    }

    .bg-grid-pattern {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-size: 60px 60px;
      background-image: 
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      will-change: background-position;
      animation: gridMove 20s linear infinite;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes gridMove {
      0% { background-position: 0 0; }
      100% { background-position: 60px 60px; }
    }

    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
    .animate-float { animation: float 8s ease-in-out infinite; }
`}</style>

      {/* Navigation */}


      {/* Main Content */}
      <main className="relative pt-32 pb-10 lg:pt-48 lg:pb-40 overflow-hidden z-10">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 -z-20 bg-grid-pattern h-full w-full opacity-60"></div>

        {/* Floating Blobs */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none animate-float"
          style={{
            transform: `translate(${blobPositions.x * 30}px, ${blobPositions.y * 30}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none animate-float"
          style={{
            animationDelay: "2s",
            transform: `translate(${blobPositions.x * -30}px, ${blobPositions.y * -30}px)`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto opacity-0 animate-fade-up">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-red-100 shadow-sm mb-8 hover:border-red-200 transition-colors cursor-default select-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Admissions Open 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Experience A{" "}
              <span className="relative inline-block text-red-600 wave-underline">
                Seamless
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.2"
                  />
                </svg>
              </span>{" "}
              <br className="hidden md:block" />
              Journey To Future
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              We assist you in finding reputable universities that provide
              high-quality education. Explore over{" "}
              <span className="text-slate-900 font-bold">12,000+</span> courses
              and colleges.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-3xl shadow-lg shadow-slate-900/5 border border-slate-100 max-w-4xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-2 transition-all duration-300 hover:shadow-2xl input-focus-ring relative z-20">
              {/* Category Dropdown */}
              {/* Premium Category Dropdown */}
              {/* Removed conflicting internal Navbar */}
              <div
                ref={dropdownRef}
                className={`relative w-full md:w-56 md:border-r border-slate-100 
  ${dropdownOpen ? "border-b-0" : "border-b"}`}
              >
                {/* Dropdown Button */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between pl-12 pr-5 py-4 cursor-pointer"
                >
                  <div className="absolute left-5 text-slate-400">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>

                  <span className="text-base font-bold text-slate-900">
                    {category}
                  </span>

                  <i
                    className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  ></i>
                </div>

                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 top-full w-full 
  bg-white
  rounded-t-3xl
  shadow-[0_30px_70px_rgba(0,0,0,0.1)]
  border
  border-slate-100
  overflow-hidden
  z-40
  transition-all duration-300 ease-out origin-top rounded-b-3xl
  ${dropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  {[
                    "All Categories",
                    "Engineering",
                    "Medical",
                    "Management",
                  ].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCategory(item);
                        setDropdownOpen(false);

                        if (item === "All Categories") {
                          navigate("/Home/search-results");
                        } else {
                          navigate(
                            `/Home/search-results?stream=${encodeURIComponent(item)}`,
                          );
                        }
                      }}
                      className={`px-5 py-3 text-sm font-semibold cursor-pointer transition-all duration-200 ${category === item
                        ? "bg-red-600 text-white"
                        : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Search Input */}
              <div className="relative w-full flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-600 transition-colors">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="block w-full pl-12 pr-4 py-4 text-base font-medium text-slate-900 bg-transparent border-none focus:ring-0 placeholder:text-slate-400 outline-none"
                  placeholder="Search for colleges, exams, courses..."
                />
              </div>

              {/* Search Button */}
              <button
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-3.5 rounded-2xl font-bold text-base transition-all shadow-lg shadow-red-600/30 active:scale-95 flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Trending Tags */}
            <div
              className="mt-10 flex flex-wrap justify-center gap-3 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                Trending:
              </span>

              {trendingCourses.map((course, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (course.label === "B.Tech CSE") {
                      navigate(
                        "/Home/search-results?stream=Engineering&courseGroup=CSE",
                      );
                    }

                    if (course.label === "MBA") {
                      navigate(
                        "/Home/search-results?stream=Management&courseGroup=MBA",
                      );
                    }

                    if (course.label === "MBBS") {
                      navigate(
                        "/Home/search-results?stream=Medical&courseGroup=MBBS",
                      );
                    }
                  }}
                  className="group px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-red-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <i className={`fa-solid ${course.icon}`}></i>
                  {course.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Companies Section */}
      </main>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default HeroSearch;
