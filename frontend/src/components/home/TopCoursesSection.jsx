import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Matching your icon choice from before
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
const ALLOWED_COURSES = [
  "B.Tech",
  "MBA",
  "MBBS",
  "B.Sc",
  "M.Tech",
  "B.Com",
  "BBA",
  "MCA",
  "LLB",
  "BCA",
  "BDS/MDS",
  "LLB",
  "B.Arch",
];

const TopCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/institutes");
        const institutes = res.data.institutes;

        const uniqueCourses = new Set();

        institutes.forEach((inst) => {
          inst.courseGroup?.forEach((course) => {
            if (ALLOWED_COURSES.includes(course)) {
              uniqueCourses.add(course);
            }
          });
        });

        setCourses(Array.from(uniqueCourses).slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);
  return (
    <section className="relative bg-[#DC2626] py-5 px-6 md:px-12 overflow-hidden">
      {/* Dotted background - lowered opacity for a cleaner look */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none
        bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]
        [background-size:20px_20px]"
      />

      {/* Glow blob */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Heading - Minimalist alignment */}
        <div className="mb-5 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Top Courses
          </h2>
          <div className="h-1 w-12 bg-white/40 mt-1 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Pills - Refined sizing for better "minimal" feel */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() =>
                navigate(`/Home/search-results?courseGroup=${course}`)
              }
              className="group inline-flex items-center gap-2.5
      bg-white hover:bg-[#0B1C33]
      text-[#0B1C33] hover:text-white
      px-5 py-2 rounded-full
      shadow-md hover:shadow-xl
      transition-all duration-300
      transform hover:-translate-y-1"
            >
              <span className="text-sm font-bold">{course}</span>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCoursesSection;
