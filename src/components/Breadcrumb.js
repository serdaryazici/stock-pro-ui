import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            )}

            {isLast ? (
              <span className="font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-slate-600 hover:text-amber-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                {item.icon && <i className={`${item.icon} text-sm`}></i>}
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
