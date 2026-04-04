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

  /* ================= FETCH DATA ================= */
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

      // 🔥 First load only
      const firstChunk = allData.slice(0, ITEMS_PER_LOAD);
      setVisibleInstitutes(firstChunk);

      setPage(1);
      setHasMore(allData.length > ITEMS_PER_LOAD);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD MORE ================= */
  const loadMore = () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const start = page * ITEMS_PER_LOAD;
    const end = start + ITEMS_PER_LOAD;

    const nextChunk = institutes.slice(start, end);

    if (nextChunk.length === 0) {
      setHasMore(false);
      return;
    }

    setVisibleInstitutes((prev) => [...prev, ...nextChunk]);
    setPage(nextPage);
  };

  /* ================= SCROLL LISTENER ================= */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, institutes]);

  /* ================= FILTER CHANGE ================= */
  useEffect(() => {
    fetchInstitutes();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <>
      {/* 🔥 HERO SEARCH */}
      <CollegeSearchHero
        institutes={institutes}
        onSearch={setVisibleInstitutes}
      />

      {/* MAIN CONTENT */}
      <div className="min-20px bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
          {/* FILTER SIDEBAR */}

          <aside className="w-full lg:w-[300px] shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* LIST */}
          <main className="flex-1 space-y-6">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#0B1C33]">
                All Institutes
                <span className="ml-2 text-sm font-medium text-[#0B1C33] bg-white px-3 py-1 rounded-full border border-slate-200">
                  {institutes.length} Found
                </span>
              </h1>
            </div>
            {visibleInstitutes.map((item) => (
              <InstituteCard key={item._id} data={item} />
            ))}

            {/* LOADING TEXT */}
            {loading && (
              <p className="text-center text-slate-400 text-sm">
                Loading colleges...
              </p>
            )}

            {/* NO RESULTS */}
            {!loading && visibleInstitutes.length === 0 && (
              <p className="text-center text-slate-400 font-medium py-20">
                No colleges found matching your filters.
              </p>
            )}

            {/* END MESSAGE */}
            {!hasMore && visibleInstitutes.length > 0 && (
              <p className="text-center text-slate-400 text-sm pt-6">
                You’ve reached the end of the list.
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default CollegeCardPage;
