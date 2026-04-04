import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../Services/api";

import { 
  Bell, CalendarCheck, UserPlus, Search, 
  Plus, PenLine, Trash2 
} from "lucide-react";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ==========================================
      FIXED API FETCH LOGIC (Removed double /api)
     ========================================== */
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      /**
       * FIX: Agar aapka api instance baseURL: ".../api" use kar raha hai,
       * toh yahan sirf "/notifications" likhein.
       */
      const res = await api.get("/notifications");
      
      // Data structure handling as per your API result
      const data = res.data.data || res.data;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error details:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      FIXED DELETE LOGIC WITH AUTH
     ========================================== */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        let token = localStorage.getItem("token");
        if (token && token.startsWith('"')) token = JSON.parse(token);

        // Fixed: matching endpoint format
        await api.delete(`/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setNotifications(prev => prev.filter((n) => n._id !== id));
      } catch (err) {
        alert("Delete failed: " + (err.response?.data?.message || "Unauthorized"));
      }
    }
  };

  // Filter Logic
  const filteredData = notifications.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "All Categories" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-['Plus_Jakarta_Sans',_sans-serif]">
      {/* Added Sidebar back for full UI layout */}
      
      

      <div className="flex-1">
        


        <div className="p-6 lg:p-10">
           <h1 className="text-2xl font-bold pb-5">Manage Notification</h1>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
            <StatCard label="Total Alerts" value={notifications.length} icon={<Bell size={20}/>} color="blue" />
            <StatCard label="Exam Updates" value={notifications.filter(n => n.category === "Exam Alerts").length} icon={<CalendarCheck size={20}/>} color="red" />
            <StatCard label="Admissions" value={notifications.filter(n => n.category === "Admission Alerts").length} icon={<UserPlus size={20}/>} color="green" />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-left">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search news..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#0B1C33] transition-all"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm bg-white font-bold text-slate-600 outline-none cursor-pointer"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                <option>Exam Alerts</option>
                <option>College Alerts</option>
                <option>Admission Alerts</option>
              </select>
            </div>

            <Link to="/admin/add-notification" className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-500/20 active:scale-95">
              <Plus size={18} /> Publish New
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {loading ? (
                  <tr><td colSpan="5" className="p-10 text-center font-bold text-slate-400">Loading Notifications...</td></tr>
                ) : filteredData.length === 0 ? (
                  <tr><td colSpan="5" className="p-10 text-center font-bold text-slate-400">No Notifications Found</td></tr>
                ) : filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#0B1C33] truncate max-w-md">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-md italic font-medium">{item.shortSnippet}</p>
                    </td>
                    <td className="p-4"><Badge category={item.category} /></td>
                    <td className="p-4 text-slate-500 font-bold">{new Date(item.displayDate || item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-wide">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'Published' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                        {item.status === 'Published' ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* <Link to={'#'} className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all">
                          <PenLine size={15} />
                        </Link> */}
                        <button onClick={() => handleDelete(item._id)} className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard helper
const StatCard = ({ label, value, icon, color }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    red: "text-red-500 bg-red-50",
    green: "text-green-500 bg-green-50"
  };
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
      <div>
        <p className="text-[11px] text-slate-500 font-extrabold uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-bold text-[#0B1C33] mt-1 tracking-tight">{value}</h3>
      </div>
      <div className={`${colors[color]} w-12 h-12 rounded-xl flex items-center justify-center`}>{icon}</div>
    </div>
  );
};

// Badge helper
const Badge = ({ category }) => {
  const styles = {
    "Exam Alerts": "bg-red-50 text-red-600 border-red-100",
    "College Alerts": "bg-blue-50 text-blue-600 border-blue-100",
    "Admission Alerts": "bg-green-50 text-green-600 border-green-100",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-tighter ${styles[category] || "bg-slate-50"}`}>
      {category?.replace(" Alerts", " Alert")}
    </span>
  );
};

export default NotificationList;