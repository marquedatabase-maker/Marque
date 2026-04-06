import React, { useState } from "react";
import EnquiryForm from "../enquiry/EnquiryForm";
import marquelogo from "../../assets/images/marque-logo.png";
import { Link, NavLink } from "react-router-dom";
import {
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Layers,
  MapPin,
  Building2,
  Settings,
  Briefcase,
  Stethoscope,
  Scale,
  Globe,
  BookOpen,
  Headset,
  User,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  // --- DESKTOP DROPDOWN STATES ---
  const [showColleges, setShowColleges] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showExams, setShowExams] = useState(false);

  const [mobileAccordions, setMobileAccordions] = useState({
    colleges: false,
    courses: false,
    exams: false,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const toggleAccordion = (section) => {
  //   setMobileAccordions((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };

  const toggleAccordion = (section) => {
    setMobileAccordions((prev) => ({
      colleges: false,
      courses: false,
      exams: false,
      [section]: !prev[section], // Toggle the one clicked
    }));
  };
  // --- CONFIGURATION DATA ---
  const stateLinks = [
    "Bihar",
    "Karnataka",
    "Tamil Nadu",
    "Delhi NCR",
    "Uttar Pradesh",
    "Rajasthan",
  ];
  const engCourses = ["BTECH", "MTECH", "B-ARCH"];
  const mgtCourses = [
    "BCOM",
    "MCOM",
    "BBA",
    "BA",
    "LLB",
    "PSYCHOLOGY",
    "MBA",
    "MCA",
    "BCA",
    "BA-LLB",
    "BCOM-LLB",
    "BBA-LLB",
    "FASHION DESIGNING",
  ];
  const medCoursesUG = ["MBBS/PG", "MBBS/UG"];
  const medCoursesDental = ["BDS", "MDS"];
  const medCoursesAyurved = ["NAMS", "BAMS-PG"];
  const medCoursesParamedical = ["NURSING", "PHARMACY", "BPT"];
  // --- FUNCTION TO CLOSE ALL MENUS ON CLICK ---
const closeAllMenus = () => {
  setShowColleges(false);
  setShowCourses(false);
  setShowExams(false);
  setIsMobileMenuOpen(false);

  // force dropdown close
  document.body.classList.add("mega-close");

  setTimeout(() => {
    document.body.classList.remove("mega-close");
  }, 300); // Increased timeout for better reliability
};

  // Helper for Desktop Active States
  const navLinkStyles = ({ isActive }) =>
    `px-4 py-2 font-semibold text-sm rounded-lg font-outfit transition-all duration-200 ${
      isActive
        ? "text-[#DC2626] bg-[#FEF2F2]"
        : "text-slate-600 hover:text-[#0B1C33] hover:bg-slate-50"
    }`;

  return (
    <nav className="font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-b border-slate-100 h-20">
        <div className="max-w-[1500px] mx-auto px-4 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeAllMenus}
            className="flex items-center gap-2.5 shrink-0 group "
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#DC2626] to-red-600 rounded-xl shadow-md transition-transform hover:scale-105">
              <img
                src={marquelogo}
                alt="Marque Career"
                className="text-white w-6 h-6"
              />
            </div>
            <span className="text-2xl font-extrabold text-[#0B1C33] font-outfit tracking-tight antialiased">
              Marque
              <span className="text-[#DC2626] font-extrabold">Career</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden   lg:flex items-center gap-1 xl:gap-1.5">
            <NavLink
              to="/"
              end
              onClick={closeAllMenus}
              className={navLinkStyles}
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              end
              onClick={closeAllMenus}
              className={navLinkStyles}
            >
              About
            </NavLink>

            {/* Colleges Mega Menu */}
            <div 
              className="relative group h-20 flex items-center px-1"
              onMouseEnter={() => setShowColleges(true)}
              onMouseLeave={() => setShowColleges(false)}
            >
              <NavLink
                to="/all-college"
                onClick={closeAllMenus}
                className={navLinkStyles}
              >
                <span className="flex items-center gap-1.5">
                  Colleges{" "}
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-70 transition-transform group-hover:rotate-180" />
                </span>
              </NavLink>
              <div className="absolute top-full left-0 w-full h-5 bg-transparent z-20"></div>
              <div className={`${showColleges ? "visible opacity-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 translate-y-2.5 pointer-events-none"} -translate-x-1/2 left-1/2 absolute top-full w-[700px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-8 transition-all duration-200 ease-out z-50`}>
                <div
                  className="grid grid-cols-3 gap-8"
                  onClick={closeAllMenus}
                  >
                  <div>
                    <h6 className="text-xs font-bold text-[#0B1C33] uppercase mb-4 tracking-widest font-outfit flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Layers className="w-3.5 h-3.5 text-[#DC2626]" /> By
                      Domain
                    </h6>
                    <ul className="space-y-2.5">
                      <li>
                        <NavLink
                          to="/college-directory?stream=Engineering"
                          onClick={closeAllMenus}
                          className={({ isActive }) =>
                            `block text-sm font-medium transition-all ${
                              isActive
                                ? "text-[#DC2626] pl-1"
                                : "text-slate-600 hover:text-[#DC2626] hover:pl-1"
                            }`
                          }
                        >
                          Engineering Colleges
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?stream=Medical"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Medical Colleges
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?stream=Management"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Management Colleges
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?stream=Law"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Law Colleges
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-[#0B1C33] uppercase mb-4 tracking-widest font-outfit flex items-center gap-2 border-b border-slate-100 pb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#DC2626]" /> By State
                    </h6>
                    <ul className="space-y-2.5">
                      <li>
                        <NavLink
                          to="/college-directory?state=Bihar"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Bihar
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?state=Karnataka"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Karnataka
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?state=Tamil Nadu"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Tamil Nadu
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?state=Delhi NCR"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Delhi NCR
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?state=Uttar Pradesh"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Uttar Pradesh
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?state=Rajasthan"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Rajasthan
                        </NavLink>
                      </li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <NavLink
                        to="/college-directory"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between group bg-slate-50 hover:bg-[#DC2626]/5 px-3 py-2 rounded-lg transition-all"
                      >
                        <span className="text-[13px] font-bold text-[#0B1C33] group-hover:text-[#DC2626]">
                          View All States
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#DC2626] -rotate-90" />
                      </NavLink>
                    </div>
                  </div>
                  <div className="bg-slate-50 -m-4 p-6 rounded-r-2xl">
                    <h6 className="text-xs font-bold text-[#0B1C33] uppercase mb-4 tracking-widest font-outfit flex items-center gap-2 border-b border-slate-200 pb-2">
                      <Building2 className="w-3.5 h-3.5 text-[#DC2626]" /> By
                      Type
                    </h6>
                    <ul className="space-y-2.5">
                      <li>
                        <NavLink
                          to="/college-directory?type=Private"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Private Colleges
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/college-directory?type=Deemed"
                          onClick={closeAllMenus}
                          className="block text-sm text-slate-600 font-medium hover:text-[#DC2626] hover:pl-1 transition-all"
                        >
                          Deemed Universities
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Mega Menu */}
            <div 
              className="relative group h-20 flex items-center px-1"
              onMouseEnter={() => setShowCourses(true)}
              onMouseLeave={() => setShowCourses(false)}
            >
              <NavLink
                to="/all-course"
                onClick={closeAllMenus}
                className={navLinkStyles}
              >
                <span className="flex items-center gap-1.5">
                  Courses{" "}
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-70 transition-transform group-hover:rotate-180" />
                </span>
              </NavLink>

              <div className="absolute top-full left-0 w-full h-5 bg-transparent z-20"></div>
              <div className={`${showCourses ? "visible opacity-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 translate-y-2.5 pointer-events-none"} -translate-x-1/2 left-1/2 absolute top-full w-[1250px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-8 transition-all duration-200 ease-out z-50`}>
                <div className="grid grid-cols-5 gap-6 divide-x divide-slate-50">
                  {/* Engineering */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" />{" "}
                      Engineering
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          UG/PG Programs
                        </p>
                        {engCourses.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=engineering"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Management */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#DC2626]" />{" "}
                      Management
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          UG/PG Programs
                        </p>
                        {mgtCourses.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=management"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Medical */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-[#DC2626]" /> Medical
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          Medical
                        </p>
                        {medCoursesUG.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          DENTAL
                        </p>
                        {medCoursesDental.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          AYURVED
                        </p>
                        {medCoursesAyurved.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          PARAMEDICAL
                        </p>
                        {medCoursesParamedical.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Law & Comm */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#DC2626]" /> Law & Comm.
                    </h4>
                    <div className="space-y-4">
                      {["LLB / BA LLB", "B.Com / M.Com"].map((course) => (
                        <div key={course}>
                          <NavLink
                            to="/all-course?category=law"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Humanities */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#DC2626]" /> Humanities
                    </h4>
                    <div className="space-y-4">
                      {["BA / MA", "B.Ed / M.Ed"].map((course) => (
                        <div key={course}>
                          <NavLink
                            to="/all-course?category=humanities"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {course}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white border-t border-slate-100 p-4 px-8 flex justify-between -m-8 mt-6 rounded-b-2xl">
                  <NavLink
                    to="/all-course"
                    onClick={() => {
                      closeAllMenus();
                      window.scrollTo(0, 0);
                    }}
                    className="text-xs font-bold text-[#0B1C33] hover:text-[#DC2626] uppercase tracking-wide"
                  >
                    Check Course →
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    onClick={() => {
                      closeAllMenus();
                      window.scrollTo(0, 0);
                    }}
                    className="text-xs font-bold text-[#0B1C33] hover:text-[#DC2626] uppercase tracking-wide flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#DC2626]" /> Talk to
                    Expert
                  </NavLink>
                </div>
              </div>
            </div>

            <NavLink
              to="/blog"
              onClick={closeAllMenus}
              className={navLinkStyles}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact-us"
              onClick={closeAllMenus}
              className={navLinkStyles}
            >
              Contact
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {/* Exams Mega Menu */}
            <div 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setShowExams(true)}
              onMouseLeave={() => setShowExams(false)}
            >
              {/* Link aur NavLink logic: Click par menu close hoga aur active page par red border dikhega */}
              <NavLink
                to="/all-exams"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `block transition-all ${isActive ? "active-exam-link" : ""}`
                }
              >
                {({ isActive }) => (
                  <button
                    className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-xl font-bold text-sm transition-all font-outfit group-hover:border-[#DC2626] group-hover:bg-[#FEF2F2] group-hover:text-[#DC2626] ${
                      isActive
                        ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]"
                        : "border-slate-200 text-[#0B1C33]"
                    }`}
                  >
                    <Layers
                      className={`w-4 h-4 group-hover:text-[#DC2626] ${isActive ? "text-[#DC2626]" : "text-[#0B1C33]"}`}
                    />
                    Exams
                    <ChevronDown className="w-2.5 h-2.5 ml-1 transition-transform group-hover:rotate-180 group-hover:text-[#DC2626] text-slate-400" />
                  </button>
                )}
              </NavLink>

              {/* Bridge to prevent menu from closing during mouse movement */}
              <div className="absolute top-full left-0 w-full h-5 bg-transparent z-20"></div>

              <div className={`${showExams ? "visible opacity-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 translate-y-2.5 pointer-events-none"} right-0 absolute top-16 w-[950px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-8 z-50 transition-all duration-200 ease-out`}>
                <div className="grid grid-cols-5 divide-x divide-slate-50 gap-6">
                  {/* Engineering Section */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" />{" "}
                      Engineering
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          UG Entrance Exams
                        </p>
                        {[
                          "JEE MAINS",
                          "JEE ADVANCED",
                          "BITSAT",
                          "COMEDK",
                          "WBJEE",
                          "MHTCET",
                          "KEAM",
                          "TS EAMCET",
                          "SRM (SRMJEEE)",
                          "MET (Manipal)",
                        ].map((exam) => (
                          <NavLink
                            key={exam}
                            to="/all-exams?category=engineering"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {exam}
                          </NavLink>
                        ))}
                        <NavLink
                          to="/all-exams?category=engineering"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-3 hover:gap-2 transition-all group font-outfit"
                        >
                          View All Engineering Exams
                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  {/* Management Section */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" /> Management
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          MBA / PG
                        </p>
                        {[
                          "CAT",
                          "XAT",
                          "MAT",
                          "GMAT",
                          "GRE",
                          "IIFT",
                          "IRMASAT",
                          "NMIMS (NMAT)",
                          "SMAT",
                        ].map((exam) => (
                          <NavLink
                            key={exam}
                            to="/all-exams?category=management"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {exam}
                          </NavLink>
                        ))}
                        <NavLink
                          to="/all-exams?category=management"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-3 hover:gap-2 transition-all group font-outfit"
                        >
                          View All Management Exams
                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Medical Section */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" /> Medical
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                          MBBS & Allied
                        </p>
                        {[
                          "NEET UG",
                          "NEET PG",
                          "NEET MDS",
                          "AIIMS Paramedical",
                        ].map((exam) => (
                          <NavLink
                            key={exam}
                            to="/all-exams?category=medical"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {exam}
                          </NavLink>
                        ))}
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider mt-2">
                          Pharmacy / Medical Allied
                        </p>
                        <NavLink
                          to="/all-exams?category=medical"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                        >
                          GPAT
                        </NavLink>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider mt-2">
                          Agriculture / Allied Sciences
                        </p>
                        <NavLink
                          to="/all-exams?category=medical"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                        >
                          ICAR AIEEA
                        </NavLink>
                        <NavLink
                          to="/all-exams?category=medical"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-3 hover:gap-2 transition-all group font-outfit"
                        >
                          View All Medical Exams
                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Law Section */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" /> Law
                    </h4>
                    <div className="space-y-4">
                      <div>
                        {[
                          "AILET (LLB/LLM – NLU Delhi)",
                          "CLAT",
                          "B-ARCH",
                          "DU LLB",
                          "SLAT",
                          "SET (Law)",
                        ].map((exam) => (
                          <NavLink
                            key={exam}
                            to="/all-exams?category=law"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {exam}
                          </NavLink>
                        ))}
                        <NavLink
                          to="/all-exams?category=law"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-3 hover:gap-2 transition-all group font-outfit"
                        >
                          View All Law Exams
                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Others Section */}
                  <div className="px-2">
                    <h4 className="text-[#0B1C33] font-bold text-sm mb-4 font-outfit flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#DC2626]" /> OTHERS
                    </h4>
                    <div className="space-y-4">
                      <div>
                        {[
                          "CUET UG",
                          "CUET PG",
                          "CUET",
                          "IIT JAM",
                          "NII DAT",
                        ].map((exam) => (
                          <NavLink
                            key={exam}
                            to="/all-exams?category=others"
                            onClick={() => {
                              closeAllMenus();
                              window.scrollTo(0, 0);
                            }}
                            className="block text-xs text-slate-600 mb-1 hover:text-[#DC2626] transition-all"
                          >
                            {exam}
                          </NavLink>
                        ))}
                        <NavLink
                          to="/all-course?category=others"
                          onClick={() => {
                            closeAllMenus();
                            window.scrollTo(0, 0);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-3 hover:gap-2 transition-all group font-outfit"
                        >
                          View All Others Exams
                          <ChevronRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section - Links will also close the menu */}
                <div className="bg-gradient-to-r from-red-50 to-white border-t border-slate-100 p-4 px-8 flex justify-between items-center -mx-8 -mb-8 mt-8 rounded-b-2xl">
                  <NavLink
                    to="/all-exams"
                    onClick={() => {
                      setShowExams(false);
                      closeAllMenus();
                    }}
                    className="text-xs font-bold text-[#0B1C33] hover:text-[#DC2626] transition-colors uppercase tracking-wide"
                  >
                    Check Exams →
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    onClick={() => {
                      setShowExams(false);
                      closeAllMenus();
                    }}
                    className="text-xs font-bold text-[#0B1C33] hover:text-[#DC2626] transition-colors uppercase tracking-wide flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#DC2626]" /> Talk to
                    Expert
                  </NavLink>
                </div>
              </div>
            </div>
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-[#DC2626] to-red-700 hover:to-[#DC2626] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/20 transition-all font-outfit tracking-wide"
              onClick={() => {
                closeAllMenus();
                setOpenForm(true);
              }}
            >
              Apply Now !
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#0B1C33] p-2 transition-transform active:scale-90"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 pb-20 flex flex-col gap-6">
          <NavLink
            to="/"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `text-base font-outfit block ${isActive ? "text-[#DC2626] font-bold" : "text-[#0B1C33] font-semibold"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `text-base font-outfit block ${isActive ? "text-[#DC2626] font-bold" : "text-[#0B1C33] font-semibold"}`
            }
          >
            About
          </NavLink>

          {/* --- 1. Mobile Accordion: COLLEGES --- */}
          {/* Mobile Accordion: Colleges */}
          <div className="border-b border-slate-50 pb-3">
            <div className="w-full flex justify-between items-center text-[#0B1C33] font-semibold text-base font-outfit">

          <NavLink
               to="/college-directory"
                onClick={closeAllMenus}
          >
             Colleges
          </NavLink>

          <ChevronDown
              onClick={() => toggleAccordion("colleges")}
              className={`w-4 h-4 transition-transform duration-300 cursor-pointer ${
              mobileAccordions.colleges ? "rotate-180" : ""
          }`}
          />

        </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileAccordions.colleges ? "max-h-[1200px] mt-4" : "max-h-0"
              }`}
            >
              <div className="pl-2 space-y-6">
                {/* 1. BY DOMAIN */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      By Domain
                    </span>
                  </div>
                  <div className="pl-6 space-y-3 flex flex-col">
                    <NavLink
                      to="/college-directory?stream=Engineering"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                    >
                      Engineering Colleges
                    </NavLink>
                    <NavLink
                      to="/college-directory?stream=Medical"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                    >
                      Medical Colleges
                    </NavLink>
                    <NavLink
                      to="/college-directory?stream=Management"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                    >
                      Management Colleges
                    </NavLink>
                    <NavLink
                      to="/college-directory?stream=Law"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                    >
                      Law Colleges
                    </NavLink>
                  </div>
                </div>

                {/* 2. BY STATE */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      By State
                    </span>
                  </div>
                  <div className="pl-6 grid grid-cols-2 gap-y-3">
                    {stateLinks.map((state) => (
                      <NavLink
                        key={state}
                        to={`/college-directory?state=${state}`}
                        onClick={closeAllMenus}
                        className="text-sm text-slate-600 font-medium"
                      >
                        {state}
                      </NavLink>
                    ))}
                  </div>
                  <NavLink
                    to="/college-directory"
                    onClick={closeAllMenus}
                    className="mt-4 ml-6 inline-flex items-center gap-1 text-xs font-bold text-[#DC2626]"
                  >
                    View All States <ChevronRight size={12} />
                  </NavLink>
                </div>

                {/* 3. BY TYPE */}
                <div className="bg-slate-50/80 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      By Type
                    </span>
                  </div>
                  <div className="pl-6 space-y-3 flex flex-col">
                    <NavLink
                      to="/college-directory?type=Private"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium"
                    >
                      Private Colleges
                    </NavLink>
                    <NavLink
                      to="/college-directory?type=Deemed"
                      onClick={closeAllMenus}
                      className="text-sm text-slate-600 font-medium"
                    >
                      Deemed Universities
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 2. Mobile Accordion: COURSES --- */}
          <div className="border-b border-slate-50 pb-3">
            <div className="w-full flex justify-between items-center text-[#0B1C33] font-semibold text-base font-outfit">

          <NavLink
              to="/all-course"
              onClick={closeAllMenus}
          >
              Courses
          </NavLink>

          <ChevronDown
              onClick={() => toggleAccordion("courses")}
              className={`w-4 h-4 transition-transform duration-300 cursor-pointer ${
              mobileAccordions.courses ? "rotate-180" : ""
          }`}
          />

          </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileAccordions.courses ? "max-h-[2000px] mt-4" : "max-h-0"
              }`}
            >
              <div className="pl-2 space-y-6">
                {/* 1. Engineering */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Engineering
                    </span>
                  </div>
                  <div className="pl-6 space-y-3 flex flex-col border-l border-slate-100 ml-1.5">
                    {engCourses.map((course) => (
                      <NavLink
                        key={course}
                        to="/all-course?category=engineering"
                        onClick={closeAllMenus}
                        className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                      >
                        {course}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* 2. Management */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Management
                    </span>
                  </div>
                  <div className="pl-6 grid grid-cols-2 gap-x-2 gap-y-3 border-l border-slate-100 ml-1.5">
                    {mgtCourses.map((course) => (
                      <NavLink
                        key={course}
                        to="/all-course?category=management"
                        onClick={closeAllMenus}
                        className={`text-sm text-slate-600 font-medium ${course.length > 10 ? "text-[12px]" : ""}`}
                      >
                        {course}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* 3. Medical */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Medical
                    </span>
                  </div>
                  <div className="pl-6 space-y-4 border-l border-slate-100 ml-1.5">
                    {/* MBBS/UG & PG */}
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold mb-2">
                        MBBS/PG & UG
                      </p>
                      <div className="flex flex-col gap-2">
                        {medCoursesUG.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={closeAllMenus}
                            className="text-sm text-slate-600 font-medium"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    {/* DENTAL */}
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold mb-2">
                        DENTAL
                      </p>
                      <div className="flex flex-col gap-2">
                        {medCoursesDental.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={closeAllMenus}
                            className="text-sm text-slate-600 font-medium"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    {/* AYURVED */}
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold mb-2">
                        AYURVED
                      </p>
                      <div className="flex flex-col gap-2">
                        {medCoursesAyurved.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={closeAllMenus}
                            className="text-sm text-slate-600 font-medium"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    {/* PARAMEDICAL */}
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold mb-2">
                        PARAMEDICAL
                      </p>
                      <div className="flex flex-col gap-2">
                        {medCoursesParamedical.map((course) => (
                          <NavLink
                            key={course}
                            to="/all-course?category=medical"
                            onClick={closeAllMenus}
                            className="text-sm text-slate-600 font-medium"
                          >
                            {course}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Law & Humanities (Combined for compact view) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Law
                      </span>
                    </div>
                    <div className="pl-4 flex flex-col gap-2 border-l border-slate-100 ml-1.5">
                      {["BA LLB", "B.Com LLB"].map((course) => (
                        <NavLink
                          key={course}
                          to="/all-course?category=law"
                          onClick={closeAllMenus}
                          className="text-sm text-slate-600 font-medium"
                        >
                          {course}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Humanities
                      </span>
                    </div>
                    <div className="pl-4 flex flex-col gap-2 border-l border-slate-100 ml-1.5">
                      {["BA / MA", "B.Ed"].map((course) => (
                        <NavLink
                          key={course}
                          to="/all-course?category=humanities"
                          onClick={closeAllMenus}
                          className="text-sm text-slate-600 font-medium"
                        >
                          {course}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons like Desktop */}
                <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
                  <NavLink
                    to="/all-course"
                    onClick={closeAllMenus}
                    className="flex justify-between items-center bg-red-50 text-[#DC2626] px-4 py-3 rounded-xl font-bold text-sm"
                  >
                    Check All Courses <ChevronRight size={16} />
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 text-slate-600 px-4 py-2 font-bold text-sm"
                  >
                    <User className="w-4 h-4 text-[#DC2626]" /> Talk to Expert
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* --- 3. Mobile Accordion: EXAMS --- */}
          <div className="border-b border-slate-50 pb-3">
            <div className="w-full flex justify-between items-center text-[#0B1C33] font-semibold text-base font-outfit">

              <NavLink
                to="/all-exams"
                onClick={closeAllMenus}
              >
                Exams
              </NavLink>

              <ChevronDown
                onClick={() => toggleAccordion("exams")}
                className={`w-4 h-4 transition-transform duration-300 cursor-pointer ${
                mobileAccordions.exams ? "rotate-180" : ""
              }`}
              />

              </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileAccordions.exams ? "max-h-[2500px] mt-4" : "max-h-0"
              }`}
            >
              <div className="pl-2 space-y-6">
                {/* 1. Engineering Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Engineering
                    </span>
                  </div>
                  <div className="pl-6 space-y-3 flex flex-col border-l border-slate-100 ml-1.5">
                    {["JEE MAINS", "JEE ADVANCED", "BITSAT", "WBJEE"].map(
                      (exam) => (
                        <NavLink
                          key={exam}
                          to="/all-exams?category=engineering"
                          onClick={closeAllMenus}
                          className="text-sm text-slate-600 font-medium hover:text-[#DC2626]"
                        >
                          {exam}
                        </NavLink>
                      ),
                    )}
                    <NavLink
                      to="/all-exams?category=engineering"
                      onClick={closeAllMenus}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-1 uppercase"
                    >
                      View All Engineering <ChevronRight size={10} />
                    </NavLink>
                  </div>
                </div>

                {/* 2. Management Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Management
                    </span>
                  </div>
                  <div className="pl-6 grid grid-cols-2 gap-y-3 border-l border-slate-100 ml-1.5">
                    {["CAT", "XAT", "MAT", "GMAT"].map((exam) => (
                      <NavLink
                        key={exam}
                        to="/all-exams?category=management"
                        onClick={closeAllMenus}
                        className="text-sm text-slate-600 font-medium"
                      >
                        {exam}
                      </NavLink>
                    ))}
                    <div className="col-span-2">
                      <NavLink
                        to="/all-exams?category=management"
                        onClick={closeAllMenus}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-1 uppercase"
                      >
                        View All Management <ChevronRight size={10} />
                      </NavLink>
                    </div>
                  </div>
                </div>

                {/* 3. Medical Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Medical
                    </span>
                  </div>
                  <div className="pl-6 space-y-3 flex flex-col border-l border-slate-100 ml-1.5">
                    {["NEET UG", "NEET PG"].map((exam) => (
                      <NavLink
                        key={exam}
                        to="/all-exams?category=medical"
                        onClick={closeAllMenus}
                        className="text-sm text-slate-600 font-medium"
                      >
                        {exam}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/all-exams?category=medical"
                      onClick={closeAllMenus}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] mt-1 uppercase"
                    >
                      View All Medical <ChevronRight size={10} />
                    </NavLink>
                  </div>
                </div>

                {/* 4. Law & Others Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Law
                      </span>
                    </div>
                    <div className="pl-4 flex flex-col gap-2 border-l border-slate-100 ml-1.5">
                      {["CLAT", "AILET"].map((exam) => (
                        <NavLink
                          key={exam}
                          to="/all-exams?category=law"
                          onClick={closeAllMenus}
                          className="text-sm text-slate-600 font-medium"
                        >
                          {exam}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Others
                      </span>
                    </div>
                    <div className="pl-4 flex flex-col gap-2 border-l border-slate-100 ml-1.5">
                      {["CUET UG", "IIT JAM"].map((exam) => (
                        <NavLink
                          key={exam}
                          to="/all-course?category=others"
                          onClick={closeAllMenus}
                          className="text-sm text-slate-600 font-medium"
                        >
                          {exam}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions like Desktop Mega Menu */}
                <div className="pt-4 border-t border-slate-50 flex flex-col gap-3 bg-slate-50/50 p-4 -mx-2 rounded-xl">
                  <NavLink
                    to="/all-exams"
                    onClick={closeAllMenus}
                    className="flex justify-between items-center text-[#0B1C33] hover:text-[#DC2626] font-bold text-xs uppercase tracking-wide"
                  >
                    Check Exams →
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 text-[#0B1C33] hover:text-[#DC2626] font-bold text-xs uppercase tracking-wide"
                  >
                    <User className="w-3.5 h-3.5 text-[#DC2626]" /> Talk to
                    Expert
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/blog"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `text-base font-outfit block ${isActive ? "text-[#DC2626] font-bold" : "text-[#0B1C33] font-semibold"}`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact-us"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `text-base font-outfit block ${isActive ? "text-[#DC2626] font-bold" : "text-[#0B1C33] font-semibold"}`
            }
          >
            Contact
          </NavLink>

          <button
            className="w-full py-3.5 bg-[#DC2626] text-white font-bold text-base rounded-xl shadow-lg font-outfit"
            onClick={() => {
              closeAllMenus();
              setOpenForm(true);
            }}
          >
            Apply Now !
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {openForm && (
        <div className="fixed inset-0 z-[9999]">
          <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-[420px]">
              <EnquiryForm onClose={() => setOpenForm(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
