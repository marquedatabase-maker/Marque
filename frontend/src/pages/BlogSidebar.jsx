import React, { useState } from "react";
import { Search, Mail, Calendar, ChevronRight, CheckCircle } from "lucide-react";

// Dummy data
const categoriesList = [
  { name: "Technology", count: 12 },
  { name: "Campus Life", count: "08" },
  { name: "Placements", count: 24 },
  { name: "Faculty Insights", count: "05" },
];

const tagsList = [
  "Engineering",
  "MBA",
  "CampusLife",
  "Alumni",
  "Research",
  "Innovation",
];

const BlogSidebar = ({
  search,
  setSearch,
  setCategory,
  setTag,
  activeCategory,
  activeTag,
}) => {
  /* ===== SUBSCRIBE STATE ===== */
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSuccess(true);
    setEmail("");

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 sticky top-28">
      {/* SEARCH */}
      <div className="bg-white p-7 rounded-3xl border shadow-sm">
        <h4 className="font-bold mb-5 border-l-4 border-brandRed pl-4">
          Search
        </h4>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type keywords..."
           className="w-full pl-5 pr-14 py-4 bg-slate-50 rounded-2xl border-none text-sm outline-none focus:ring-2 focus:ring-red-100"
          />
          <button className="absolute right-2 top-2 bg-brandRed text-white p-2.5 rounded-xl">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="bg-white p-7 rounded-3xl border shadow-sm">
        <h4 className="font-bold mb-5 border-l-4 border-brandRed pl-4">
          Categories
        </h4>
        <div className="space-y-2">
          {categoriesList.map((cat) => (
            <button
              key={cat.name}
              onClick={() =>
                setCategory(activeCategory === cat.name ? "" : cat.name)
              }
              className={`flex justify-between w-full p-4 rounded-2xl text-sm ${
                activeCategory === cat.name
                  ? "bg-red-50 text-brandRed font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex gap-2 items-center">
                <ChevronRight size={14} />
                {cat.name}
              </span>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div className="bg-white p-7 rounded-3xl border shadow-sm">
        <h4 className="font-bold mb-5 border-l-4 border-brandRed pl-4">
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {tagsList.map((t) => (
            <button
              key={t}
              onClick={() => setTag(activeTag === t ? "" : t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${
                activeTag === t
                  ? "bg-brandRed text-white"
                  : "border hover:text-brandRed"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* SUBSCRIBE */}
      <div className="relative overflow-hidden rounded-[2rem] p-8 bg-gradient-to-br from-[#0B1C33] via-[#111827] to-[#2B1E3C] shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <Mail className="text-white/80" size={26} />
            </div>
            <h4 className="text-white text-xl font-extrabold">Subscribe</h4>
          </div>

          <p className="text-slate-400 text-sm mb-5">
            Get the latest news and updates directly to your inbox.
          </p>

          {success && (
            <div className="flex items-center gap-2 mb-4 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm font-bold">
              <CheckCircle size={18} />
              Thank you for subscribing!
            </div>
          )}

          <form onSubmit={handleSubscribe} className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Your Email Address"
              className="w-full rounded-xl px-5 py-4 bg-white/5 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
