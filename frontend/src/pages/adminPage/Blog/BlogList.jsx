import { useEffect, useMemo, useState } from "react";
import api from "../../../Services/api";
// import Sidebar from "../../../components/admin/Sidebar";

import {
  Pencil,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // 🔥 DELETE MODAL STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // pagination
  const BLOGS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog/admin/blogs", {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error("Blog fetch failed", err.response?.status, err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */
  const totalPosts = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "Published").length;
  const draftCount = blogs.filter((b) => b.status === "Draft").length;

  /* ================= CATEGORIES ================= */
  const categories = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => b.category && set.add(b.category));
    return Array.from(set);
  }, [blogs]);

  /* ================= FILTER ================= */
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // b.title ke aage '?' lagane se ya empty string fallback se error resolve ho jayega
      const matchSearch = (b.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || b.status === statusFilter;

      const matchCategory =
        categoryFilter === "all" || b.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [blogs, search, statusFilter, categoryFilter]);
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  /* ================= DELETE ================= */
  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!selectedBlog) return;

    try {
      setDeleting(true);

      // 3. API Call with Correct Header Format
      await api.delete(`/blog/${selectedBlog._id}`, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });

      // 4. UI Update: Bina refresh kiye list se hatana
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlog._id));

      closeDeleteModal();
    } catch (err) {
      console.error(
        "Delete failed details:",
        err.response?.data || err.message,
      );

      // Agar backend abhi bhi token reject kare toh uska message dikhana
      const errorMsg =
        err.response?.data?.message || "Delete failed. Check your token.";
      alert(errorMsg);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* <Sidebar /> */}

      <div className="w-full  p-6 space-y-6">
        {/* ===== HEADER ===== */}
        <h1 className="text-2xl font-bold">Manage Articles</h1>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<FileText />}
            label="Total Posts"
            value={totalPosts}
          />
          <StatCard
            icon={<CheckCircle />}
            label="Published"
            value={publishedCount}
          />
          <StatCard icon={<Clock />} label="Drafts" value={draftCount} />
          <StatCard icon={<Eye />} label="Total Views" value="—" />
        </div>

        {/* ===== FILTER BAR ===== */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title..."
                className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Write */}
          <Link
            to="/admin/add-blog"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
          >
            <Plus size={16} />
            Write New Blog
          </Link>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4"></th>
                <th className="text-left">Article</th>
                <th className="text-left">Category</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                paginatedBlogs.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-slate-50">
                    <td className="p-4"></td>

                    <td className="py-4">
                      <p className="font-semibold">{b.title}</p>
                      <p className="text-xs text-slate-500">/{b.slug}</p>
                    </td>

                    <td>
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                        {b.category}
                      </span>
                    </td>

                    <td className="text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          b.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/Editblog/${b._id}`)}
                          className="p-2 border rounded hover:bg-slate-100"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(b)}
                          className="p-2 border rounded text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded border text-sm font-bold ${
                    currentPage === i + 1
                      ? "bg-red-600 text-white"
                      : "bg-white text-slate-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {!loading && filteredBlogs.length === 0 && (
            <p className="p-6 text-center text-slate-400">No articles found</p>
          )}
        </div>
      </div>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={closeDeleteModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold mb-2">Delete Blog</h2>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">“{selectedBlog?.title}”</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border rounded-lg text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ===== STAT CARD ===== */
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
    <div className="p-2 bg-slate-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default BlogList;
