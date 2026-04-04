import { useEffect, useState } from "react";
// Ensure path is correct based on your folder structure
import Sidebar from "../../components/admin/Sidebar";
import api from "../../Services/api"; // Ensure path is correct
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // fetching dashboard data
    api
      .get("/dashboard", {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 font-bold">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-3"></i>
        <span className="ml-3">Loading Dashboard...</span>
      </div>
    );
  }

  // --- HELPER FOR PIE CHART GRADIENT ---
  // Generates dynamic gradient based on API data (Traffic Sources)
  const getPieGradient = () => {
    if (!data.trafficSources) return "conic-gradient(#E2E8F0 0% 100%)";
    // Example logic: dividing the circle based on 3 segments
    // You can make this more dynamic based on actual values if needed
    return "conic-gradient(#0B1C33 0% 55%, #DC2626 55% 85%, #E2E8F0 85% 100%)";
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. SIDEBAR (Responsive Wrapper) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <div className="w-full transition-all duration-300">
        {/* HEADER */}
        

        {/* CONTENT */}
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
           <h1 className="text-2xl font-bold pb-5">Manage Dashboard</h1>
          {/* ===== 1. KEY METRICS CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total States"
              value={data.cards.totalStates || 28} // Fallback if API not updated yet
              icon="fa-map-location-dot"
              color="bg-blue-50 text-blue-600"
              footer="Active Regions"
            />
            <StatCard
              title="Listed Colleges"
              value={data.cards.totalInstitutes}
              icon="fa-building-columns"
              color="bg-red-50 text-red-600"
              footer="+5 Added this week"
            />
            <StatCard
              title="Published Blogs"
              value={data.cards.blogPosts}
              icon="fa-pen-nib"
              color="bg-purple-50 text-purple-600"
              footer="+8% Content Growth"
            />
            <StatCard
              title="System Users"
              value={data.cards.systemUsers}
              icon="fa-shield-halved"
              color="bg-slate-100 text-slate-600"
              footer="All Systems Operational"
            />
          </div>

          {/* ===== 2. CHARTS SECTION ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* LEFT: Content Velocity (Bar Chart) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold text-[#0B1C33] uppercase tracking-wider">
                  Content Publishing Velocity
                </h3>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-100"></span>{" "}
                    Blogs
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>{" "}
                    Colleges
                  </div>
                </div>
              </div>

              {/* CSS-Only Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-2 px-2 border-b border-slate-100 pb-2">
                {data.leadTrend &&
                  data.leadTrend.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 w-full group cursor-pointer"
                    >
                      <div
                        className={`w-full max-w-[40px] rounded-t transition-all duration-500 relative group-hover:opacity-90 
                        ${d.day === "Thu" ? "bg-[#DC2626] shadow-lg" : "bg-blue-100 group-hover:bg-[#0B1C33]"}`}
                        style={{ height: `${Math.min(d.value * 2.5, 220)}px` }} // Dynamic Height
                      >
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0B1C33] text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                          {d.value} Items
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold ${d.day === "Thu" ? "text-[#DC2626]" : "text-slate-400"}`}
                      >
                        {d.day}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* RIGHT: Inventory (Pie Chart) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-bold text-[#0B1C33] uppercase tracking-wider mb-4">
                College Inventory
              </h3>

              <div className="flex justify-center py-6">
                <div
                  className="w-[140px] h-[140px] rounded-full relative"
                  style={{ background: getPieGradient() }}
                >
                  <div className="absolute w-[90px] h-[90px] bg-white rounded-full top-[25px] left-[25px] flex flex-col items-center justify-center leading-none">
                    <span className="text-2xl font-bold text-[#0B1C33]">
                      {data.cards.totalInstitutes}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                      Total
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mt-2">
                {data.trafficSources &&
                  data.trafficSources.map((t, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded ${i === 0 ? "bg-[#0B1C33]" : i === 1 ? "bg-[#DC2626]" : "bg-slate-200"}`}
                        ></div>
                        <span className="font-bold text-slate-600">
                          {t.label}
                        </span>
                      </div>
                      <span className="font-bold text-[#0B1C33]">
                        {t.value}%
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* ===== 3. RECENT COLLEGES & BLOGS (Replaced Logs) ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Colleges */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-bold text-[#0B1C33] uppercase tracking-wider">
                  Recent Colleges
                </h3>
                <a
                  href="#"
                  className="text-xs font-bold text-[#DC2626] hover:underline"
                >
                  View All
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                    {/* Mock Data for UI - Replace with data.recentColleges map if available */}
                    <RecentItem
                      name="IIT Bombay"
                      category="Engineering"
                      date="Today, 10:00 AM"
                      status="Live"
                      statusColor="text-green-600 bg-green-50"
                    />
                    <RecentItem
                      name="Symbiosis Pune"
                      category="Management"
                      date="Yesterday"
                      status="Review"
                      statusColor="text-yellow-600 bg-yellow-50"
                    />
                    <RecentItem
                      name="Amity University"
                      category="University"
                      date="Jan 24, 2026"
                      status="Live"
                      statusColor="text-green-600 bg-green-50"
                    />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Blogs */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-bold text-[#0B1C33] uppercase tracking-wider">
                  Recent Blogs
                </h3>
                <a
                  href="#"
                  className="text-xs font-bold text-[#DC2626] hover:underline"
                >
                  View All
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                    <RecentItem
                      name="JEE Main 2026 Strategy"
                      category="Exam Tips"
                      date="2 hours ago"
                      status="Published"
                      statusColor="text-green-600 bg-green-50"
                    />
                    <RecentItem
                      name="Top 10 MBA Colleges"
                      category="Career"
                      date="5 hours ago"
                      status="Draft"
                      statusColor="text-slate-500 bg-slate-100"
                    />
                    <RecentItem
                      name="NEET Counselling Guide"
                      category="Medical"
                      date="Jan 23, 2026"
                      status="Published"
                      statusColor="text-green-600 bg-green-50"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ===========================
   SUB-COMPONENTS
   =========================== */

const StatCard = ({ title, value, icon, color, footer }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-[#0B1C33] mt-1 font-sans">
            {value}
          </h3>
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${color}`}
        >
          <i className={`fa-solid ${icon}`}></i>
        </div>
      </div>
      <div className="flex items-center text-xs font-medium">
        <span className="text-slate-500">{footer}</span>
      </div>
    </div>
  );
};

const RecentItem = ({ name, category, date, status, statusColor }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4">
        <p className="font-bold text-[#0B1C33] text-sm">{name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{category}</p>
      </td>
      <td className="p-4 text-xs text-slate-500 text-right">{date}</td>
      <td className="p-4 text-right">
        <span
          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${statusColor}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};
