
import React from "react";
import { Link } from "react-router-dom";

const AllCourseRightSideSection = ({
  courses = [],
  search = "",
  activeCategory = "all", // ✅ default "all" kar diya
}) => {
  const cleanString = (str) => (str ? str.toLowerCase().trim() : "");

  const isSearching = search.trim().length > 0;

  // ✅ CHANGE: "all" category mein saare courses show karo
  const filteredCourses = courses.filter((course) => {
    const courseTitle = cleanString(course.title);
    const courseCategory = cleanString(course.category);
    const courseSlug = cleanString(course.slug);
    const selectedCategory = cleanString(activeCategory);
    const searchTerm = cleanString(search);

    // Global Search Logic
    if (isSearching) {
      return (
        courseTitle.includes(searchTerm) ||
        courseCategory.includes(searchTerm) ||
        courseSlug.includes(searchTerm)
      );
    }

    // ✅ "all" select hai toh sab dikhao
    if (selectedCategory === "all") return true;

    // Category Filter
    return courseCategory === selectedCategory;
  });

  // Group Programs
  const groupedPrograms = {
    UG: filteredCourses.filter((c) => {
      const lvl = cleanString(c.level);
      return (
        lvl.includes("under") || lvl.includes("ug") || lvl.includes("bachelor")
      );
    }),
    PG: filteredCourses.filter((c) => {
      const lvl = cleanString(c.level);
      return (
        lvl.includes("post") || lvl.includes("pg") || lvl.includes("master")
      );
    }),
    Diploma: filteredCourses.filter((c) => {
      const lvl = cleanString(c.level);
      return lvl.includes("diploma") || lvl.includes("certificate");
    }),
    Others: filteredCourses.filter((c) => {
      const lvl = cleanString(c.level);
      return (
        !lvl.includes("under") &&
        !lvl.includes("ug") &&
        !lvl.includes("bachelor") &&
        !lvl.includes("post") &&
        !lvl.includes("pg") &&
        !lvl.includes("master") &&
        !lvl.includes("diploma") &&
        !lvl.includes("certificate")
      );
    }),
  };

  const getHeaderInfo = () => {
    if (isSearching) {
      return {
        title: `Search Results`,
        subtitle: `Found ${filteredCourses.length} matches for "${search}"`,
        icon: "fa-magnifying-glass",
      };
    }

    const catKey = cleanString(activeCategory);

    switch (catKey) {
      // ✅ "all" case add kiya
      case "all":
        return {
          title: "All Courses",
          subtitle: `${filteredCourses.length} programs available`,
          icon: "fa-graduation-cap",
        };
      case "engineering":
        return {
          title: "Engineering",
          subtitle: "Innovation & Technology",
          icon: "fa-gear",
        };
      case "management":
        return {
          title: "Management",
          subtitle: "Business & Leadership",
          icon: "fa-chart-line",
        };
      case "medical":
        return {
          title: "Medical",
          subtitle: "Healthcare & Medicine",
          icon: "fa-heart-pulse",
        };
      case "law":
        return {
          title: "Law",
          subtitle: "Legal Studies",
          icon: "fa-scale-balanced",
        };
      case "commerce":
        return {
          title: "Commerce",
          subtitle: "Finance & Accounting",
          icon: "fa-calculator",
        };
      case "humanities":
        return {
          title: "Humanities",
          subtitle: "Arts & Social Sciences",
          icon: "fa-book-open",
        };
      default:
        return {
          title: activeCategory,
          subtitle: "Explore Our Programs",
          icon: "fa-graduation-cap",
        };
    }
  };

  const headerData = getHeaderInfo();
  const hasCourses = filteredCourses.length > 0;

  // EMPTY STATE
  if (!hasCourses) {
    return (
      <div className="lg:col-span-9">
        <div className="bg-white border border-slate-200 rounded-[20px] p-10 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400 text-2xl">
            <i className="fa-solid fa-folder-open"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-700 capitalize">
            No Courses Found
          </h3>
          <p className="text-slate-500 mt-2">
            {isSearching
              ? `No results found for "${search}"`
              : `No courses available in ${activeCategory} yet.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9">
      <section
        id={activeCategory}
        className="domain-block bg-white border border-[#E2E8F0] rounded-[20px] p-6 md:p-10 mb-10 scroll-mt-24"
      >
        {/* SECTION HEADER */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#E2E8F0]">
          <div className="w-[50px] h-[50px] bg-[#F8FAFC] text-[#0B1C33] rounded-xl flex items-center justify-center text-2xl">
            <i className={`fa-solid ${headerData.icon}`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0B1C33] font-[Poppins] capitalize">
              {headerData.title}
            </h2>
            <p className="text-sm text-slate-500">{headerData.subtitle}</p>
          </div>
        </div>

        {/* UG PROGRAMS */}
        {groupedPrograms.UG.length > 0 && (
          <div className="mb-8">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#475569] opacity-60 mb-4">
              Undergraduate Programs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {groupedPrograms.UG.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* PG PROGRAMS */}
        {groupedPrograms.PG.length > 0 && (
          <div className="mb-8">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#475569] opacity-60 mb-4">
              Postgraduate Programs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {groupedPrograms.PG.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* DIPLOMA & OTHERS */}
        {(groupedPrograms.Diploma.length > 0 ||
          groupedPrograms.Others.length > 0) && (
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#475569] opacity-60 mb-4">
              Diploma & Other Programs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...groupedPrograms.Diploma, ...groupedPrograms.Others].map(
                (course) => (
                  <CourseCard key={course._id} course={course} />
                ),
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// SUB-COMPONENT: COURSE CARD (same as before)
const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/all-course/courses/${course.slug || course._id}`}
      className="group bg-white border border-[#E2E8F0] rounded-xl p-6 relative transition-all duration-300 block hover:border-[#DC2626] hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between"
    >
      <div>
        <span className="absolute top-3 right-3 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          {course.category}
        </span>
        <h4 className="font-[Poppins] font-bold text-[#0B1C33] text-lg mb-2 transition-colors group-hover:text-[#DC2626] line-clamp-2 leading-tight">
          {course.title}
        </h4>
        <p className="text-sm text-[#475569] line-clamp-2 mb-3">
          {course.subtitle || course.shortAbout || "Degree Program"}
        </p>
      </div>
      <div className="pt-3 border-t border-slate-50 flex items-center gap-2 mt-auto">
        <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded">
          {course.duration || "Duration N/A"}
        </span>
        <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded">
          {course.level || "Course"}
        </span>
      </div>
    </Link>
  );
};

export default AllCourseRightSideSection;
