import { useState } from "react";

const LocationTabs = () => {
  const [active, setActive] = useState("campus");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex bg-slate-50 border-b">
        {["campus", "corp"].map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`w-1/2 py-4 font-bold ${
              active === tab
                ? "border-b-2 border-[#DC2626] text-[#0B1C33]"
                : "text-slate-400"
            }`}
          >
            {tab === "campus" ? "University Campus" : "Corporate Office"}
          </button>
        ))}
      </div>

      <div className="p-8">
        {active === "campus" ? (
          <>
            <h4 className="text-xl font-bold mb-2">Bennett University Campus</h4>
            <p className="text-sm text-slate-500 mb-6">
              Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh 201310
            </p>
          </>
        ) : (
          <>
            <h4 className="text-xl font-bold mb-2">Corporate Office (Delhi)</h4>
            <p className="text-sm text-slate-500 mb-6">
              Times House, 7 Bahadur Shah Zafar Marg, New Delhi 110002
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationTabs;
