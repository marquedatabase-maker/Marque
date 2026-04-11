import { useEffect, useState } from "react";
import api from "../Services/api";
import InstituteCard from "../components/user/InstituteCard";
import FilterSidebar from "../components/filter/FilterSidebar";
import CollegeSearchHero from "../components/filter/CollegeSearchHero";

const ITEMS_PER_LOAD = 6;

const CollegeCardPage = () => {
  const [institutes, setInstitutes] = useState([]);
  const [visibleInstitutes, setVisibleInstitutes] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    stream: [],
    courseGroup: [],
    state: [],
  });

  /* ================= FETCH ================= */
  const fetchInstitutes = async () => {
    try {
      setLoading(true);

      const res = await api.get("/institutes", {
        params: {
          stream: filters.stream.join(","),
          courseGroup: filters.courseGroup.join(","),
          state: filters.state.join(","),
        },
      });

      const allData = res.data.institutes || [];

      setInstitutes(allData);

      const firstChunk = allData.slice(0, ITEMS_PER_LOAD);
      setVisibleInstitutes(firstChunk);

      setPage(1);
      setHasMore(allData.length > ITEMS_PER_LOAD);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD MORE ================= */
  const loadMore = () => {
    if (!hasMore || loading) return;

    setLoading(true); // 🔥 prevent double trigger

    const nextPage = page + 1;
    const start = page * ITEMS_PER_LOAD;
    const end = start + ITEMS_PER_LOAD;

    const nextChunk = institutes.slice(start, end);

    if (nextChunk.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setVisibleInstitutes((prev) => {
      const newData = [...prev, ...nextChunk];

      // 🔥 REMOVE DUPLICATES
      const unique = Array.from(
        new Map(newData.map((item) => [item._id, item])).values()
      );

      return unique;
    });

    setPage(nextPage);
    setLoading(false);
  };

  /* ================= SCROLL ================= */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 150) {
          loadMore();
        }

        ticking = false;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore]);

  /* ================= FILTER ================= */
  useEffect(() => {
    fetchInstitutes();
  }, [filters]);

  return (
    <>
      <CollegeSearchHero
        institutes={institutes}
        onSearch={setVisibleInstitutes}
      />

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-[300px]">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          <main className="flex-1 space-y-6">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#0B1C33]">
                All Institutes
                <span className="ml-2 text-sm bg-white px-3 py-1 rounded border">
                  {institutes.length} Found
                </span>
              </h1>
            </div>

            {visibleInstitutes.map((item) => (
              <InstituteCard key={item._id} data={item} />
            ))}

            {loading && (
              <p className="text-center text-slate-400">
                Loading colleges...
              </p>
            )}

            {!hasMore && visibleInstitutes.length > 0 && (
              <p className="text-center text-slate-400">
                You’ve reached the end.
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default CollegeCardPage;