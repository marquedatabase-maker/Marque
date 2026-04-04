import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import EnquiryForm from "../enquiry/EnquiryForm";
import {
  Search,
  MapPin,
  Heart,
  X,
  Download,
  Filter,
  TrendingUp,
  Award,
  BookOpen,
  Building2,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

const CollegeDirectory = () => {
  const [activeState, setActiveState] = useState("All India");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [savedColleges, setSavedColleges] = useState([]);
  const [downloadingPdf, setDownloadingPdf] = useState({});
  const [openForm, setOpenForm] = useState(false);
 
  const [selectedCollege, setSelectedCollege] = useState(null);

  const [filters, setFilters] = useState({
    stream: [],
    course: [],
    type: [],
  });


  const stateRefs = useRef({});
  const [searchParams] = useSearchParams();

  const states = [
    "All India",
    "Karnataka",
    "Tamil Nadu",
    "Puducherry",
    "Andhra Pradesh",
    "Telangana",
    "West Bengal",
    "Odisha",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Uttarakhand",
    "Haryana",
    "Delhi",
    "Maharashtra",
    "Rajasthan",
    "Himachal Pradesh",
    "Tripura",
    "Jharkhand",
    "Bihar",
  ];

  useEffect(() => {
    const activeBtn = stateRefs.current[activeState];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeState]);

  useEffect(() => {
    const stateFromUrl = searchParams.get("state");
    const streamFromUrl = searchParams.get("stream");
    const typeFromUrl = searchParams.get("type");

    // type filter
    if (typeFromUrl) {
      setFilters((prev) => ({
        ...prev,
        type: [typeFromUrl],
      }));
    }

    if (stateFromUrl) {
      const matchedState = states.find(
        (s) => s.toLowerCase() === stateFromUrl.toLowerCase(),
      );
      setActiveState(matchedState || stateFromUrl);
    }
    // STREAM
    if (streamFromUrl) {
      setFilters((prev) => ({
        ...prev,
        stream: [streamFromUrl], // 👈 IMPORTANT
      }));
    }
  }, [searchParams.toString()]);

  const filterGroups = [
    {
      id: "stream",
      title: "Stream / Domain",
      options: ["Engineering", "Medical", "Management"],
      icon: <BookOpen size={16} />,
    },
    {
      id: "course",
      title: "Course",
      options: ["B.Tech", "M.Tech", "MBA"],
      icon: <Award size={16} />,
    },
    {
      id: "type",
      title: "Institute Type",
      options: ["Private", "Deemed"],
      icon: <Building2 size={16} />,
    },
  ];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "package-high", label: "Highest Package" },
    { value: "package-avg", label: "Average Package" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeState !== "All India") params.append("state", activeState);
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (filters.stream.length)
        params.append("stream", filters.stream.join(","));
      if (filters.course.length)
        params.append("courseGroup", filters.course.join(","));
      if (filters.type.length) params.append("type", filters.type.join(","));

      const { data } = await axios.get(
        `http://localhost:5000/api/institutes?${params.toString()}`,
      );
      let results = data.institutes || [];

      if (sortBy === "package-high") {
        results.sort(
          (a, b) => (b.HighestPackage || 0) - (a.HighestPackage || 0),
        );
      } else if (sortBy === "package-avg") {
        results.sort(
          (a, b) => (b.AveragePackage || 0) - (a.AveragePackage || 0),
        );
      } else {
        results.sort((a, b) => a.name.localeCompare(b.name));
      }

      setColleges(results);
    } catch (error) {
      console.error("Fetch Error:", error);
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [activeState, filters, debouncedSearch, sortBy]);

  const toggleFilter = (group, option) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].includes(option)
        ? prev[group].filter((i) => i !== option)
        : [...prev[group], option],
    }));
  };

  const resetFilters = () => {
    setFilters({ stream: [], course: [], type: [] });
    setSearchTerm("");
    setSortBy("name");
  };

  const toggleSaveCollege = (collegeId) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId],
    );
  };

  const downloadPDF = async (collegeId, collegeName) => {
    setDownloadingPdf((prev) => ({ ...prev, [collegeId]: true }));
    try {
      const response = await axios.get(
        `http://localhost:5000/api/institutes/${collegeId}/download-pdf`,
        { responseType: "blob" },
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${collegeName.replace(/[^a-z0-9]/gi, "_")}_Details.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingPdf((prev) => ({ ...prev, [collegeId]: false }));
    }
  };

  const getActiveFiltersCount = () =>
    filters.stream.length + filters.course.length + filters.type.length;

  const clearSearch = () => setSearchTerm("");

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileFilters]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white border rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-36 sm:h-44 bg-slate-200"></div>
          <div className="p-4 sm:p-6">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl">
              {[1, 2, 3].map((j) => (
                <div key={j} className="text-center">
                  <div className="h-5 bg-slate-200 rounded mb-1"></div>
                  <div className="h-3 bg-slate-200 rounded w-10 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const FilterContent = () => (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-base text-[#0B1C33] flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters
          {getActiveFiltersCount() > 0 && (
            <span className="bg-[#DC2626] text-white text-xs px-2 py-0.5 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-red-500 font-bold hover:text-red-700 transition"
        >
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-5 pb-5 border-b border-slate-100">
        <p className="font-bold text-sm mb-3 flex items-center gap-2 text-[#0B1C33]">
          <TrendingUp size={15} />
          Sort By
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#DC2626] bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div
          key={group.id}
          className="mb-5 pb-5 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0"
        >
          <p className="font-bold text-sm mb-3 flex items-center gap-2 text-[#0B1C33]">
            {group.icon}
            {group.title}
          </p>
          <div className="space-y-1.5">
            {group.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded-lg transition"
              >
                <input
                  type="checkbox"
                  checked={filters[group.id].includes(opt)}
                  onChange={() => toggleFilter(group.id, opt)}
                  className="w-4 h-4 accent-[#DC2626] cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0B1C33] transition">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="font-outfit bg-gradient-to-b from-slate-50 to-white min-h-screen text-slate-600">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-[#0B1C33] pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            Find Excellence
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Find Your Perfect College
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Explore thousands of colleges across India with detailed
            information, check fees, placements &amp; admission criteria.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white p-1.5 rounded-full flex items-center shadow-2xl overflow-hidden">
            <div className="pl-4 text-slate-400 flex-shrink-0">
              <Search size={18} />
            </div>
            <input
              className="flex-1 border-none outline-none px-3 py-2.5 text-sm sm:text-base text-[#0B1C33] bg-transparent min-w-0"
              placeholder="Search college, city or exam..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-2 text-slate-400 hover:text-slate-600 flex-shrink-0"
              >
                <X size={16} />
              </button>
            )}
            <button className="bg-[#DC2626] text-white h-10 sm:h-11 px-5 sm:px-7 rounded-full font-bold hover:bg-[#b91c1c] transition-all text-xs sm:text-sm flex-shrink-0 ml-1">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-8 sm:mt-10 border-t border-white/10 pt-6 sm:pt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white leading-none">
                {loading ? "..." : colleges.length}
              </div>
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
                Colleges
              </div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-white leading-none">
                19+
              </div>
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
                States
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white leading-none">
                100+
              </div>
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
                Cities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATES BAR ===== */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2.5 flex gap-2 overflow-x-auto no-scrollbar">
          {states.map((state) => (
            <button
              key={state}
              ref={(el) => (stateRefs.current[state] = el)}
              onClick={() => setActiveState(state)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeState === state
                  ? "bg-[#0B1C33] text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MOBILE FILTER BUTTON ===== */}
      <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-3">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0B1C33] text-white py-3 rounded-xl font-bold text-sm"
        >
          <Filter size={16} />
          Filters &amp; Sort
          {getActiveFiltersCount() > 0 && (
            <span className="bg-[#DC2626] px-2 py-0.5 rounded-full text-xs ml-1">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* ===== MOBILE FILTER MODAL (FIXED - FULL SCREEN) ===== */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-[999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer - slides from right */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white flex-shrink-0">
              <h3 className="font-bold text-lg text-[#0B1C33]">
                Filters &amp; Sort
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable filter content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterContent />
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-slate-100 bg-white flex-shrink-0">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#DC2626] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#b91c1c] transition"
              >
                Show {colleges.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-[130px]">
            <FilterContent />
          </div>
        </aside>

        {/* Results */}
        <div>
          {/* Results Header */}
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-[#0B1C33]">
                {activeState === "All India"
                  ? "All Colleges"
                  : `Colleges in ${activeState}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {loading ? "Loading..." : `${colleges.length} colleges found`}
              </p>
            </div>
          </div>

          {/* Active Filter Tags */}
          {getActiveFiltersCount() > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {Object.entries(filters).map(([group, values]) =>
                values.map((value) => (
                  <span
                    key={`${group}-${value}`}
                    className="inline-flex items-center gap-1.5 bg-[#0B1C33] text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(group, value)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )),
              )}
            </div>
          )}

          {/* College Cards */}
          {loading ? (
            <LoadingSkeleton />
          ) : colleges.length === 0 ? (
            <div className="text-center py-16 sm:py-24">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-slate-700 mb-2">
                No colleges found
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                Try adjusting your filters or search term
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#DC2626] text-white rounded-xl font-bold hover:bg-[#b91c1c] transition text-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {colleges.map((college) => (
                <div
                  key={college._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <img
                      src={
                        college.image?.url ||
                        "https://via.placeholder.com/400x160?text=College"
                      }
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Save Button */}
                    <button
                      onClick={() => toggleSaveCollege(college._id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-md"
                    >
                      <Heart
                        size={16}
                        className={
                          savedColleges.includes(college._id)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-600"
                        }
                      />
                    </button>

                    {/* Type Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#0B1C33]">
                        {college.type || "Institute"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-sm sm:text-base text-[#0B1C33] mb-1.5 line-clamp-2 group-hover:text-[#DC2626] transition leading-snug">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                      <MapPin size={12} className="flex-shrink-0" />
                      {college.city}, {college.state}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1.5 bg-gradient-to-br from-slate-50 to-slate-100 p-3 rounded-xl mb-4">
                      <div className="text-center">
                        <p className="font-bold text-[#0B1C33] text-xs sm:text-sm">
                          ₹{college.AveragePackage || 0}
                        </p>
                        <span className="text-[9px] sm:text-[10px] text-slate-500">
                          Avg Package
                        </span>
                      </div>
                      <div className="text-center border-x border-slate-200">
                        <p className="font-bold text-[#DC2626] text-xs sm:text-sm">
                          ₹{college.HighestPackage || 0}
                        </p>
                        <span className="text-[9px] sm:text-[10px] text-slate-500">
                          Highest
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-[#0B1C33] text-xs sm:text-sm truncate px-1">
                          {college.examsAccepted?.[0] || "N/A"}
                        </p>
                        <span className="text-[9px] sm:text-[10px] text-slate-500">
                          Exam
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-[#DC2626] text-white py-2.5 rounded-xl font-bold hover:bg-[#b91c1c] transition-all text-xs sm:text-sm"
                        onClick={() => setOpenForm(true)}
                      >
                        Apply Now
                      </button>
                      {openForm && (
                        <div className="fixed inset-0 z-[9999]">
                          <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/20 ">
                            <div className="w-full max-w-[420px]">
                              <EnquiryForm onClose={() => setOpenForm(false)} />
                            </div>
                          </div>
                        </div>
                      )}

                      <Link
                        to={
                          college?.slug ? `/all-college/${college.slug}` : "#"
                        }
                        className="flex-1 bg-[#DC2626] text-white py-2.5 rounded-xl font-bold hover:bg-[#b91c1c] hover:text-white transition-all text-xs sm:text-sm flex items-center justify-center gap-1"
                      >
                        Explore
                        <ChevronRight size={14} />
                      </Link>

                      <button
                        onClick={() => setSelectedCollege(college)}
                        className="w-11 border-2 border-[#0B1C33] text-[#0B1C33] rounded-xl font-bold hover:bg-[#0B1C33] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
                      >
                        <Download size={16} />
                      </button>
                      {selectedCollege && (
                        <div
                          className="fixed inset-0 bg-black/20 flex items-center justify-center z-[999]"
                          onClick={() => setSelectedCollege(null)}
                        >
                          <div
                            className="w-full max-w-md relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <EnquiryForm
                              defaultCourse={
                                selectedCollege?.courseGroup?.[0] || ""
                              }
                              onClose={() => setSelectedCollege(null)}
                              onSuccess={() => {
                                if (selectedCollege?.brochure?.url) {
                                  window.open(
                                    selectedCollege.brochure.url,
                                    "_blank",
                                  );
                                } else {
                                  alert("Brochure not available");
                                }

                                setSelectedCollege(null);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CollegeDirectory;
