import { useState } from "react";

const SearchableFilter = ({
  title,
  options = [],
  selected = [],
  onChange
}) => {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (value) => {
    selected.includes(value)
      ? onChange(selected.filter(v => v !== value))
      : onChange([...selected, value]);
  };

  return (
    <div className="space-y-3">
      {/* Title */}
      <h3 className="text-sm font-semibold text-blue-200">
        {title}
      </h3>

      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${title}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg
                   bg-white/90 text-gray-900
                   outline-none
                   focus:ring-2 focus:ring-indigo-500"
      />

      {/* Options */}
      <div className="max-h-52 overflow-y-auto
                      space-y-2 pr-1">

        {filteredOptions.map(opt => (
          <label
            key={opt}
            className="flex items-center gap-2
                       text-sm text-white cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="accent-indigo-600"
            />
            {opt}
          </label>
        ))}

        {filteredOptions.length === 0 && (
          <p className="text-xs text-blue-300">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchableFilter;
