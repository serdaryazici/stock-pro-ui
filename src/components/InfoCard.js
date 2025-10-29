import React from "react";

const InfoCard = ({ title, icon, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-500 ${className}`}
    >
      <h3 className="text-lg mb-4 text-slate-800 flex items-center gap-2 font-semibold">
        {icon && <i className={icon}></i>}
        {title}
      </h3>

      <div className="text-sm text-slate-600 leading-7">{children}</div>
    </div>
  );
};

export default InfoCard;
