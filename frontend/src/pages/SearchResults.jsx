import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/api";

const SearchResults = () => {
  const location = useLocation(); // 🔴 FIRST

  // 🔴 YAHI PAR
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const query = params.get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, [category, query]);

  const fetchResults = async () => {
    const res = await api.get("/search", {
      params: {
        category,
        q: query,
      },
    });
    setResults(res.data.results);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">
        Search Results
      </h1>

      <p className="text-slate-500 mb-6">
        {query && <>Results for "<b>{query}</b>"</>}
        {category && <> in <b>{category}</b></>}
      </p>

      {/* Render results */}
      {results.map((item) => (
        <div key={item._id} className="border-b py-4">
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
