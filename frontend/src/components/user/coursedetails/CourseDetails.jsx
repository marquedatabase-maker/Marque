import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseBySlug } from "../../../Services/api.js";

// Components
import CourseDetailsHeroCard from "./CourseDetailsHeroCard.jsx";
import CourseAboutUsSection from "./CourseAboutUsSection.jsx";
import CourseRightSideSection from "./CourseRightSideSection.jsx";
import RelatedCourses from "./RelatedCourses.jsx";
// TopColleges later

const CourseDetails = () => {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await getCourseBySlug(slug);
      setCourse(res.data.data);
    } catch (error) {
      console.error("Course not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!course) {
    return <div className="p-10 text-center">Course not found</div>;
  }

  return (
    <div className="bg-slate-50">
      <CourseDetailsHeroCard course={course} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 py-10">
        <div className="lg:col-span-8">
          <CourseAboutUsSection course={course} />
        </div>

        <div className="lg:col-span-4">
          <CourseRightSideSection course={course} />
        </div>
      </div>

      <RelatedCourses category={course.category} currentCourseId={course._id} />
    </div>
  );
};

export default CourseDetails;
