import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import {
  ChevronLeft,
  ChevronRight,
  UserCog,
  LineChart,
  ShoppingCart,
  Palette,
  Stethoscope,
} from "lucide-react";
const iconMap = {
  Engineering: <UserCog size={28} />,
  Management: <LineChart size={28} />,
  Commerce: <ShoppingCart size={28} />,
  Arts: <Palette size={28} />,
  Medical: <Stethoscope size={28} />,
};
const StudyGoalSection = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/institutes");
        const institutes = res.data.institutes;

        const grouped = {};

        institutes.forEach((inst) => {
          inst.stream.forEach((streamName) => {
            if (!grouped[streamName]) {
              grouped[streamName] = {
                title: streamName,
                count: 0,
                courses: new Set(),
              };
            }

            grouped[streamName].count += 1;

            inst.courseGroup.forEach((course) => {
              grouped[streamName].courses.add(course);
            });
          });
        });

        const formatted = Object.values(grouped).map((item) => ({
          ...item,
          courses: Array.from(item.courses).slice(0, 3), // max 3 courses
        }));

        setCategories(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Red Vertical Bar */}
            <div className="w-1.5 h-8 bg-[#DC2626] rounded-sm"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C33]">
              Select Your Study Goal
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL CONTAINER --- */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides scrollbar in Firefox/IE
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() =>
                navigate(`/Home/search-results?stream=${cat.title}`)
              }
              className="min-w-[280px] w-[280px] md:w-[300px] bg-white border border-slate-200 rounded-3xl p-6 flex-shrink-0 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0B1C33] group-hover:scale-105 transition-transform duration-300">
                  {iconMap[cat.title] || <UserCog size={28} />}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-bold text-lg text-[#0B1C33] group-hover:text-[#DC2626] transition-colors">
                    {cat.title}
                  </h3>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${cat.badgeBg} ${cat.badgeText}`}
                  >
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-slate-100 mb-5"></div>

              {/* Courses List */}
              <div className="space-y-3">
                {cat.courses.map((course, idx) => (
                  <p
                    key={idx}
                    className="text-sm font-semibold text-slate-600 hover:text-[#DC2626] transition-colors"
                  >
                    {course}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyGoalSection;
