const NewsFilters = ({ activeCategory, onChange }) => {
  const categories = [
    { id: "Exam Alerts", label: "Exam Alerts" },
    { id: "College Alerts", label: "College Alerts" },
    { id: "Admission Alerts", label: "Admission Alerts" }
  ];

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 scroll-smooth">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-6 py-2.5 rounded-full border text-sm whitespace-nowrap transition-all duration-300
            ${activeCategory === cat.id
                ? "border-[#DC2626] bg-red-50 text-[#DC2626] font-bold shadow-sm"
                : "border-gray-200 bg-white text-slate-600 hover:border-[#DC2626] hover:text-[#DC2626]"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default NewsFilters;