import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import EnquiryModal from "../enquiry/EnquiryModal";
import { useState } from "react";

const InstituteGridCard = ({ item }) => {
  const [openForm, setOpenForm] = useState(false);

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
    slug,
  } = item;

  const img =
    image?.url ||
    "https://images.unsplash.com/photo-1562774053-701939374585";

  return (
    <article
      key={_id}
      className="group relative w-full max-w-[340px] bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden m-1.5 rounded-[1.2rem]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* LOCATION */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
            <MapPin className="w-4 h-5 text-red-500" />
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

        <h3 className="text-[17px] font-bold text-brandNavy leading-tight group-hover:text-brandRed transition-colors line-clamp-2">
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
            <span className="px-2 py-1 text-[10px] font-extrabold">
              +{totalCourses || 0}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-bold text-brandNavy">
              {rating || "4.5"}
            </span>
          </div>
        </div>

        <div className="h-px bg-slate-50" />

        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={() => setOpenForm(true)}
            className="flex-1 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-extrabold shadow-[0_8px_20px_rgba(220,38,38,0.35)] hover:from-red-600 hover:to-red-800 transition-all active:scale-95"
          >
            Apply Now
          </button>

          {openForm && <EnquiryModal onClose={() => setOpenForm(false)} />}

          <Link
            to={`/all-college/${slug}`}
            className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-slate-100 text-brandNavy hover:border-brandNavy hover:bg-brandNavy hover:text-white transition-all active:scale-95"
          >
            <MdKeyboardDoubleArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default InstituteGridCard;