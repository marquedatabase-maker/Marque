import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

// List of all states for the dropdown
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

const InstituteList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All States");

  // --- API CALL ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/institutes");
      setData(res.data.institutes || []);
    } catch (err) {
      console.error("Failed to fetch institutes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this institute?"))
      return;

    try {
      await api.delete(`/institutes/${id}`, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterState === "All States" ||
      (item.state && item.state === filterState);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- MOBILE SIDEBAR & OVERLAY --- */}

      {/* 1. Backdrop Overlay (Visible only on mobile when menu is open) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Sidebar Container (Fixed height, slides in) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-[#0B1C33] shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <main className=" min-h-screen flex flex-col transition-all duration-300">
        {/* HEADER (Sticky) */}

        {/* SCROLLABLE CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto">
            {/* STATS CARDS */}
             <h1 className="text-2xl font-bold pb-5">Manage College</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Colleges
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1C33] mt-1">
                    {data.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                  <i className="fa-solid fa-building-columns"></i>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Active Listings
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1C33] mt-1">
                    {data.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">
                  <i className="fa-solid fa-check-circle"></i>
                </div>
              </div>
            </div>

            {/* SEARCH & ACTION BAR (Stacked on Mobile) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input
                    type="text"
                    placeholder="Search by college name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33] transition-all shadow-sm"
                  />
                </div>

                {/* State Dropdown */}
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 outline-none cursor-pointer hover:border-slate-300 focus:border-[#0B1C33] shadow-sm appearance-none"
                >
                  <option value="All States">All States</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={() => navigate("/admin/add-institute")}
                className="w-full md:w-auto px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add New College</span>
              </button>
            </div>

            {/* TABLE */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-14 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 w-4 h-4 accent-[#0B1C33] cursor-pointer"
                        />
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        College Info
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="p-12 text-center">
                          <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#0B1C33]"></i>
                          <p className="text-xs text-slate-400 mt-2">
                            Loading...
                          </p>
                        </td>
                      </tr>
                    ) : filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-slate-50 transition duration-150 group"
                        >
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 w-4 h-4 accent-[#0B1C33] cursor-pointer"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 border border-slate-200 shadow-sm shrink-0">
                                <i className="fa-solid fa-university text-slate-300 text-lg"></i>
                              </div>
                              <div>
                                <p className="font-bold text-[#0B1C33] line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-xs text-slate-400 font-mono">
                                  ID: {item._id.slice(-6).toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded border 
                                ${
                                  item.type === "Government"
                                    ? "bg-blue-50 text-blue-700 border-blue-100"
                                    : item.type === "Private"
                                      ? "bg-purple-50 text-purple-700 border-purple-100"
                                      : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                            >
                              {item.type || "Unknown"}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600 font-medium">
                            <div className="flex items-center gap-1.5">
                              <i className="fa-solid fa-location-dot text-slate-400 text-xs"></i>
                              <span>{item.city}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-700 border border-green-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>{" "}
                              Active
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/admin/edit-institute/${item._id}`)
                                }
                                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition"
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen text-xs"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                                title="Delete"
                              >
                                <i className="fa-regular fa-trash-can text-xs"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-12 text-center text-slate-400 text-sm"
                        >
                          <div className="flex flex-col items-center">
                            <i className="fa-regular fa-folder-open text-3xl mb-2 text-slate-300"></i>
                            <p>No institutes found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredData.length > 0 && (
                <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
                  <p className="text-xs text-slate-500 text-center sm:text-left">
                    Showing <strong>1-{filteredData.length}</strong> of{" "}
                    <strong>{data.length}</strong> results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 border border-slate-300 rounded text-xs bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-600"
                      disabled
                    >
                      Prev
                    </button>
                    <button className="px-3 py-1 bg-[#0B1C33] text-white rounded text-xs font-bold shadow-sm">
                      1
                    </button>
                    <button
                      className="px-3 py-1 border border-slate-300 rounded text-xs bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-600"
                      disabled
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstituteList;
