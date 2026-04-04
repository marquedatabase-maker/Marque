import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, Play, BookOpen, GraduationCap } from "lucide-react";

// --- DUMMY DATA ---
const testimonials = [
  {
    id: 1,
    text: "The guidance I received was transformative. It bridged the gap between my academic knowledge and real-world application seamlessly.",
    name: "Aarav Patel",
    role: "Senior Developer",
    company: "TechSolutions",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    text: "CollegeDekho helped me find the perfect university. The counseling process was transparent, quick, and incredibly supportive.",
    name: "Priya Sharma",
    role: "MBA Student",
    company: "IIM Bangalore",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    text: "I was confused about my career path, but their expert mentors provided clarity. Now I'm working at my dream job in Pune.",
    name: "Rohan Gupta",
    role: "Data Analyst",
    company: "Infosys",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    text: "The study abroad program they recommended was a perfect fit. From visa assistance to accommodation, they handled everything.",
    name: "Sneha Reddy",
    role: "Masters Candidate",
    company: "UK University",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    text: "Excellent platform for students! The resources and college comparisons helped me make an informed decision for my B.Tech.",
    name: "Vikram Singh",
    role: "Engineering Student",
    company: "IIT Delhi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const TestimonialOrbit = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef(testimonials);

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); 
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsRef.current.length);
      setIsAnimating(false);
    }, 500); 
  };

  const activeData = testimonialsRef.current[activeIndex];

  // Helper to get cyclic images for the bottom avatar group
  const getAvatar = (offset) => {
    const index = (activeIndex + offset) % testimonialsRef.current.length;
    return testimonialsRef.current[index].image;
  };

  return (
    <div className="testimonial-orbit-section bg-white min-h-[800px] flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* --- SCOPED STYLES --- */}
<style>{`
  .testimonial-orbit-section {
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .testimonial-orbit-section .orbit-serif {
    font-family: 'Merriweather', serif;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .orbit-line { stroke-dasharray: 6, 6; opacity: 0.4; }
`}</style>

      <div className="relative w-full max-w-6xl h-[700px] md:h-[800px] flex items-center justify-center">

        {/* --- BACKGROUND ORBIT SVG --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-75 md:scale-100 opacity-60 md:opacity-100">
          <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none">
            <ellipse cx="500" cy="400" rx="350" ry="350" stroke="#CBD5E1" strokeWidth="1.5" className="orbit-line" />
            <ellipse cx="500" cy="400" rx="480" ry="480" stroke="#E2E8F0" strokeWidth="1.5" className="orbit-line" />
            <path d="M350 680 Q 400 660 450 680 T 550 680" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <path d="M200 500 L 210 500 M 205 495 L 205 505" stroke="#DC2626" strokeWidth="2" />
            <path d="M800 300 L 810 300 M 805 295 L 805 305" stroke="#DC2626" strokeWidth="2" />
          </svg>
          
          <div className="absolute right-[5%] top-[25%] text-[150px] md:text-[250px] leading-none text-blue-50 opacity-50 orbit-serif select-none pointer-events-none">
            ”
          </div>
          
          <div className="absolute left-[15%] bottom-[20%] text-4xl md:text-6xl text-pink-100 opacity-60 select-none">
            ✦
          </div>
        </div>

        {/* --- CENTRAL CONTENT CARD --- */}
        <div className="relative z-10 max-w-xl md:max-w-2xl text-center px-6">
          
          {/* Floating Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-50 mb-8 relative animate-float">
            <Quote className="w-8 h-8 text-[#DC2626] fill-current" />
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded bg-[#00B67A] flex items-center justify-center text-white">
                <Star className="w-3 h-3 fill-current" />
              </div>
            ))}
          </div>

          {/* Animated Text Content */}
          <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <p className="text-xl md:text-3xl orbit-serif italic text-[#0B1C33] leading-relaxed mb-8">
              "{activeData.text}"
            </p>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-[#0B1C33]">Clutch</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest border-l border-slate-300 pl-2">Review</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0B1C33]">{activeData.name}</h4>
                <p className="text-sm font-semibold text-slate-500">{activeData.role}, {activeData.company}</p>
              </div>
            </div>
          </div>

          {/* Mini Avatars (Bottom Center) - Dynamically updating */}
          <div className="flex items-center justify-center gap-3 mt-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <img src={getAvatar(1)} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" alt="prev user" />
             <img src={getAvatar(2)} className="w-12 h-12 rounded-full border-2 border-white shadow-md z-10 -mt-2 object-cover" alt="next user" />
             <img src={getAvatar(3)} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" alt="future user" />
          </div>
        </div>

        {/* --- ORBITING ELEMENTS (Floating Avatars & Icons) --- */}
        
        {/* Top Left User (Static visual element) */}
        <div className="absolute top-[10%] md:top-[15%] left-[10%] md:left-[20%] animate-float delay-100 hidden sm:block">
          <div className="relative w-16 h-16 group cursor-pointer hover:scale-110 transition-transform">
            <img src={testimonials[0].image} className="w-full h-full rounded-full border-2 border-white shadow-lg object-cover" alt="user" />
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Middle Left Icon */}
        <div className="absolute top-[40%] md:top-[45%] left-[5%] md:left-[12%] animate-float delay-300 hidden md:block">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50">
            <GraduationCap className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Bottom Left User */}
        <div className="absolute bottom-[15%] md:bottom-[20%] left-[15%] md:left-[25%] animate-float delay-200 hidden sm:block">
           <div className="relative w-14 h-14 group">
             <img src={testimonials[3].image} className="w-full h-full rounded-full border-2 border-white shadow-lg object-cover" alt="user" />
           </div>
        </div>

        {/* Top Right User */}
        <div className="absolute top-[30%] md:top-[35%] right-[10%] md:right-[18%] animate-float delay-400 hidden sm:block">
           <div className="relative w-20 h-20 group hover:scale-105 transition-transform">
             <img src={testimonials[4].image} className="w-full h-full rounded-full border-4 border-white shadow-xl object-cover" alt="user" />
             <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#0B1C33] text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
               Verified Alumni
             </div>
           </div>
        </div>

        {/* Bottom Right Icon */}
        <div className="absolute bottom-[30%] md:bottom-[35%] right-[5%] md:right-[15%] animate-float hidden md:block">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50 cursor-pointer hover:bg-purple-50 transition-colors">
             <Play className="w-4 h-4 text-purple-500 fill-current ml-0.5" />
           </div>
        </div>

      </div>
    </div>
  );
};

export default TestimonialOrbit;