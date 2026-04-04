import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // ← YE ADD KIYA
import { getPublishedCourses } from "../../../Services/api";
import AllCourseHero from "./AllCourseHeroSection";
import AllCourseLeftSideSection from "./AllCourseLeftSideSection";
import AllCourseRightSideSection from "./AllCourseRightSideSection";
import EnquiryForm from "../../enquiry/EnquiryForm";

const AllCoursesUser = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams(); // ← YE ADD KIYA
  const [activeCategory, setActiveCategory] = useState("all");
  // ✅ 1. Popup ki state yahan add karein
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  // ← YE POORA useEffect ADD KIYA
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  const fetchCourses = async () => {
    try {
      const res = await getPublishedCourses();
      setCourses(res.data.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  return (
    <div className="bg-[#F8FAFC]">
      <AllCourseHero search={search} setSearch={setSearch} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Section */}
          <AllCourseLeftSideSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onOpenForm={() => setIsFormOpen(true)} // ✅ 2. Prop pass kiya
          />
          <AllCourseRightSideSection
            courses={courses}
            search={search}
            activeCategory={activeCategory}
          />
        </div>
      </main>
      {/* ✅ 3. Popup Form Logic */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <EnquiryForm onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesUser;
