import React from "react";

const Checkbox = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  description,
  className = "",
}) => {
  return (
    <label
      className={`
        flex items-center gap-3 px-3 py-3 bg-white border-2 rounded-lg cursor-pointer select-none
        ${checked ? "border-amber-500 bg-amber-50/50" : "border-slate-200"}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-amber-500 hover:bg-amber-50/50"
        }
        ${className}
      `}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={!disabled ? onChange : undefined}
        disabled={disabled}
        className="w-[18px] h-[18px] mt-0.5 accent-amber-500 cursor-pointer"
      />

      <div className="flex flex-col">
        <span className="text-sm text-slate-800 font-medium leading-none">
          {label}
        </span>
        {description && (
          <span className="text-xs text-slate-500 mt-1">{description}</span>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
