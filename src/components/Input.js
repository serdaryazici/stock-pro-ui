import React from 'react';

const Input = ({
  label,
  type = "text",
  placeholder,
  required = false,
  icon,
  value,
  onChange,
  name,
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

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="px-3.5 py-3.5 border-2 border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-amber-500"
      />
    </div>
  );
};

export default Input;
