import React from "react";
import { Link } from "react-router-dom";

const sitemapData = [
  {
    title: "Main",
    links: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Blog", path: "/blog" },
      { name: "College Directory", path: "/college-directory" },
    ],
  },
  {
    title: "Colleges",
    links: [
      { name: "All Colleges", path: "/all-college" },
      { name: "Engineering Colleges", path: "/all-college" },
      { name: "Medical Colleges", path: "/all-college" },
      { name: "MBA Colleges", path: "/all-college" },
    ],
  },
  {
    title: "Courses",
    links: [
      { name: "All Courses", path: "/all-course" },
      { name: "Engineering Courses", path: "/all-course" },
      { name: "Medical Courses", path: "/all-course" },
      { name: "Management Courses", path: "/all-course" },
    ],
  },
  {
    title: "Exams",
    links: [
      { name: "All Exams", path: "/all-exams" },
      { name: "Engineering Exams", path: "/all-exams" },
      { name: "Medical Exams", path: "/all-exams" },
      { name: "MBA Exams", path: "/all-exams" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Search Results", path: "/search" },
      { name: "Blog Articles", path: "/blog" },
      { name: "Latest Updates", path: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Disclaimer", path: "/disclaimer" },
      { name: "Sitemap", path: "/sitemap" },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="bg-white min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto border border-blue-500 rounded-2xl p-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-3">
            Sitemap
          </h1>
          <p className="text-gray-600">
            Browse every section of MarqueCareer — colleges, courses, exams,
            blogs and resources.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {sitemapData.map((section) => (
            <div
              key={section.title}
              className="border border-blue-300 rounded-xl p-6"
            >
              <h3 className="text-blue-700 font-semibold mb-5">
                {section.title}
              </h3>

              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="border border-blue-500 rounded-lg px-4 py-2 text-blue-700 hover:bg-red-500 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Sitemap;