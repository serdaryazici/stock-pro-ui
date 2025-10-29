const Select = ({
  label,
  options = [],
  required = false,
  icon,
  value,
  onChange,
  name,
  placeholder = "Seçin",
  className = "",
  children,
  disabled = false,
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

      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="px-3.5 py-3.5 border-2 border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-amber-500 cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
      >
        {/* Her durumda placeholder görünür */}
        <option value="">{placeholder}</option>

        {/* Eğer children varsa onları render et */}
        {children}

        {/* children yoksa options ile oluştur */}
        {!children &&
          options.length > 0 &&
          options.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
