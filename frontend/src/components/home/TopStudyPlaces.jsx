import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import api from "../../Services/api";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Landmark,
  School,
  FerrisWheel,
  Palmtree,
  Mountain,
} from "lucide-react";
const DefaultIcon = MapPin;

const cityIconMap = {
  "Delhi NCR": Landmark,
  Mumbai: Building2,
  Bangalore: MapPin,
  Hyderabad: Building2,
  Patna: School,
  Noida: Palmtree,
  Kolkata: Landmark,
  Jaipur: Landmark,
  Ahmedabad: FerrisWheel,
  Haldia: Mountain,
};
const normalizeCity = (city) => {
  if (!city) return "";

  const formatted = city.trim().toLowerCase();

  const cityMap = {
    bengaluru: "Bangalore",
    bangalore: "Bangalore",
    bombay: "Mumbai",
    mumbai: "Mumbai",
    patna: "Patna",
    panta: "Patna",
  };

  return (
    cityMap[formatted] || formatted.charAt(0).toUpperCase() + formatted.slice(1)
  );
};
const TopStudyPlaces = () => {
  const scrollRef = useRef(null);
  const [cities, setCities] = useState([]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/institutes");
        const institutes = res.data.institutes;

        const grouped = {};

        institutes.forEach((inst) => {
          const cityName = normalizeCity(inst.city);

          if (!grouped[cityName]) {
            grouped[cityName] = {
              name: cityName,
              count: 0,
            };
          }

          grouped[cityName].count += 1;
        });

        const formatted = Object.values(grouped)
          .sort((a, b) => b.count - a.count) // highest colleges first
          .slice(0, 10); // top 10 cities

        setCities(formatted);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="w-full bg-white py-10 border-t border-slate-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#DC2626] rounded-full shadow-sm" />
            <h2 className="text-xl md:text-2xl font-bold text-[#0B1C33] tracking-tight">
              Top Study Places
            </h2>
          </div>

          {/* Minimal Nav Buttons */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#DC2626] hover:border-[#DC2626] hover:bg-red-50 transition-all active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#DC2626] hover:border-[#DC2626] hover:bg-red-50 transition-all active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Compact Scrollable List */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cities.map((city, index) => (
            <Link
              key={index}
              to={`/Home/search-results?city=${encodeURIComponent(city.name)}`}
              className="
                group relative flex-shrink-0 
                w-[130px] h-[130px] md:w-[140px] md:h-[140px]
                bg-white border border-slate-100 rounded-2xl
                flex flex-col items-center justify-center gap-3
                hover:border-slate-300 hover:shadow-lg hover:-translate-y-1
                transition-all duration-300 cursor-pointer
              "
            >
              {/* Subtle Background Glow on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent to-slate-50 pointer-events-none`}
              />

              {/* Icon Circle */}
              <div
                className={`
                relative z-10 w-12 h-12 rounded-xl flex items-center justify-center 
                ${city.bg} ${city.color} 
                transition-transform duration-300 group-hover:scale-110
              `}
              >
                {(() => {
                  const IconComponent = cityIconMap[city.name] || DefaultIcon;
                  return <IconComponent size={28} strokeWidth={1.5} />;
                })()}
              </div>

              {/* City Name */}
              <p className="relative z-10 text-sm font-bold text-slate-700 group-hover:text-[#0B1C33] transition-colors">
                {city.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar CSS (Inline for simplicity) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default TopStudyPlaces;
