import React from "react";

const Textarea = ({
  label,
  placeholder,
  required = false,
  icon,
  value,
  onChange,
  name,
  rows = 5,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="font-medium text-sm text-slate-800 flex items-center gap-2">
          {icon && <i className={icon}></i>}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        className="px-3.5 py-3.5 border-2 border-slate-200 rounded-lg text-sm text-slate-800 bg-white resize-y min-h-[120px] focus:outline-none focus:border-amber-500"
      />
    </div>
  );
};

export default Textarea;
