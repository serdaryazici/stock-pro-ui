import React from "react";

const TypeCard = ({
  icon,
  title,
  description,
  selected = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <div
      role="button"
      aria-pressed={selected}
      onClick={!disabled ? onClick : undefined}
      className={`
        p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300
        bg-slate-50 hover:-translate-y-0.5 hover:shadow-md
        ${selected ? "border-amber-500 bg-amber-50/70" : "border-slate-200"}
        ${disabled ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none" : "hover:border-amber-500"}
        ${className}
      `}
    >
      <i className={`${icon} text-4xl text-amber-500 mb-3 block`} />
      <h4 className="text-base font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
};

export default TypeCard;
