// ✅ IMPORT ALL IMAGES (IMPORTANT)
import acharya from "../../assets/collegeslogo/acharya-logo.png";
import ACS from "../../assets/collegeslogo/ACS.png";
import akash from "../../assets/collegeslogo/akash-institute-of-engineering-and-technology.jpg";
import bapuji from "../../assets/collegeslogo/Bapuji.jpg";
import bms1 from "../../assets/collegeslogo/BMS banglore.jpg"; // ⚠️ rename file (no space)
import bms2 from "../../assets/collegeslogo/BMS.jpg";
import brindavan from "../../assets/collegeslogo/Brindavan.jpg";

import cambridge from "../../assets/collegeslogo/Cambridge.png";
import cec from "../../assets/collegeslogo/CEC.jpg";
import cit from "../../assets/collegeslogo/CIT.jpg";
import cmrit from "../../assets/collegeslogo/CMRIT.png";
import drAmbedkar from "../../assets/collegeslogo/DRAmbedkar.jpg";
import rv from "../../assets/collegeslogo/RVCollege.jpg";
import reva from "../../assets/collegeslogo/Revauniversity.jpg";


// ✅ DATA
const logosTop = [
  { src: acharya, alt: "acharya college" },
  { src: ACS, alt: "ACS" },
  { src: akash, alt: "akash institute" },
  { src: bapuji, alt: "bapuji" },
  { src: bms1, alt: "BMS" },
  { src: bms2, alt: "bms", h: "h-12" },
  { src: brindavan, alt: "brindavan" },
];

const logosBottom = [
  { src: cambridge, alt: "cambridge" },
  { src: cec, alt: "CEC", h: "h-10" },
  { src: cit, alt: "CIT", h: "h-10" },
  { src: cmrit, alt: "CMRIT", h: "h-10" },
  { src: drAmbedkar, alt: "DrAmbedkar", h: "h-10" },
  { src: rv, alt: "RVcollege", h: "h-8" },
  { src: reva, alt: "Reva" },
];


// ✅ LOGO ROW COMPONENT
const LogoRow = ({ logos, animation }) => (
  <div className="flex overflow-hidden w-full">
    <div
      className={`flex gap-16 lg:gap-24 items-center whitespace-nowrap pl-4 will-change-transform ${animation}`}
    >
      {[...logos, ...logos].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className={`partner-logo ${logo.h || "h-9"} w-auto object-contain`}
        />
      ))}
    </div>
  </div>
);


// ✅ MAIN COMPONENT
const HiringPartners = () => {
  return (
    <section className="relative w-full min-h-[350px] flex flex-col justify-center bg-surface overflow-hidden py-12 border-y border-slate-100">

      {/* dotted background */}
      <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">

        {/* heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primaryLight0 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Academic Excellence
            </span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-800">
            Our Elite Network of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03b97c] to-[#03b97c]">
              Partner Colleges
            </span>
          </h3>
        </div>

        {/* marquee */}
        <div className="flex flex-col gap-8">
          <LogoRow logos={logosTop} animation="animate-scroll-left" />
          <LogoRow logos={logosBottom} animation="animate-scroll-right" />
        </div>

      </div>
    </section>
  );
};

export default HiringPartners;