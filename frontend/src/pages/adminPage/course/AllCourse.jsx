// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Bell,
//   Search,
//   Plus,
//   Trash2,
//   CalendarCheck,
//   UserPlus,
//   BookOpen,
//   FileCheck,
//   FileClock,
// } from "lucide-react";
// import {
//   getAllCourses,
//   deleteCourse,
//   togglePublish,
// } from "../../../Services/api.js";

// function AllCourse({ onAddNew }) {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- 1. FILTER & SEARCH STATES ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'published', 'draft'

//   // --- STATS STATE ---
//   const [stats, setStats] = useState({
//     total: 0,
//     published: 0,
//     draft: 0,
//   });

//   const fetchCourses = async () => {
//     try {
//       const res = await getAllCourses();
//       const data = res.data.data;
//       setCourses(data);

//       // Calculate Stats
//       const publishedCount = data.filter((c) => c.isPublished).length;
//       const draftCount = data.filter((c) => !c.isPublished).length;

//       setStats({
//         total: data.length,
//         published: publishedCount,
//         draft: draftCount,
//       });
//     } catch (err) {
//       console.error("Failed to load courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePublishToggle = async (id, status) => {
//     try {
//       await togglePublish(id, !status);
//       fetchCourses();
//     } catch (err) {
//       alert("Failed to update status");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this course?")) return;
//     await deleteCourse(id);
//     fetchCourses();
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // --- 2. FILTER LOGIC ---
//   const filteredCourses = courses.filter((course) => {
//     // Search Logic (Title, Category, or ID match)
//     const matchesSearch =
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course._id.toLowerCase().includes(searchTerm.toLowerCase());

//     // Status Filter Logic
//     const matchesStatus =
//       filterStatus === "all"
//         ? true
//         : filterStatus === "published"
//           ? course.isPublished
//           : !course.isPublished; // 'draft'

//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 w-full">
//       {/* --- HEADER --- */}

//       {/* --- CONTENT AREA --- */}
//       <div className="p-6 lg:p-10">
//         {/* STATS GRID */}
//          <h1 className="text-2xl font-bold pb-5">Manage Courses</h1>
//         <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
//           <StatCard
//             title="Total Courses"
//             value={stats.total}
//             icon={<BookOpen size={20} />}
//             iconBg="bg-blue-50"
//             iconColor="text-blue-500"
//           />
//           <StatCard
//             title="Published Courses"
//             value={stats.published}
//             icon={<FileCheck size={20} />}
//             iconBg="bg-green-50"
//             iconColor="text-green-500"
//           />
//           <StatCard
//             title="Draft Courses"
//             value={stats.draft}
//             icon={<FileClock size={20} />}
//             iconBg="bg-amber-50"
//             iconColor="text-amber-500"
//           />
//         </div>

//         {/* FILTERS & ACTIONS */}
//         <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
//           <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
//             {/* Search Input */}
//             <div className="relative w-full md:w-72">
//               <Search
//                 className="absolute left-3 top-2.5 text-slate-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by Title, Category or ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)} // Update search state
//                 className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33]"
//               />
//             </div>

//             {/* Filter Dropdown */}
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)} // Update filter state
//               className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none hover:border-slate-300"
//             >
//               <option value="all">All Status</option>
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <Link to="/admin/courses/add"
//             onClick={onAddNew}
//             className="flex items-center gap-2 rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#b91c1c] active:scale-95"
//           >
//             <Plus size={16} /> Add New Course
//           </Link>
//         </div>

//         {/* Table */}
//         <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-left">
//               <thead className="bg-slate-50 border-b border-slate-200">
//                 <tr>
//                   <th className="p-4 text-xs font-bold uppercase">Title</th>
//                   <th className="p-4 text-xs font-bold uppercase">Category</th>
//                   <th className="p-4 text-xs font-bold uppercase">Date</th>
//                   <th className="p-4 text-xs font-bold uppercase">Status</th>
//                   <th className="p-4 text-right text-xs font-bold uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="5" className="p-8 text-center text-slate-500">
//                       Loading courses...
//                     </td>
//                   </tr>
//                 ) : filteredCourses.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-8 text-center text-slate-500">
//                       No matching courses found.
//                     </td>
//                   </tr>
//                 ) : (
//                   // ✅ Use filteredCourses here
//                   filteredCourses.map((course) => (
//                     <tr key={course._id} className="hover:bg-slate-50">
//                       {/* TITLE */}
//                       <td className="p-4">
//                         <p className="font-bold text-[#0B1C33]">
//                           {course.title}
//                         </p>
//                         <p className="text-xs text-slate-400 truncate w-64">
//                           ID: {course._id}
//                         </p>
//                       </td>

//                       {/* CATEGORY */}
//                       <td className="p-4">
//                         <span className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase bg-slate-50 text-slate-600">
//                           {course.category}
//                         </span>
//                       </td>

//                       {/* DATE */}
//                       <td className="p-4 text-slate-600">
//                         {new Date(course.createdAt).toLocaleDateString()}
//                       </td>

//                       {/* STATUS */}
//                       <td className="p-4">
//                         <span className="flex items-center gap-2 font-medium">
//                           <span
//                             className={`h-2 w-2 rounded-full ${
//                               course.isPublished
//                                 ? "bg-green-500"
//                                 : "bg-amber-400"
//                             }`}
//                           ></span>
//                           {course.isPublished ? "Published" : "Draft"}
//                         </span>
//                       </td>

