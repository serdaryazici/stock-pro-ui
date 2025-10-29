import React from "react";

const Toggle = ({
  label,
  checked = false,
  onChange,
  name,
  icon,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {label && (
        <span className="font-medium text-sm text-slate-800 flex items-center gap-2">
          {icon && <i className={icon}></i>}
          {label}
        </span>
      )}

      <label className="relative inline-block w-[52px] h-[28px] cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
          className="opacity-0 w-0 h-0 peer"
        />
        <span
          className="absolute top-0 left-0 right-0 bottom-0 bg-slate-300 transition-all duration-300 rounded-full
          before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white
          before:transition-all before:duration-300 before:rounded-full
          peer-checked:bg-green-500 peer-checked:before:translate-x-6"
        />
      </label>
    </div>
  );
};

export default Toggle;
