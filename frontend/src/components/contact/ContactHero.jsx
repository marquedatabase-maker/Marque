const ContactHero = () => {
  return (
    <header
      className="
        relative bg-[#0B1C33] text-white overflow-hidden
        pt-28 sm:pt-32 lg:pt-16
        pb-24 lg:pb-32
      "
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block py-1 px-3 rounded bg-white/10 border border-white/20 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-6">
              24/7 Student Support
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6">
              We're Here to <br />
              <span className="text-[#DC2626]">Guide Your Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg">
              Whether you need admission guidance, campus details, or fee
              structures, our expert counsellors are ready to assist you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919876543210"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition flex items-center gap-3 font-bold"
              >
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                  <i className="fa-solid fa-phone text-sm" />
                </div>
                +91 9008445959
              </a>

              <a
                href="mailto:admissions@mycollege.edu"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition flex items-center gap-3 font-bold"
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#0B1C33] flex items-center justify-center">
                  <i className="fa-solid fa-envelope text-sm" />
                </div>
                info@marquecareer.com
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE (DESKTOP ONLY) */}
          <div className="hidden lg:block relative">
            <img
              src="https://marquecareer.com/wp-content/uploads/2023/12/6G8A3045-1024x683.jpg"
              alt="Contact support"
              className="
                rounded-2xl shadow-2xl border-4 border-white/5
                rotate-2 hover:rotate-0 transition duration-500
                w-full h-[500px] object-cover
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContactHero;
