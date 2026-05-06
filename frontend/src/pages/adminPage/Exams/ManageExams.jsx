import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Plus,
  Trash2,
  BookOpen,
  FileCheck,
  FileClock,
  Edit3,
  ExternalLink,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";

const API_BASE =import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Toast Notification ───────────────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-bold pointer-events-auto animate-slide-in
          ${t.type === "success" ? "bg-[#0B1C33] text-white" : "bg-red-600 text-white"}`}
      >
        {t.type === "success" ? (
          <CheckCircle2 size={16} />
        ) : (
          <XCircle size={16} />
        )}
        <span>{t.message}</span>
        <button
          onClick={() => removeToast(t.id)}
          className="ml-2 opacity-60 hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
const DeleteModal = ({ exam, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <div>
          <h3 className="font-extrabold text-[#0B1C33] text-base">
            Delete Exam?
          </h3>
          <p className="text-slate-400 text-xs">
            This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100">
        <p className="font-black text-[#0B1C33] text-sm uppercase">
          {exam?.name}
        </p>
        <p className="text-slate-400 text-[11px] mt-0.5 italic">
          /{exam?.slug}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}{" "}
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ── StatCard ──────────────────────────────────────────────────────────────────
const StatCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  onClick,
  active,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left flex justify-between items-center rounded-2xl border p-5 sm:p-6 shadow-sm transition-all
      ${active ? "border-[#0B1C33] bg-[#0B1C33]" : "border-slate-200 bg-white hover:shadow-md"}`}
  >
    <div>
      <p
        className={`text-[11px] font-black uppercase tracking-widest ${active ? "text-slate-400" : "text-slate-400"}`}
      >
        {title}
      </p>
      <h3
        className={`mt-1 text-3xl font-black ${active ? "text-white" : "text-[#0B1C33]"}`}
      >
        {value}
      </h3>
    </div>
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner ${active ? "bg-white/10" : iconBg} ${active ? "text-white" : iconColor}`}
    >
      {icon}
    </div>
  </button>
);

// ── Mobile Exam Card ──────────────────────────────────────────────────────────
const ExamCard = ({ exam, onToggleStatus, onDelete, actionLoading }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-300 transition-all shadow-sm">
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-[#0B1C33] text-sm uppercase truncate">
          {exam.name}
        </p>
        <p className="text-[11px] text-slate-400 italic flex items-center gap-1 mt-0.5">
          <ExternalLink size={9} className="shrink-0" />
          <span className="truncate">/{exam.slug}</span>
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`h-2 w-2 rounded-full ${exam.isPublished ? "bg-green-500" : "bg-amber-400"}`}
        />
        <span
          className={`text-[10px] font-black uppercase ${exam.isPublished ? "text-green-600" : "text-amber-500"}`}
        >
          {exam.isPublished ? "Live" : "Draft"}
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between gap-2">
      <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black uppercase text-slate-500">
        {exam.category}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onToggleStatus(exam._id, exam.isPublished)}
          disabled={actionLoading[exam._id] === "status"}
          className={`px-2.5 py-1.5 text-[10px] font-black rounded-lg border transition-all disabled:opacity-50
            ${exam.isPublished ? "border-amber-200 text-amber-600 hover:bg-amber-50" : "border-green-200 text-green-600 hover:bg-green-50"}`}
        >
          {actionLoading[exam._id] === "status" ? (
            <Loader2 size={11} className="animate-spin" />
          ) : exam.isPublished ? (
            <span className="flex items-center gap-1">
              <EyeOff size={11} /> Unpublish
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Eye size={11} /> Publish
            </span>
          )}
        </button>
        <Link
          to={`/admin/edit-exam/${exam._id}`}
          className="p-1.5 text-slate-400 hover:text-[#0B1C33] hover:bg-slate-100 rounded-lg transition-all"
        >
          <Edit3 size={15} />
        </Link>
        <button
          onClick={() => onDelete(exam)}
          disabled={actionLoading[exam._id] === "delete"}
          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
        >
          {actionLoading[exam._id] === "delete" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
function ManageExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [actionLoading, setActionLoading] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/exams?isAdmin=true`);
      const data = res.data.exams || [];
      setExams(data);
      setStats({
        total: data.length,
        published: data.filter((ex) => ex.isPublished).length,
        draft: data.filter((ex) => !ex.isPublished).length,
      });
    } catch (err) {
      addToast("Failed to load exams: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? "draft" : "published";
    // Optimistic update
    setExams((prev) =>
      prev.map((ex) =>
        ex._id === id ? { ...ex, isPublished: !currentStatus } : ex,
      ),
    );
    setStats((prev) => ({
      ...prev,
      published: prev.published + (currentStatus ? -1 : 1),
      draft: prev.draft + (currentStatus ? 1 : -1),
    }));
    try {
      setActionLoading((prev) => ({ ...prev, [id]: "status" }));
      const res = await axios.patch(`${API_BASE}/api/exams/${id}/status`, {
        status: newStatus,
      });
      if (res.data.success) {
        addToast(
          newStatus === "published" ? "Exam is now Live!" : "Moved to Draft",
        );
      }
    } catch (err) {
      // Revert on failure
      setExams((prev) =>
        prev.map((ex) =>
          ex._id === id ? { ...ex, isPublished: currentStatus } : ex,
        ),
      );
      setStats((prev) => ({
        ...prev,
        published: prev.published + (currentStatus ? 1 : -1),
        draft: prev.draft + (currentStatus ? -1 : 1),
      }));
      addToast(
        err.response?.data?.message ||
          `Status update failed (Code: ${err.response?.status || "network"})`,
        "error",
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await axios.delete(`${API_BASE}/api/exams/${deleteTarget._id}`);
      addToast(`"${deleteTarget.name}" deleted successfully!`);
      setDeleteTarget(null);
      await fetchExams();
    } catch (err) {
      addToast(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "published"
          ? exam.isPublished
          : !exam.isPublished;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans'] text-slate-800 w-full antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        .animate-slide-in { animation: slide-in 0.25s ease forwards; }
        .animate-fade-in { animation: fade-in 0.2s ease forwards; }
      `}</style>

      {deleteTarget && (
        <DeleteModal
          exam={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1C33]">
              Manage Exams
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Create, edit and track all entrance examinations.
            </p>
          </div>
          <button
            onClick={fetchExams}
            disabled={loading}
            className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-400 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* STATS — clickable filters */}
        <div className="mb-6 sm:mb-8 grid grid-cols-3 gap-3 sm:gap-6">
          <StatCard
            title="Total"
            value={stats.total}
            icon={<BookOpen size={20} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-500"
            onClick={() => setFilterStatus("all")}
            active={filterStatus === "all"}
          />
          <StatCard
            title="Published"
            value={stats.published}
            icon={<FileCheck size={20} />}
            iconBg="bg-green-50"
            iconColor="text-green-500"
            onClick={() => setFilterStatus("published")}
            active={filterStatus === "published"}
          />
          <StatCard
            title="Drafts"
            value={stats.draft}
            icon={<FileClock size={20} />}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            onClick={() => setFilterStatus("draft")}
            active={filterStatus === "draft"}
          />
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0B1C33] transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {/* Mobile status filter */}
            <div className="relative sm:hidden">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none cursor-pointer rounded-xl border border-slate-200 bg-white pl-4 pr-9 py-2.5 text-sm text-slate-600 outline-none font-bold"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
          <Link
            to="/admin/add-exam"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700 active:scale-95 transition-all whitespace-nowrap"
          >
            <Plus size={17} /> Add New Exam
          </Link>
        </div>

        {/* RESULTS COUNT */}
        {!loading && (
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">
            {filteredExams.length} exam{filteredExams.length !== 1 ? "s" : ""}{" "}
            found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}

        {/* ── MOBILE CARDS (< md) ────────────────────────────────────── */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-[#DC2626]" size={32} />
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="text-center py-16 text-slate-400 italic text-sm">
              No exams found{searchTerm ? ` matching "${searchTerm}"` : ""}.
            </div>
          ) : (
            filteredExams.map((exam) => (
              <ExamCard
                key={exam._id}
                exam={exam}
                onToggleStatus={handleStatusToggle}
                onDelete={setDeleteTarget}
                actionLoading={actionLoading}
              />
            ))
          )}
        </div>

        {/* ── DESKTOP TABLE (≥ md) ────────────────────────────────────── */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="p-5">Exam Details</th>
                  <th className="p-5 text-center">Category</th>
                  <th className="p-5 text-center">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-16 text-center">
                      <Loader2
                        className="animate-spin text-[#DC2626] mx-auto"
                        size={28}
                      />
                    </td>
                  </tr>
                ) : filteredExams.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-16 text-center text-slate-400 italic"
                    >
                      No exams found
                      {searchTerm ? ` matching "${searchTerm}"` : ""}.
                    </td>
                  </tr>
                ) : (
                  filteredExams.map((exam) => (
                    <tr
                      key={exam._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="p-5 max-w-xs">
                        <p className="font-extrabold text-[#0B1C33] text-sm uppercase group-hover:text-[#DC2626] transition-colors truncate">
                          {exam.name}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5 italic flex items-center gap-1 truncate">
                          <ExternalLink size={10} className="shrink-0" />
                          <span className="truncate">/{exam.slug}</span>
                        </p>
                      </td>
                      <td className="p-5 text-center">
                        <span className="rounded-lg border border-slate-200 px-3 py-1 text-[10px] font-black uppercase bg-white text-slate-500 whitespace-nowrap">
                          {exam.category}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full shrink-0 ${exam.isPublished ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" : "bg-amber-400"}`}
                          />
                          <span
                            className={`font-black text-[10px] uppercase tracking-wide whitespace-nowrap ${exam.isPublished ? "text-green-600" : "text-amber-500"}`}
                          >
                            {exam.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <button
                            onClick={() =>
                              handleStatusToggle(exam._id, exam.isPublished)
                            }
                            disabled={actionLoading[exam._id] === "status"}
                            className={`px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all disabled:opacity-50 whitespace-nowrap
                              ${exam.isPublished ? "border-amber-200 text-amber-600 hover:bg-amber-50" : "border-green-200 text-green-600 hover:bg-green-50"}`}
                          >
                            {actionLoading[exam._id] === "status" ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : exam.isPublished ? (
                              <span className="flex items-center gap-1">
                                <EyeOff size={11} /> Unpublish
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Eye size={11} /> Publish
                              </span>
                            )}
                          </button>
                          <Link
                            to={`/admin/edit-exam/${exam._id}`}
                            className="p-2 text-slate-400 hover:text-[#0B1C33] hover:bg-slate-100 rounded-lg transition-all"
                          >
                            <Edit3 size={15} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(exam)}
                            disabled={actionLoading[exam._id] === "delete"}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!loading && filteredExams.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-400">
                Showing {filteredExams.length} of {exams.length} exams
              </p>
              {filterStatus !== "all" && (
                <button
                  onClick={() => setFilterStatus("all")}
                  className="text-[11px] font-black text-[#DC2626] hover:underline uppercase"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageExams;
