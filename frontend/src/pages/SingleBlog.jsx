import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import BlogSidebar from "./BlogSidebar";
import api from "../Services/api";
import marquelogo from "../assets/images/marque-logo.png";

const SingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); // Hook for redirection
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle sidebar clicks
  // It redirects to /blog and passes the filter state
  const handleSidebarAction = (type, value) => {
    navigate("/blog", { state: { filterType: type, filterValue: value } });
  };

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0); // Reset scroll to top when opening a new blog
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blog/slug/${slug}`);
      setBlog(res.data.blog);
    } catch (err) {
      console.error("Single blog fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="animate-pulse font-bold text-xl">Loading article...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Blog article not found.
      </div>
    );
  }

  return (
    <div className="bg-slate-50 font-outfit">
      {/* HEADER (Note: You likely have a global Navbar, if not, keep this) */}
      <header className="fixed top-0 w-full bg-white border-b border-slate-200 h-20 z-50 flex items-center px-8 shadow-sm">
         <Link to="/"><img src={marquelogo} alt="Logo" className="h-10" /></Link>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
        {/* BREADCRUMB */}
        <nav className="flex text-xs font-bold text-slate-400 mb-8 uppercase tracking-wide">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-red-600 transition">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0B1C33]">{blog.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= ARTICLE ================= */}
          <article className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
            <header className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4">
                {blog.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1C33] leading-tight mb-6">
                {blog.title}
              </h1>

              <div className="flex items-center justify-between border-y border-slate-100 py-6">
                <div className="flex items-center gap-4">
                  <img
                    src={marquelogo}
                    alt="Marque"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-[#0B1C33] object-contain"
                  />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Written By</p>
                    <p className="text-sm font-bold text-[#0B1C33]">Marque Team</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
                  <span className="hidden sm:flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-red-600"></i>
                    {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : "—"}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-clock text-red-600"></i>
                    {blog.readTime || "5 min read"}
                  </span>
                </div>
              </div>
            </header>

            {/* FEATURE IMAGE */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
              <img
                src={blog.featuredImage}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                alt={blog.title}
              />
            </div>

            {/* CONTENT */}
            <div
              className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* TAGS + SHARE */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-[#0B1C33] uppercase">Tags:</span>
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => handleSidebarAction('tag', tag)}
                    className="px-4 py-1.5 bg-slate-100 text-[11px] font-bold text-slate-500 rounded-full hover:bg-red-600 hover:text-white transition cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-[#0B1C33] uppercase">Share:</span>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition"><i className="fa-brands fa-facebook-f"></i></button>
                  <button className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition"><i className="fa-brands fa-twitter"></i></button>
                  <button className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:-translate-y-1 transition"><i className="fa-brands fa-linkedin-in"></i></button>
                </div>
              </div>
            </div>
          </article>

          {/* ================= SIDEBAR ================= */}
          {/* Added 'sticky' and 'top-24' for the scrolling effect */}
          <aside className="lg:col-span-4 sticky top-24 space-y-8">
            <BlogSidebar 
               search=""
               setSearch={(val) => handleSidebarAction('search', val)}
               activeCategory=""
               setCategory={(val) => handleSidebarAction('category', val)}
               activeTag=""
               setTag={(val) => handleSidebarAction('tag', val)}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SingleBlog;