import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../../Services/api";
import marquelogo from "../../assets/images/marque-logo.png";
import { Link } from "react-router-dom";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const topBlogs = blogs.slice(0, 8);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      const publishedBlogs = (res.data.blogs || []).filter(
        (b) => b.status === "Published",
      );
      setBlogs(publishedBlogs);
    } catch (err) {
      console.error("Blog fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">Loading blogs...</div>
    );
  }

  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brandNavy mb-3">
            Latest From Our Blog
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            Insights, trends, and stories shaping the future of education and
            technology.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBlogs.map((blog) => (
            <article
              key={blog._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all border border-slate-100 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-44 m-2 rounded-xl overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md text-[10px] font-extrabold text-brandRed uppercase">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="px-5 py-4 flex flex-col flex-1">
                {/* META */}
                <div className="flex gap-3 text-[10px] font-semibold text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <i className="fa-regular fa-calendar text-brandRed"></i>
                    {blog.publishDate
                      ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-regular fa-comment text-brandRed"></i>0
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-base font-bold text-brandNavy leading-snug mb-2 line-clamp-2 group-hover:text-brandRed transition-colors">
                  {blog.title}
                </h3>

                {/* DESC */}
                <p className="text-xs text-slate-500 line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>

                {/* AUTHOR */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <img
                      src={marquelogo}
                      alt="Author"
                      className="w-9 h-9 rounded-full bg-blue-950 p-1 shadow object-contain"
                    />
                    <div>
                      <p className="text-xs font-bold text-brandNavy">
                        Marque
                      </p>
                      <p className="text-[10px] text-slate-400">Content Team</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-[11px] font-bold text-brandRed flex items-center gap-1 hover:underline"
                  >
                    Read
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* SHOW MORE BUTTON */}
      <div className="flex justify-center mt-12">
            <Link
              to="/blog"
              className="px-10 py-3 rounded-full bg-brandNavy text-white font-bold hover:bg-black transition"
            >
              More Blog →
            </Link>
          </div>
    </section>
  );
};

export default BlogCard;
