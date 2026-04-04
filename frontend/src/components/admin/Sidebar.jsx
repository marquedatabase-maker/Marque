import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Bell,
  Building2,
  GraduationCap,
  PenTool,
  Shield,
  LogOut,
} from "lucide-react";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mb-1
     transition-all duration-200
     ${
       isActive
         ? "bg-white/10 text-white border-l-[3px] border-red-500"
         : "text-slate-400 hover:bg-white/5 hover:text-white"
     }`;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* ================= MOBILE TOP BAR ================= */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white shadow
        flex items-center px-4 z-30"
      >
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
        <span className="ml-3 font-semibold">Admin Panel</span>
      </div>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-[260px]
        bg-gradient-to-b from-[#0B1C33] to-[#081426] text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Brand */}
        <div
          className="h-[72px] flex items-center justify-between px-6
          border-b border-white/10"
        >
          <NavLink to="/" className={linkClass}>
            <span className="text-xl font-bold">
              Marque<span className="text-red-500">Career</span>
            </span>
          </NavLink>

          <button
            className="lg:hidden text-slate-400"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-3 py-4 overflow-y-auto">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <p className="px-4 mt-6 mb-2 text-[11px] text-slate-500 uppercase">
            Lead Management
          </p>
          <NavLink to="/admin/admission/get-admissions" className={linkClass}>
            <Users size={18} /> Leads
          </NavLink>
          <NavLink to="/notification-list" className={linkClass}>
            <Bell size={18} /> Notifications
          </NavLink>

          <p className="px-4 mt-6 mb-2 text-[11px] text-slate-500 uppercase">
            Academics
          </p>
          <NavLink to="/admin/institutes" className={linkClass}>
            <Building2 size={18} /> Colleges
          </NavLink>
          <NavLink to="/admin/course" className={linkClass}>
            <GraduationCap size={18} /> Courses
          </NavLink>

          <NavLink to="/admin/exam" className={linkClass}>
            <GraduationCap size={18} /> Exam
          </NavLink>

          <p className="px-4 mt-6 mb-2 text-[11px] text-slate-500 uppercase">
            Content
          </p>
          <NavLink to="/admin/blog" className={linkClass}>
            <PenTool size={18} /> Blogs
          </NavLink>

          <p className="px-4 mt-6 mb-2 text-[11px] text-slate-500 uppercase">
            Settings
          </p>
          <NavLink to="/admin/profile" className={linkClass}>
            <Shield size={18} /> Admins / Users
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm
            font-semibold text-red-400 hover:bg-red-500/10 rounded-xl"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ================= PAGE CONTENT ================= */}
    </div>
  );
}
