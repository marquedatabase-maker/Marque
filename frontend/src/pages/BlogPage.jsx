import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "./BlogSidebar";
import api from "../Services/api";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import marquelogo from "../assets/images/marque-logo.png";


const BLOGS_PER_PAGE = 5;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      const published = (res.data.blogs || []).filter(
        (b) => b.status === "Published",
      );
      setBlogs(published);
    } catch (err) {
      console.error("Blog fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* Reset pagination on filter change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, tag]);

  /* ================= FILTER ================= */
  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      if (!blog) return false;

      const matchSearch = searchText
        ? blog.title?.toLowerCase().includes(searchText) ||
          blog.excerpt?.toLowerCase().includes(searchText) ||
          blog.category?.toLowerCase().includes(searchText)
        : true;

      const matchCategory = category ? blog.category === category : true;
      const matchTag = tag ? blog.tags?.includes(tag) : true;

      return matchSearch && matchCategory && matchTag;
    });
  }, [blogs, search, category, tag]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  /* ================= DATE HELPER (🔥 IMPORTANT) ================= */
  const getPublishDate = (date) => {
    if (!date) return { day: "—", month: "" };

    const d = new Date(date);
    return {
      day: d.getDate(),
      month: d.toLocaleString("en-US", { month: "short" }),
    };
  };

  return (
    <div className="bg-slate-50 min-h-screen font-[Outfit]">
      {/* HEADER */}
      <div className="bg-[#0B1C33]  pt-[140px] py-20 text-center">
        <span
          className=" py-1.5 px-4  rounded-2xl text-red-500 bg-[rgba(139,69,19,0.15)]
  "
        >
          Insights & News
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white pt-7">
          Latest From Our Blog
        </h1>
        <p className="text-slate-400 mt-3 text-xl">
          Stay updated with the latest trends in education, technology, and
          campus <br></br>life at Marque.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* BLOG LIST */}
        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <p className="text-center text-slate-400">Loading blogs...</p>
          ) : paginatedBlogs.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border">
              <p className="text-slate-500 text-lg">No articles found</p>
            </div>
          ) : (
            paginatedBlogs.map((blog) => {
              const { day, month } = getPublishDate(blog.publishDate);

              return (
                <article
                  key={blog._id}
                  className="group bg-white rounded-3xl border flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <div className="md:w-[42%] relative overflow-hidden h-64 md:h-auto">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* DATE BADGE */}
                    <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-xl p-2 text-center min-w-[55px] shadow-sm">
                      <div className="text-xl font-black text-[#0B1C33] leading-none">
                        {day}
                      </div>
                      <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-1">
                        {month}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-4 text-xs font-bold uppercase mb-3">
                        <span className="text-red-600 bg-red-50 py-1 px-2 rounded font-thin">
                          {blog.category}
                        </span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock size={12} /> {blog.readTime || "5 Min Read"}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold mb-3 group-hover:text-red-600">
                        {blog.title}
                      </h2>

                      <p className="text-slate-500 line-clamp-2">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t mt-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={marquelogo}
                          alt="Marque Logo"
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-blue-950 object-contain"
                        />

                        <div>
                          
                          <p className="text-sm font-bold text-brandNavy">
                            Marque
                          </p>
                        </div>
                      </div>

                      <Link
                       to={`/blog/${blog.slug}`}
                        className="text-red-600 font-bold flex items-center gap-1"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 pt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-10 h-10 border rounded-full"
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold ${
                    currentPage === i + 1 ? "bg-red-600 text-white" : "border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="w-10 h-10 border rounded-full"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <BlogSidebar
            search={search}
            setSearch={setSearch}
            activeCategory={category}
            setCategory={setCategory}
            activeTag={tag}
            setTag={setTag}
          />
        </aside>
      </main>
    </div>
  );
};

export default BlogPage;
