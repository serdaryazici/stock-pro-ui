import React from "react";

const EditableTable = ({
  columns = [],
  data = [],
  onDataChange,
  onAddRow,
  onRemoveRow,
  addButtonText = "Satır Ekle",
  showAddButton = true,
  minRows = 1,
  className = "",
}) => {
  const handleCellChange = (rowIndex, columnKey, value) => {
    if (onDataChange) {
      onDataChange(rowIndex, columnKey, value);
    }
  };

  const renderCell = (row, column, rowIndex) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(row, rowIndex);
    }

    if (column.type === "readonly") {
      return (
        <span className="text-slate-800 font-medium">
          {column.format ? column.format(value) : value}
        </span>
      );
    }

    if (column.type === "select") {
      return (
        <select
          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 
                     focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 
                     transition-all duration-200 hover:border-slate-300"
          value={value || ""}
          onChange={(e) =>
            handleCellChange(rowIndex, column.key, e.target.value)
          }
          {...(column.inputProps || {})}
        >
          {column.placeholder && <option value="">{column.placeholder}</option>}
          {column.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={column.type || "text"}
        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 
                   focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 
                   transition-all duration-200 hover:border-slate-300"
        value={value || ""}
        onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
        placeholder={column.placeholder}
        {...(column.inputProps || {})}
      />
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200"
                  style={{ width: column.width }}
                >
                  {column.label}
                  {column.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </th>
              ))}
              {onRemoveRow && (
                <th className="px-4 py-3.5 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 w-20">
                  İşlem
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onRemoveRow ? 1 : 0)}
                  className="px-4 py-8 text-center text-slate-500 text-sm"
                >
                  <i className="fas fa-inbox text-3xl mb-2 text-slate-300"></i>
                  <p>Henüz veri eklenmedi</p>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-amber-50/30 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      {renderCell(row, column, rowIndex)}
                    </td>
                  ))}
                  {onRemoveRow && (
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveRow(rowIndex, row)}
                        disabled={data.length <= minRows}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-500 
                                 hover:bg-red-50 hover:text-red-700 transition-all duration-200 
                                 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        title="Satırı Sil"
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddButton && onAddRow && (
        <button
          type="button"
          onClick={onAddRow}
          className="
          w-full
          py-3
          border-2 border-dashed border-slate-300 
          rounded-md 
          bg-slate-50 
          text-slate-600 
          font-medium 
          flex items-center justify-center gap-2 
          transition-all duration-200 
          hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50/50
        "
        >
          <i className="fas fa-plus"></i>
          {addButtonText}
        </button>
      )}
    </div>
  );
};

export default EditableTable;
