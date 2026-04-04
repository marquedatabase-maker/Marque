import { useState } from "react";

const LocationAndSocial = () => {
  const [activeTab, setActiveTab] = useState("campus");
  const socialLinks = [
    { icon: "facebook-f", url: "https://www.facebook.com/marquecareerofficial/" },
    { icon: "instagram", url: "https://www.instagram.com/marquecareer/?hl=en" },
    { icon: "twitter", url: "https://x.com/marquecareer" },
    { icon: "youtube", url: "https://www.youtube.com/@MarqueCareer" },
  ];

  return (
    <div className="space-y-8">
      {/* ================= LOCATION TABS ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab("campus")}
            className={`w-1/2 py-4 text-sm font-bold font-[Poppins] transition ${
              activeTab === "campus"
                ? "text-[#0B1C33] border-b-2 border-[#DC2626] bg-white"
                : "text-slate-400"
            }`}
          >
            University Campus
          </button>

          <button
            onClick={() => setActiveTab("corp")}
            className={`w-1/2 py-4 text-sm font-bold font-[Poppins] transition ${
              activeTab === "corp"
                ? "text-[#0B1C33] border-b-2 border-[#DC2626] bg-white"
                : "text-slate-400"
            }`}
          >
            Corporate Office
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === "campus" ? (
            <>
              <h4 className="text-xl font-bold text-[#0B1C33] mb-2 font-[Poppins]">
                Bennett University Campus
              </h4>

              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Plot Nos 8, 11, TechZone 2, Greater Noida,
                <br />
                Uttar Pradesh 201310, India.
              </p>

              <div className="space-y-6">
                {/* Visiting Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#DC2626] shrink-0">
                    <i className="fa-regular fa-clock" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Visiting Hours
                    </p>
                    <p className="text-sm font-bold text-[#0B1C33]">
                      Mon - Sat: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                {/* Admission Desk */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0B1C33] shrink-0">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Admission Desk
                    </p>
                    <p className="text-sm font-bold text-[#0B1C33]">
                      1800-123-4567 (Toll Free)
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-xl font-bold text-[#0B1C33] mb-2 font-[Poppins]">
                Corporate Office (Delhi)
              </h4>

              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Times House, 7 Bahadur Shah Zafar Marg,
                <br />
                New Delhi 110002, India.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#DC2626] shrink-0">
                    <i className="fa-regular fa-clock" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Office Hours
                    </p>
                    <p className="text-sm font-bold text-[#0B1C33]">
                      Mon - Fri: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0B1C33] shrink-0">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Corporate Queries
                    </p>
                    <p className="text-sm font-bold text-[#0B1C33]">
                      info@marquecareer.com
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= CONNECT WITH US ================= */}
      <div className="relative bg-gradient-to-r from-[#0B1C33] to-[#111827] rounded-2xl p-8 text-white text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#DC2626] rounded-full blur-[60px] opacity-20" />

        <h4 className="text-xl font-bold mb-2 font-[Poppins] text-white">
          Connect With Us
        </h4>
        <p className="text-sm text-slate-300 mb-6">
          Follow our social channels for latest updates.
        </p>

        <div className="flex justify-center gap-4 relative z-10">
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
  );
};

export default LocationAndSocial;
