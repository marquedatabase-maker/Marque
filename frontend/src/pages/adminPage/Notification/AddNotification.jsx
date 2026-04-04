import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../Services/api"; 
import { FileText, Link as LinkIcon, Sliders, ChevronRight } from "lucide-react";

const AddNotification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    targetUrl: "",
    shortSnippet: "",
    category: "Exam Alerts",
    displayDate: new Date().toISOString().split("T")[0],
    status: "Published",
    isPinned: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.targetUrl) {
      alert("Notification Title and Target URL are required!");
      return;
    }

    setLoading(true);
    try {
      // 1. SAFE TOKEN EXTRACTION
      let token = localStorage.getItem("token") || localStorage.getItem("adminToken");

      // Agar token missing hai toh wapas login page par bhej do
      if (!token || token === "undefined") {
        alert("Session expired. Please login again to get a valid token.");
        navigate("/admin/login");
        return;
      }

      // 2. CLEAN TOKEN (JSON quotes remove karein)
      const cleanToken = token.replace(/^"(.*)"$/, '$1');

      // Debugging: Console check
      console.log("Submitting Data:", formData);
      console.log("Using Token:", cleanToken.substring(0, 10) + "...");

      // 3. API CALL WITH AUTH HEADERS
      const response = await api.post("/notifications", formData, {
        headers: {
          Authorization: `Bearer ${cleanToken.trim()}`,
        },
      });
      
      if (response.status === 201 || response.status === 200) {
        alert("Notification Published Successfully!");
        navigate("/notification-list");
      }
    } catch (error) {
      // Detailed error logging
      console.error("Publish Error Details:", error.response?.data || error.message);
      
      // Backend error message dikhana
      const errorMsg = error.response?.data?.message || "Failed to publish. Check console for details.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-['Plus_Jakarta_Sans',_sans-serif]">
      
      <div className="flex-1">
        {/* Header Section */}
        <header className="h-[70px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4 text-left">
            <div>
              <h2 className="text-xl font-bold text-[#0B1C33]">Add Notification</h2>
              <nav className="text-[11px] text-slate-500 mt-0.5 font-semibold flex items-center gap-1 uppercase tracking-widest">
                <Link to="/admin/notifications" className="hover:text-[#DC2626]">Notifications</Link> 
                <ChevronRight size={10} strokeWidth={3} className="mx-1 text-slate-400" /> 
                <span className="text-slate-400">Add New</span>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/notifications" className="px-5 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</Link>
            <button 
              onClick={handleSubmit} 
              disabled={loading} 
              className="px-8 py-2.5 bg-[#DC2626] text-white rounded-lg text-sm font-bold hover:bg-[#b91c1c] shadow-lg shadow-red-500/20 active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-5xl mx-auto">
          <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {/* Form Fields Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <h3 className="text-[15px] font-bold text-[#0B1C33] mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                  <FileText size={18} className="text-[#DC2626]" /> Basic Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B1C33] mb-2 uppercase tracking-wider">Notification Title *</label>
                    <input 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl text-sm font-semibold outline-none focus:border-[#0B1C33] transition-all" 
                      placeholder="e.g. JEE Main 2026 Admit Card Released" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B1C33] mb-2 uppercase tracking-wider">Target URL *</label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        name="targetUrl" 
                        value={formData.targetUrl} 
                        onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3.5 border border-[#E2E8F0] rounded-xl text-sm text-blue-600 outline-none focus:border-[#0B1C33] transition-all" 
                        placeholder="https://collegedekho.com/news/..." 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-[11px] font-extrabold text-[#0B1C33] uppercase">Short Snippet</label>
                      <span className="text-[10px] font-bold text-slate-400">{formData.shortSnippet.length}/150</span>
                    </div>
                    <textarea 
                      name="shortSnippet" 
                      rows="5" 
                      maxLength="150" 
                      value={formData.shortSnippet} 
                      onChange={handleChange} 
                      className="w-full px-4 py-4 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#0B1C33] transition-all resize-none" 
                      placeholder="Brief summary of the news..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Sidebar Right Column */}
            <div className="space-y-6">
              <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <h3 className="text-[15px] font-bold text-[#0B1C33] mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                  <Sliders size={18} className="text-[#DC2626]" /> Settings
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B1C33] mb-2 uppercase">Category</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm font-bold outline-none cursor-pointer focus:border-[#0B1C33]"
                    >
                      <option>Exam Alerts</option>
                      <option>College Alerts</option>
                      <option>Admission Alerts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B1C33] mb-2 uppercase">Display Date</label>
                    <input 
                      type="date" 
                      name="displayDate" 
                      value={formData.displayDate} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm font-bold text-slate-700 outline-none" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                    <span className="text-[11px] font-extrabold text-[#0B1C33] uppercase">Pin to Top?</span>
                    <input 
                      type="checkbox" 
                      name="isPinned" 
                      checked={formData.isPinned} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-[#DC2626] cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddNotification;