import { useState, useMemo } from "react";

// --- SUB-COMPONENT: Filter Group with Search ---
const FilterGroup = ({ title, options, selectedValues, onChange, type }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Logic: Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  // Logic: Toggle Checkbox
  const handleToggle = (value) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(type, newSelection);
  };

  return (
    <div className="border-b border-gray-100 py-5 last:border-0">
      {/* 1. Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer mb-3 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-bold text-[#0B1C33] uppercase tracking-wide group-hover:text-[#DC2626] transition-colors flex items-center gap-2">
          {title}
          {selectedValues.length > 0 && (
            <span className="bg-[#DC2626] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {selectedValues.length}
            </span>
          )}
        </h3>
        <span
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      {/* 2. Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        {/* 🔍 Search Bar inside Filter */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder={`Search ${title}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all text-slate-700 placeholder-gray-400"
          />
          <svg
            className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Checkbox List */}
        <div className="space-y-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded transition-colors"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt)}
                    onChange={() => handleToggle(opt)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-[#DC2626] checked:bg-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
                  />
                  {/* Custom Checkmark Icon */}
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                  >
                    <path
                      d="M1 4.5L3.5 7L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm ${selectedValues.includes(opt) ? "text-[#0B1C33] font-bold" : "text-gray-600 group-hover:text-[#0B1C33]"}`}
                >
                  {opt}
                </span>
              </label>
            ))
          ) : (
            <p className="text-xs text-gray-400 text-center py-2 italic">
              No matches found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const FilterSidebar = ({ filters, setFilters }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Data Options (Static Mock Data matching backend structure)
  const DATA = {
    streams: ["Engineering", "Management", "Medical"],
    courseGroups: [
      "B.Tech",
      "M.Tech",
      "B-ARCH",
      "BCOM",
      "MCOM",
      "BBA",
      "BA",
      "LLB",
      "PSYCHOLOGY",
      "MBA",
      "MCA",
      "BCA",
      "BA-LLB",
      "BCOM-LLB",
      "BBA-LLB",
      "FASHION DESIGING",
    ],
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
  };

  const handleFilterChange = (key, newValues) => {
    setFilters((prev) => ({
      ...prev,
      [key]: newValues,
    }));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col font-sans overflow-hidden sticky top-4">
      {/* 1. Sidebar Header (Navy Theme) */}
      <div
        className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#0B1C33]"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#DC2626]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          Filters
        </h2>
        <button
          onClick={() => setFilters({ stream: [], courseGroup: [], state: [] })}
          className="text-xs font-bold text-red-100 hover:text-white hover:underline transition-colors uppercase tracking-wide"
        >
          Reset All
        </button>
      </div>

      {/* 2. Scrollable Filters Area */}
      <div
        className={`
    transition-all duration-300 overflow-hidden
    ${mobileOpen ? "max-h-[85vh]" : "max-h-0"}
    lg:max-h-full
  `}
      >
        <div className="p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <FilterGroup
            title="Streams"
            type="stream"
            options={DATA.streams}
            selectedValues={filters.stream}
            onChange={handleFilterChange}
          />

          <FilterGroup
            title="Course Groups"
            type="courseGroup"
            options={DATA.courseGroups}
            selectedValues={filters.courseGroup}
            onChange={handleFilterChange}
          />

          <FilterGroup
            title="States"
            type="state"
            options={DATA.states}
            selectedValues={filters.state}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Custom Scrollbar Styles (Injecting locally for component isolation) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;
