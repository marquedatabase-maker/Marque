import { useState, useEffect } from "react";
import marquelogo from "../../assets/images/marque-logo.png";
import { NavLink,Link } from "react-router-dom";
import EnquiryForm from "../enquiry/EnquiryForm";
import api from "../../Services/api";

const Footer = () => {
  const [open, setOpen] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [courseGroups, setCourseGroups] = useState([]);
  const [states, setStates] = useState([]);
  const socialLinks = [
    {
      icon: "facebook-f",
      url: "https://www.facebook.com/marquecareerofficial/",
    },
    { icon: "instagram", url: "https://www.instagram.com/marquecareer/?hl=en" },
    { icon: "twitter", url: "https://x.com/marquecareer" },
    { icon: "youtube", url: "https://www.youtube.com/@MarqueCareer" },
  ];

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };
  const courses = ["B.Tech", "MBA", "MBBS", "BCA", "BBA", "M.Tech", "Pharmacy"];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay footer visibility slightly to avoid rendering jumps while React resolves Suspense chunks
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 800);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await api.get("/institutes");
        const institutes = res.data.institutes;

        /* ========================
         TOP COURSES (Stream Based)
      ======================== */

        const groupedCourses = {};

        institutes.forEach((inst) => {
          inst.stream?.forEach((streamName) => {
            if (!groupedCourses[streamName]) {
              groupedCourses[streamName] = new Set();
            }

            inst.courseGroup?.forEach((course) => {
              groupedCourses[streamName].add(course);
            });
          });
        });

        const formattedCourses = Object.entries(groupedCourses)
          .map(([stream, courses]) => ({
            label: stream,
            items: Array.from(courses).slice(0, 4),
            count: courses.size,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Top 5 Streams

        setCourseGroups(formattedCourses);

        /* ========================
         TOP STATES
      ======================== */

        const groupedStates = {};

        institutes.forEach((inst) => {
          const stateName = inst.state?.trim();
          if (!stateName) return;

          if (!groupedStates[stateName]) {
            groupedStates[stateName] = 0;
          }

          groupedStates[stateName]++;
        });

        const formattedStates = Object.entries(groupedStates)
          .map(([state, count]) => ({ state, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 7) // Top 7 states
          .map((item) => item.state);

        setStates(formattedStates);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer
      className={`relative bg-[#0B1C33] text-slate-400 overflow-hidden transition-opacity duration-500 ease-in-out ${mounted ? "opacity-100" : "opacity-0 invisible"}`}
    >
      {/* pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 pt-20">
        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] gap-10 pb-16 border-b border-white/10">
          {/* BRAND */}
          <div className="lg:pr-8">
            <a href="/" rel="noopener noreferrer">
              <img
                src={marquelogo}
                alt="Marque Career"
                className="w-40 mb-6 brightness-0 invert opacity-90 cursor-pointer"
              />
            </a>

            <p className="text-sm leading-relaxed mb-8 max-w-md">
              India's most trusted college counselling platform. We replace
              confusion with clarity, helping students navigate admissions
              across Engineering, Medical, and Management.
            </p>

            <div className="space-y-4 text-sm text-white">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-start gap-3 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-phone text-red-600 mt-1" />
                +91 98765 43210
              </a>

              {/* Email */}
              <a
                href="mailto:help@marquecareer.com"
                className="flex items-start gap-3 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-envelope text-red-600 mt-1" />
                help@marquecareer.com
              </a>

              {/* Location (Google Map) */}
              <a
                href="https://www.google.com/maps?q=Noida,+Uttar+Pradesh,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-location-dot text-red-600 mt-1" />
                Noida, Uttar Pradesh, India
              </a>
            </div>

            <button
              className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl shadow-lg transition"
              onClick={() => setOpenForm(true)}
            >
              Get Free Counselling
              <i className="fa-solid fa-arrow-right" />
            </button>
            {openForm && (
              <div className="fixed inset-0 z-[9999]">
                <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/70 shadow-sm ">
                  <div className="w-full max-w-[420px]">
                    <EnquiryForm onClose={() => setOpenForm(false)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <FooterCol
            title="Top Courses"
            open={open}
            toggle={toggle}
            id="courses"
            items={courses.slice(0, 5)} // 👈 Top 5 only
          />

          <FooterCol
            title="Colleges by State"
            open={open}
            toggle={toggle}
            id="states"
            items={states}
          />

          <FooterCol
            title="Entrance Exams"
            open={open}
            toggle={toggle}
            id="exams"
            groups={[
              {
                label: "Engineering",
                category: "engineering",
                items: [
                  { label: "JEE Main", slug: "jee-main" },
                  { label: "JEE Advanced", slug: "jee-advanced" },
                  { label: "BITSAT", slug: "bitsat" },
                ],
              },
              {
                label: "Medical",
                category: "medical",
                items: [
                  { label: "NEET UG", slug: "neet-ug" },
                  { label: "NEET PG", slug: "neet-pg" },
                ],
              },
              {
                label: "Management",
                category: "management",
                items: [
                  { label: "CAT", slug: "cat" },
                  { label: "XAT", slug: "xat" },
                  { label: "CMAT", slug: "cmat" },
                  { label: "MAT", slug: "mat" },
                ],
              },
            ]}
          />

          <FooterCol
            title="Resources"
            open={open}
            toggle={toggle}
            id="resources"
            items={[
              { label: "About Us", link: "/about-us" },
              { label: "Latest Blogs", link: "/blog" },

              { label: "Contact Support", link: "/contact-us" },

              { label: "FAQs", link: "/contact-us" },
            ]}
          />
        </div>

        {/* ================= SEO STRIP ================= */}
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-[#050E1A] py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6 text-sm">
          <div>© 2026 Marque Career. All rights reserved.</div>

          <div className="flex flex-wrap gap-6">
  {[
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "Sitemap", path: "/sitemap" },
  ].map((item) => (
    <Link key={item.name} to={item.path} className="hover:text-white">
      {item.name}
    </Link>
  ))}
</div>

          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.icon}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#DC2626] hover:border-[#DC2626] transition"
              >
                <i className={`fa-brands fa-${item.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ================= HELPER ================= */

const FooterCol = ({ title, items, groups, open, toggle, id }) => {
  const isOpen = open === id;

  return (
    <div className="border-b lg:border-none border-white/10 pb-4">
      <button
        onClick={() => toggle(id)}
        className="w-full flex justify-between items-center text-white font-semibold text-lg lg:cursor-default"
      >
        {title}
        <span className="lg:hidden text-red-600 text-2xl">
          {isOpen ? "×" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen || typeof window === "undefined" ? "max-h-[1000px]" : "max-h-0"
        } lg:max-h-full`}
      >
        <ul className="mt-6 space-y-3 text-sm">
          {groups
            ? groups.map((g, groupIndex) => (
                <div key={groupIndex}>
                  <span className="block uppercase text-white/50 text-xs font-bold mt-6 mb-3">
                    {g.label}
                  </span>

                  {g.items.map((item, index) => {
                    const examLink = `/all-exams?category=${g.category}&exam=${item.slug}`;

                    return (
                      <li key={index}>
                        <NavLink
                          to={examLink}
                          className="hover:text-white hover:pl-1 transition"
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </div>
              ))
            : items.map((item, index) => {
                let label = "";
                let link = "";

                // ✅ If object (Resources case)
                if (typeof item === "object") {
                  label = item.label;
                  link = item.link;
                } else {
                  // ✅ If simple string (Courses / States case)
                  label = item;

                  if (id === "courses") {
                    link = `/Home/search-results?courseGroup=${encodeURIComponent(item)}`;
                  }

                  if (id === "states") {
                    link = `/Home/search-results?state=${encodeURIComponent(item)}`;
                  }
                }

                return (
                  <li key={index}>
                    <NavLink
                      to={link}
                      className="hover:text-white hover:pl-1 transition"
                    >
                      {label}
                    </NavLink>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};
