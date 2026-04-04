const NewsCard = ({ item }) => {
  return (
    <article className="w-full bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group text-left">
      <div>
        {/* Category Badge */}
        <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider mb-2 block">
          {item.category}
        </span>
        
        <h3 className="text-[17px] font-bold text-[#0B1C33] leading-snug mb-2 line-clamp-2 group-hover:text-[#DC2626] transition-colors">
          {item.title}
        </h3>

        {/* Updated: Using displayDate from your API */}
        <p className="text-[12px] text-slate-400 font-semibold mb-3">
          {new Date(item.displayDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>

        {/* Updated: Using shortSnippet from your API */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {item.shortSnippet}
        </p>
      </div>

      {/* Updated: Using targetUrl for direct link */}
      <a
        href={item.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-bold text-[#0B1C33] hover:text-[#DC2626] transition-colors pt-4 border-t border-gray-100 mt-auto"
      >
        Read more
        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
};

export default NewsCard;