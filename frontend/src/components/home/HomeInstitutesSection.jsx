import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";
import { MapPin, Star } from "lucide-react";
import EnquiryModal from "../enquiry/EnquiryModal";
import EnquiryForm from "../enquiry/EnquiryForm";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const HomeInstitutesSection = ({
  filterType = "state", // "state" | "stream"
  filters = [],
  title = "",
  institutesData = null, // ✅ NEW PROP
  hideFilter = false,
  showMoreButton = true,
}) => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const [selectedState, setSelectedState] = useState("All");

  useEffect(() => {
    // ✅ Agar bahar se data aaya hai to fetch mat karo
    if (institutesData) {
      setInstitutes(institutesData);
      setLoading(false);
      return;
    }

    const fetchInstitutes = async () => {
      try {
        const res = await api.get("/institutes");
        setInstitutes(
          Array.isArray(res?.data?.institutes) ? res.data.institutes : [],
        );
      } catch (err) {
        console.error(err);
        setInstitutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, [institutesData]);
  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-500 font-semibold">
        Loading institutes...
      </div>
    );
  }

  const filteredInstitutes =
    selectedState === "All"
      ? institutes
      : institutes.filter((inst) => {
        if (filterType === "state") {
          return inst.state?.toLowerCase() === selectedState.toLowerCase();
        }

        if (filterType === "stream") {
          return inst.stream?.some(
            (c) => c.toLowerCase() === selectedState.toLowerCase(),
          );
        }

        return true;
      });

  return (
    <section className="bg-surface py-6 md:py-10 font-sans text-slate-800">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2
          className="
  text-3xl
  sm:text-3xl
  md:text-4xl
  lg:text-5xl
  font-extrabold
  text-brandNavy
  text-center
  mb-8
  pl-3
  pt-7
  font-[Outfit]
"
        >
          {title}
        </h2>

        {/* STATE FILTER */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 justify-center">
          {filters.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => setSelectedState(item.name)}
                className={`
          flex items-center gap-2
          px-4 py-2
          sm:px-5 sm:py-2.5
          md:px-6 md:py-3
          text-xs sm:text-sm font-bold
          rounded-full
          transition-all
          ${selectedState === item.name
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-[#F3F8FD] text-slate-700 hover:bg-slate-100"
                  }
        `}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedState === item.name
                    ? "text-white"
                    : "text-slate-500"
                    }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
          {filteredInstitutes.slice(0, 8).map((item) => {
            const {
              _id,
              name,
              city,
              state,
              type,
              ranking,
              rating,
              courseGroup = [],
              totalCourses,
              image,
            } = item;

            const img =
              image?.url ||
              "https://images.unsplash.com/photo-1562774053-701939374585";

            return (
              <article
                key={_id}
                className="group relative w-full max-w-[340px] bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col mx-auto"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden m-1.5 rounded-[1.2rem]">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full block object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-50/95 backdrop-blur-md border border-orange-200/50 text-[10px] font-extrabold text-orange-700 uppercase tracking-wide">
                      Top Rated
                    </span>
                  </div>
                  <button
                    onClick={() => toggleLike(_id)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full 
                    bg-white/20 backdrop-blur-md border border-white/20 transition-colors
                    ${likedIds.includes(_id)
                        ? "bg-white text-red-600"
                        : "text-white hover:bg-white hover:text-red-500"
                      }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={likedIds.includes(_id) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* LOCATION */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                      <MapPin
                        className="w-4 h-5 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      {city}, {state}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-5 pt-3 pb-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-extrabold uppercase tracking-wider">
                      {type || "Institute"}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500">
                      {ranking || "—"}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-bold text-brandNavy leading-tight group-hover:text-brandRed transition-colors line-clamp-2 h-5">
                    {name}
                  </h3>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {courseGroup.slice(0, 2).map((course, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold"
                        >
                          {course}
                        </span>
                      ))}
                      <span className="px-2 py-1 rounded   border-slate-100 text-slate-800 text-[10px] font-extrabold">
                        +{totalCourses || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[11px] font-bold text-brandNavy leading-none">
                        {rating || "4.5"}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-50 " />

                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() => setOpenForm(true)}
                      className="
                    flex-1
                    h-10
                    rounded-xl
                    bg-gradient-to-r from-red-500 to-red-700
                    text-white
                    text-sm
                    font-extrabold
                    shadow-[0_8px_20px_rgba(220,38,38,0.35)]
                    hover:from-red-600 hover:to-red-800
                    transition-all
                    active:scale-95
    "
                    >
                      Apply Now
                    </button>
                    {openForm && (
                      <div className="fixed inset-0 z-[9999]">
                        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/20 ">
                          <div className="w-full max-w-[420px]">
                            <EnquiryForm onClose={() => setOpenForm(false)} />
                          </div>
                        </div>
                      </div>
                    )}

                    <Link
                      to={`/all-college/${item.slug}`}
                      onClick={() => openModal("Download Brochure")}
                      className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-100 text-brandNavy hover:border-brandNavy hover:bg-brandNavy hover:text-white transition-all active:scale-95"
                    >
                      <MdKeyboardDoubleArrowRight className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MORE BUTTON */}
        {showMoreButton && (
          <div className="flex justify-center mt-12">
            <Link
              to="/all-college"
              className="px-10 py-3 rounded-full bg-brandNavy text-white font-bold hover:bg-black transition"
            >
              More Institutes →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeInstitutesSection;
