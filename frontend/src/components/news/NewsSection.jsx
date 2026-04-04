import { useEffect, useState } from "react";
import api from "../../Services/api"; // Ensure this path is correct
import NewsCard from "./NewsCard";
import NewsFilters from "./NewsFilters";

// ... baaki imports same rahenge

const NewsSection = () => {
  const [category, setCategory] = useState("Exam Alerts");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveNews = async () => {
  try {
    setLoading(true);
    const res = await api.get("/notifications"); 
    const allNews = res.data.data || res.data;
    
    // Sirf "Published" filter karein, slice yahan mat karein
    const publishedNews = Array.isArray(allNews) 
      ? allNews.filter(item => item.status === "Published")
      : [];
    
    setNews(publishedNews); // Saari published news state mein chali gayi
  } catch (err) {
    console.error("Homepage fetch failed:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLiveNews();
  }, []);

  // Filter based on active category from the top 12
  const filteredNews = news
  .filter(item => item.category === category)
  .slice(0, 12);

  return (
    <section className="bg-slate-50 py-16 font-['Plus_Jakarta_Sans',_sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-[#0B1C33] tracking-tight">
              Latest News & Alerts
            </h2>
            <p className="text-slate-500 mt-2 text-sm">Showing top 12 latest updates</p>
          </div>
          
          {/* Optional: Agar 12 se zyada hain toh "See All" button dikha sakte hain */}
          {/* <button className="text-[#DC2626] font-bold text-sm hover:underline">
            View All Notifications
          </button> */}
        </div>

        <NewsFilters activeCategory={category} onChange={setCategory} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredNews.map(item => (
              <NewsCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;