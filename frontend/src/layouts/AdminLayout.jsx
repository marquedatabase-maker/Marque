import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      {/* 🔥 FIXED SIDEBAR */}
      <aside className="fixed top-0 left-0 h-screen w-[260px] bg-[#0B1C33] z-50">
        <Sidebar />
      </aside>

      {/* 🔥 CONTENT AREA */}
      <main className="ml-[260px] min-h-screen p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
