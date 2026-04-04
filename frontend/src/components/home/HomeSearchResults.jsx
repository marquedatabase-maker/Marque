import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Services/api"; // adjust path
import InstituteCard from "../../components/user/InstituteCard"; // adjust path
import InstituteGridCard from "../../components/home/InstituteGridCard";
const HomeSearchResults = () => {
  const { search } = useLocation();
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(search);
  const query = params.get("query");
  const category = params.get("category");
  const city = params.get("city");
  const stream = params.get("stream");
  const courseGroup = params.get("courseGroup");
  const exam = params.get("exam");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams();

        if (query) queryParams.append("search", query);

        if (category && category !== "All Categories") {
          queryParams.append("stream", category);
        }
        if (stream) {
          queryParams.append("stream", stream);
        }

        // exam==
        if (exam) {
          queryParams.append("exam", exam);
        }
        if (city) queryParams.append("city", city);
        if (courseGroup) {
          queryParams.append("courseGroup", courseGroup);
        }

        const res = await api.get(`/institutes?${queryParams.toString()}`);

        setInstitutes(res.data.institutes);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-lg font-semibold">
          Loading institutes...
        </div>
      ) : institutes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 9.172a4 4 0 015.656 0M9 17h6M5 12a7 7 0 1114 0A7 7 0 015 12z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            No Institutes Found
          </h3>

          <p className="text-slate-500 mb-6 max-w-md">
            Try changing your search keyword or filters.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Go Back Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
          {institutes.map((item) => (
            <InstituteGridCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSearchResults;