//                       {/* ACTIONS */}
//                       <td className="p-4 text-right">
//                         <div className="flex justify-end gap-2">
//                           <button
//                             onClick={() =>
//                               handlePublishToggle(
//                                 course._id,
//                                 course.isPublished,
//                               )
//                             }
//                             className={`border px-3 py-1 text-xs rounded transition-colors ${
//                               course.isPublished
//                                 ? "border-amber-200 text-amber-600 hover:bg-amber-50"
//                                 : "border-green-200 text-green-600 hover:bg-green-50"
//                             }`}
//                           >
//                             {course.isPublished ? "Unpublish" : "Publish"}
//                           </button>

//                           <button
//                             onClick={() => handleDelete(course._id)}
//                             className="border border-red-200 text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Sub Components ---

// const StatCard = ({ title, value, icon, iconBg, iconColor }) => (
//   <div className="flex justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
//     <div>
//       <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
//         {title}
//       </p>
//       <h3 className="mt-1 text-2xl font-bold text-[#0B1C33]">{value}</h3>
//     </div>
//     <div
//       className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
//     >
//       {icon}
//     </div>
//   </div>
// );

// export default AllCourse;

// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/pages/adminPage/course/AllCourse.jsx
// CHANGES: Sirf edit button add kiya (Pencil icon), baki sab same hai
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate add kiya
import {
  Bell,
  Search,
  Plus,
  Trash2,
  CalendarCheck,
  UserPlus,
  BookOpen,
  FileCheck,
  FileClock,
  Pencil, // ✅ Pencil icon add kiya
} from "lucide-react";
import {
  getAllCourses,
  deleteCourse,
  togglePublish,
} from "../../../Services/api.js";

function AllCourse({ onAddNew }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ navigate hook

  // --- 1. FILTER & SEARCH STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'published', 'draft'

  // --- STATS STATE ---
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });

  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      const data = res.data.data;
      setCourses(data);

      const publishedCount = data.filter((c) => c.isPublished).length;
      const draftCount = data.filter((c) => !c.isPublished).length;

      setStats({
        total: data.length,
        published: publishedCount,
        draft: draftCount,
      });
    } catch (err) {
      console.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (id, status) => {
    try {
      await togglePublish(id, !status);
      fetchCourses();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await deleteCourse(id);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "published"
          ? course.isPublished
          : !course.isPublished;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 w-full">
      {/* --- CONTENT AREA --- */}
      <div className="p-6 lg:p-10">
        {/* STATS GRID */}
        <h1 className="text-2xl font-bold pb-5">Manage Courses</h1>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            title="Total Courses"
            value={stats.total}
            icon={<BookOpen size={20} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatCard
            title="Published Courses"
            value={stats.published}
            icon={<FileCheck size={20} />}
            iconBg="bg-green-50"
            iconColor="text-green-500"
          />
          <StatCard
            title="Draft Courses"
            value={stats.draft}
            icon={<FileClock size={20} />}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />
        </div>

        {/* FILTERS & ACTIONS */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by Title, Category or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33]"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none hover:border-slate-300"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Link
            to="/admin/courses/add"
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#b91c1c] active:scale-95"
          >
            <Plus size={16} /> Add New Course
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase">Title</th>
                  <th className="p-4 text-xs font-bold uppercase">Category</th>
                  <th className="p-4 text-xs font-bold uppercase">Date</th>
                  <th className="p-4 text-xs font-bold uppercase">Status</th>
                  <th className="p-4 text-right text-xs font-bold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      Loading courses...
                    </td>
                  </tr>
                ) : filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      No matching courses found.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-slate-50">
                      {/* TITLE */}
                      <td className="p-4">
                        <p className="font-bold text-[#0B1C33]">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate w-64">
                          ID: {course._id}
                        </p>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4">
                        <span className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase bg-slate-50 text-slate-600">
                          {course.category}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="p-4 text-slate-600">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <span className="flex items-center gap-2 font-medium">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              course.isPublished
                                ? "bg-green-500"
                                : "bg-amber-400"
                            }`}
                          ></span>
                          {course.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* ✅ EDIT BUTTON — navigates to edit page with course id */}
                          <button
                            onClick={() =>
                              navigate(`/admin/courses/edit/${course._id}`)
                            }
                            title="Edit Course"
                            className="border border-blue-200 text-blue-500 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() =>
                              handlePublishToggle(
                                course._id,
                                course.isPublished,
                              )
                            }
                            className={`border px-3 py-1 text-xs rounded transition-colors ${
                              course.isPublished
                                ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                                : "border-green-200 text-green-600 hover:bg-green-50"
                            }`}
                          >
                            {course.isPublished ? "Unpublish" : "Publish"}
                          </button>

                          <button
                            onClick={() => handleDelete(course._id)}
                            className="border border-red-200 text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub Components ---
const StatCard = ({ title, value, icon, iconBg, iconColor }) => (
  <div className="flex justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <h3 className="mt-1 text-2xl font-bold text-[#0B1C33]">{value}</h3>
    </div>
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
    >
      {icon}
    </div>
  </div>
);

export default AllCourse;
