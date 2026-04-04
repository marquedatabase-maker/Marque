const domains = [
  { title: "Engineering", icon: "microchip", colleges: "400+ Colleges", students: "15K+ Students" },
  { title: "Medical", icon: "heart-pulse", colleges: "200+ Colleges", students: "8K+ Students" },
  { title: "Management", icon: "chart-line", colleges: "300+ Colleges", students: "12K+ Students" },
  { title: "Law", icon: "scale-balanced", colleges: "150+ Colleges", students: "5K+ Students" },
  { title: "Commerce", icon: "calculator", colleges: "250+ Colleges", students: "9K+ Students" },
  { title: "Humanities", icon: "book-open", colleges: "350+ Colleges", students: "10K+ Students" },
];

const DomainsSection = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#DC2626] font-bold text-sm uppercase">Expertise</span>
          <h2 className="text-3xl font-bold text-[#0B1C33] mt-2">
            Domains We Specialize In
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d) => (
            <div
              key={d.title}
              className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#DC2626] hover:shadow-xl transition"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition">
                <i className={`fa-solid fa-${d.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-[#0B1C33] group-hover:text-[#DC2626]">
                {d.title}
              </h3>
              <div className="flex justify-between text-xs font-bold text-slate-400 border-t pt-4 mt-4">
                <span>{d.colleges}</span>
                <span>{d.students}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
