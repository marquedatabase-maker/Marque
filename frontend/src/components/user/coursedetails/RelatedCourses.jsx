

import React, { useEffect, useState } from "react";
import { getPublishedCourses } from "../../../Services/api.js";
import { Link } from "react-router-dom";

const RelatedCourses = ({ category, currentCourseId }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);

  // 🔥 FETCH RELATED COURSES
  const fetchRelatedCourses = async () => {
    try {
      const res = await getPublishedCourses({ category });
      const filtered = res.data.data.filter(
        (course) => course._id !== currentCourseId,
      );
      setRelatedCourses(filtered.slice(0, 4)); // limit 4
    } catch (error) {
      console.error("Failed to fetch related courses");
    }
  };

  useEffect(() => {
    if (category) {
      fetchRelatedCourses();
    }
  }, [category]);

  // 🔥 COLOR MAP (UNCHANGED UI LOGIC)
  const getColorClasses = (index) => {
    const colors = [
      "bg-blue-50 text-blue-600",
      "bg-green-50 text-green-600",
      "bg-purple-50 text-purple-600",
      "bg-orange-50 text-orange-600",
    ];
    return colors[index % colors.length];
  };

  if (!relatedCourses.length) return null;

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0B1C33] mb-8 flex items-center gap-2 border-l-4 border-[#DC2626] pl-3">
          Related Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedCourses.map((course, index) => (
            <Link
              key={course._id}
              to={`/courses/${course.slug}`}
              className="group relative block p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#DC2626] hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.3)] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl group-hover:bg-[#DC2626] group-hover:text-white transition-colors duration-300 shadow-sm ${getColorClasses(
                    index,
                  )}`}
                >
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  {course.level || "UG"}
                </span>
              </div>

              <h4 className="text-lg font-[Outfit] font-bold text-[#0B1C33] mb-1 group-hover:text-[#DC2626] transition-colors">
                {course.title}
              </h4>

              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {course.shortAbout}
              </p>

              <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1">
                  <i className="fa-regular fa-clock text-[#DC2626]"></i>
                  {course.duration}
                </span>
                {course.avgFees && (
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-indian-rupee-sign text-[#DC2626]"></i>
                    {course.avgFees}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;
