import { useState, useEffect } from "react";

const Table = ({
  data = [],
  columns = [],
  itemsPerPage = 10,
  onEdit,
  onDelete,
  onView,
  filters = [],
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let filtered = [...data];
    for (const key in filterValues) {
      const value = filterValues[key];
      const filter = filters.find((f) => f.key === key);
      if (filter?.filterFn && value)
        filtered = filtered.filter((i) => filter.filterFn(i, value));
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filterValues, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) =>
    page >= 1 && page <= totalPages && setCurrentPage(page);

  const handleFilterChange = (key, value) =>
    setFilterValues((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
      {filters.length > 0 && (
        <div className="px-5 py-6 bg-gradient-to-br from-white via-slate-50/50 to-slate-100 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 rounded-full shadow-lg"></div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                {filters[0]?.title || "Liste"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <div key={f.key} className="relative group">
                  <select
                    value={filterValues[f.key] || ""}
                    onChange={(e) => handleFilterChange(f.key, e.target.value)}
                    className="pl-5 pr-11 py-3 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-sm font-semibold text-slate-700 shadow-lg hover:border-amber-300 hover:shadow-xl focus:outline-none focus:border-amber-500 appearance-none cursor-pointer group-hover:bg-white"
                  >
                    <option value="">{f.label}</option>
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 text-xs pointer-events-none group-hover:text-amber-600 transition-colors"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-5 text-left text-xs font-extrabold text-white uppercase tracking-widest border-b-2 border-amber-500/30"
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-6 py-5 text-center text-xs font-extrabold text-white uppercase tracking-widest border-b-2 border-amber-500/30">
                  İşlemler
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (onEdit || onDelete || onView ? 1 : 0)
                  }
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <i className="fas fa-inbox text-amber-400 text-3xl"></i>
                    </div>
                    <p className="text-slate-600 font-semibold text-lg">
                      Kayıt bulunamadı
                    </p>
                    <p className="text-slate-400 text-sm">
                      Filtreleri temizleyerek tekrar deneyebilirsiniz
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, i) => (
                <tr
                  key={item.id || i}
                  className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-50/50 hover:via-orange-50/30 hover:to-yellow-50/50 hover:shadow-md hover:scale-[1.01] ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-3 text-sm text-slate-700 font-semibold"
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="relative group p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 
                                     hover:from-emerald-100 hover:to-teal-100 text-emerald-600 
                                     hover:text-emerald-700 transition-all duration-300 
                                     hover:shadow-lg hover:-translate-y-0.5 border border-emerald-100"
                          >
                            {/* Eye icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                                           hidden group-hover:block bg-emerald-600 text-white text-xs rounded-md px-2 py-0.5"
                            >
                              Görüntüle
                            </span>
                          </button>
                        )}

                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="relative group p-2 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 
                                     hover:from-blue-100 hover:to-cyan-100 text-blue-600 
                                     hover:text-blue-700 transition-all duration-300 
                                     hover:shadow-lg hover:-translate-y-0.5 border border-blue-100"
                          >
                            {/* Pencil icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487a2.1 2.1 0 013.01 2.931l-9.387 9.387-3.901.972.973-3.902 9.305-9.388z"
                              />
                            </svg>
                            <span
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                                           hidden group-hover:block bg-blue-600 text-white text-xs rounded-md px-2 py-0.5"
                            >
                              Düzenle
                            </span>
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="relative group p-2 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 
                                     hover:from-red-100 hover:to-rose-100 text-red-600 
                                     hover:text-red-700 transition-all duration-300 
                                     hover:shadow-lg hover:-translate-y-0.5 border border-red-100"
                          >
                            {/* Trash icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 7h12M9 7V4h6v3m-7 4v9m4-9v9m4-9v9M4 7h16l-1 13H5L4 7z"
                              />
                            </svg>
                            <span
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                                           hidden group-hover:block bg-red-600 text-white text-xs rounded-md px-2 py-0.5"
                            >
                              Sil
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-8 py-5 bg-gradient-to-br from-white via-slate-50/50 to-slate-100 border-t border-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700">
              {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredData.length)}
            </span>
            <span className="text-sm text-slate-500 font-medium">toplam</span>
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow-md">
              {filteredData.length}
            </span>
            <span className="text-sm text-slate-500 font-medium">kayıt</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-amber-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-300 shadow-sm"
            >
              <i className="fas fa-chevron-left text-slate-600 text-xs" />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`min-w-[32px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      p === currentPage
                        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md scale-105 border border-amber-400"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-amber-300 hover:shadow-md"
                    }`}
                  >
                    {p}
                  </button>
                ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-amber-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
            >
              <i className="fas fa-chevron-right text-slate-600 text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
