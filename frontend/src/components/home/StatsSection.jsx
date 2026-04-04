import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, Video, Smile, Play } from "lucide-react";

// --- REUSABLE HOOK (Integrated for convenience) ---
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let start = 0;
    const increment = target / (duration / 16);

    const update = () => {
      start += increment;
      if (start < target) {
        setCount(Math.ceil(start));
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    update();
  }, [target, duration]);

  return count;
};

// --- MAIN COMPONENT ---
const StatsBanner = () => {
  // Initialize counters
  const countStudents = useCounter(10, 1500); // Target 10 (k)
  const countCourses = useCounter(50, 1500);  // Target 50 (+)
  const countSatisfaction = useCounter(15, 1500); // Target 15 (M)

  return (
    <section className="w-full max-w-[1400px] mx-auto my-8 font-sans">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[220px] w-full shadow-lg rounded-none lg:rounded-xl overflow-hidden">
        
        {/* LEFT: RED STATS SECTION */}
        <div className="relative flex-[1.4] bg-[#C81E1E] flex items-center px-4 py-10 lg:py-0 overflow-hidden">
          
          {/* Background Dotted Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-0">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center sm:items-start group">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white tracking-tight leading-none">
                  {countStudents}k
                </span>
                <GraduationCap className="text-white/70 w-5 h-5 mb-1 group-hover:text-white transition-colors" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.15em] mt-2">
                Students Trained
              </p>
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center sm:items-start group">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white tracking-tight leading-none">
                  {countCourses}+
                </span>
                <Video className="text-white/70 w-5 h-5 mb-1 group-hover:text-white transition-colors" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.15em] mt-2">
                Recorded Courses
              </p>
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center sm:items-start group">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white tracking-tight leading-none">
                  {countSatisfaction}M
                </span>
                <Smile className="text-white/70 w-5 h-5 mb-1 group-hover:text-white transition-colors" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.15em] mt-2">
                Satisfaction Rate
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT: IMAGE SECTION */}
        <div className="relative flex-1 h-[250px] lg:h-auto group cursor-pointer overflow-hidden">
          {/* Image */}
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Students learning" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-xl">
              <Play className="w-5 h-5 text-white fill-current ml-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsBanner;