import { FaBolt, FaClock, FaHeadset, FaBriefcase, FaCertificate, FaArrowRight } from "react-icons/fa";
import { Link,NavLink } from "react-router-dom";

const FEATURES = [
  {
    icon: <FaClock />,
    title: "Flexible Schedule",
    desc: "Learn at your own pace with 24/7 access to course materials.",
    bg: "bg-blue-50",
    hover: "group-hover:bg-brandNavy group-hover:text-white",
    color: "text-brandNavy",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Dedicated mentors available to resolve your doubts instantly.",
    bg: "bg-red-50",
    hover: "group-hover:bg-brandRed group-hover:text-white",
    color: "text-brandRed",
  },
  {
    icon: <FaBriefcase />,
    title: "Job Guarantee",
    desc: "Placement assistance with top hiring partners globally.",
    bg: "bg-purple-50",
    hover: "group-hover:bg-purple-600 group-hover:text-white",
    color: "text-purple-600",
  },
  {
    icon: <FaCertificate />,
    title: "Certified Learning",
    desc: "Earn industry-recognized certificates upon completion.",
    bg: "bg-emerald-50",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
    color: "text-emerald-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative bg-surface/50 py-16 lg:py-0 lg:min-h-[70vh] flex items-center overflow-hidden font-body">
      
      {/* dotted bg */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0B1C33_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <FaBolt className="text-brandRed text-sm" />
                <span className="text-xs font-bold text-brandRed uppercase tracking-widest">
                  Why Choose Us
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-brandNavy leading-tight mb-4">
                Built on Trust, Driven <br />
                by <span className="text-brandRed">Student Success</span>
              </h2>

              <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
                Explore a diverse selection of courses designed to cater to various learning needs.
                We make education accessible, convenient, and career-focused.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {FEATURES.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-card hover:border-brandRed/20 hover:shadow-md transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color} ${item.hover} transition-colors`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brandNavy text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6 mb-5">
              <Link to="/about-us"  className="bg-brandRed hover:bg-brandRedHover text-white px-8 py-3 rounded-lg font-heading font-bold text-sm shadow-glow transition-all active:scale-95">
                Know More
              </Link>

              <NavLink to="/all-course"
                className="flex items-center gap-2 text-sm font-bold text-brandNavy hover:text-brandRed transition-colors"
              >
                View All Courses <FaArrowRight className="text-xs" />
              </NavLink>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[500px]">

              <div className="relative ml-auto w-4/5 aspect-[4/5] rounded-3xl overflow-hidden shadow-float border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                  alt="Student"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-10 left-0 w-3/5 aspect-square rounded-3xl overflow-hidden shadow-float border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                  alt="Student"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* floating card */}
              <div className="absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white max-w-[220px] animate-bounce-slow">
                <div className="flex -space-x-3 mb-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-brandRed flex items-center justify-center text-white text-xs font-bold">
                    100+
                  </div>
                </div>
                <p className="text-sm font-heading font-bold text-brandNavy">
                  Professional Instructors
                </p>
                <p className="text-[10px] text-slate-400">
                  Expert guidance for you
                </p>
              </div>

              <div className="absolute -top-10 right-0 w-32 h-32 bg-brandRed/5 rounded-full blur-2xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
