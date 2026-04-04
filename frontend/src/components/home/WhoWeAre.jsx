import { NavLink } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <section className="relative w-full lg:min-h-[70vh] flex items-center py-12 lg:py-0 overflow-hidden bg-surface/30 mb-4">

      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-red-100/30 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT IMAGE */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">

            <div className="relative rounded-2xl overflow-hidden shadow-soft border-4 border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                alt="Student Success"
                className="w-full h-[350px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/40 via-transparent to-transparent" />
            </div>

            {/* dotted decoration */}
            <div className="absolute -top-6 -left-6 z-0 text-brandRed/20">
              <svg width="80" height="80" fill="currentColor" viewBox="0 0 100 100">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100" height="100" fill="url(#dots)" />
              </svg>
            </div>

            {/* floating badge */}
            <div className="absolute bottom-6 right-[-20px] bg-white p-4 rounded-xl shadow-lg animate-float z-20 border border-slate-50 flex items-center gap-4 max-w-[200px]">
              <div className="w-10 h-10 bg-brandRed rounded-lg flex items-center justify-center text-white shrink-0">
                <i className="fa-solid fa-trophy text-sm" />
              </div>
              <div>
                <p className="text-xl font-heading font-bold text-brandNavy leading-none">#1</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                  EdTech Platform
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">

            {/* heading */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-bolt text-brandRed text-sm" />
                <span className="text-xs font-bold text-brandRed uppercase tracking-widest">
                  Who We Are
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-brandNavy leading-[1.15] mb-4">
                Bridging The Gap Between <br />
                <span className="text-brandRed">Dreams & Degrees</span>
              </h2>

              <p className="text-sm lg:text-base text-slate-500 leading-relaxed max-w-2xl">
                CollegeDekho is India's largest ed-tech platform that guides students through their higher
                education journey. From college discovery to admission assistance, we use AI-driven
                insights and human expertise to help you make the right choice.
              </p>
            </div>

            {/* mission / vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-slate-200 pt-6">

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brandNavy shrink-0">
                  <i className="fa-solid fa-crosshairs" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-brandNavy mb-1">
                    Our Mission
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    To institutionalize student counseling in India and help every student find their right college.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-brandRed shrink-0">
                  <i className="fa-regular fa-lightbulb" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-brandNavy mb-1">
                    Our Vision
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    To be the most trusted education partner for students, colleges, and parents globally.
                  </p>
                </div>
              </div>

            </div>

            {/* actions */}
            <div className="flex flex-wrap items-center gap-4">

              <NavLink to="/about-us" className="bg-brandRed hover:bg-brandRedHover text-white px-7 py-3 rounded-lg font-bold text-sm transition-all shadow-glow active:scale-95 flex items-center gap-2">
                Read Full Story
                <i className="fa-solid fa-arrow-right text-xs" />
              </NavLink>

              <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">
                <div className="flex -space-x-2">
                  <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="" />
                  <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="" />
                  <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="" />
                </div>
                <div className="text-xs font-medium text-slate-500">
                  <strong className="block text-brandNavy">Join 2M+</strong> Students
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
