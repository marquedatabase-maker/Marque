import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const TopScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate 0 to 100%
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);

      // Show button after 300px
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes wave-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-14 h-14 bg-[#0B1C33] rounded-full shadow-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 ring-4 ring-white/10"
          aria-label="Scroll to top"
        >
          {/* --- LIQUID WAVE CONTAINER --- */}
          <div 
            className="absolute left-0 w-full bg-[#DC2626] transition-all duration-100 ease-linear"
            style={{ 
              bottom: `${scrollProgress - 15}%`, // Offset to ensure wave covers fully at 100%
              height: "120%" 
            }}
          >
            {/* The Rotating Wave Shape */}
            <div 
              className="absolute w-[200%] h-[200%] bg-[#DC2626] rounded-[40%] -left-[50%] -top-[90%]"
              style={{
                animation: "wave-spin 6s linear infinite",
                opacity: 0.9
              }}
            />
            {/* Secondary Wave for Depth (slightly transparent/faster) */}
            <div 
              className="absolute w-[200%] h-[200%] bg-white/20 rounded-[45%] -left-[50%] -top-[90%]"
              style={{
                animation: "wave-spin 10s linear infinite",
              }}
            />
          </div>

          {/* --- ICON --- */}
          <div className="relative z-10 text-white drop-shadow-md">
            <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={3} />
          </div>

          {/* Glass Reflection Shine (Optional Polish) */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] pointer-events-none"></div>
        </button>
        
        {/* Percentage Label (Optional: appears on hover) */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </>
  );
};

export default TopScroll;