import React, { useState } from "react";

const Tab = ({ tabs = [], children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex bg-slate-50 border-b-2 border-slate-200">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-5 py-5 bg-transparent border-none text-sm font-semibold text-slate-500 cursor-pointer transition-all duration-300 relative flex items-center justify-center gap-2 hover:bg-amber-50/50 hover:text-amber-500 ${
              activeTab === index
                ? "text-amber-500 bg-white after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-amber-500"
                : ""
            }`}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-8">
        {Array.isArray(children) ? children[activeTab] : children}
      </div>
    </div>
  );
};

export default Tab;
