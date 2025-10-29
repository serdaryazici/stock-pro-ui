const StatsGrid = ({ icon, title, value, detail, bgColor, critical }) => {
  return (
    <div
      className={`bg-white rounded-xl p-5 shadow-md border border-slate-200 flex items-center gap-4 transition-all 
        hover:-translate-y-0.5 hover:shadow-lg ${critical ? "border-l-4 border-l-red-500" : ""}`}>
      <div
        className={`w-[55px] h-[55px] rounded-xl ${bgColor} flex items-center justify-center text-white text-[1.4rem] flex-shrink-0`}
      >
        <i className={icon}></i>
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-600 mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-[1.75rem] font-bold text-slate-800 mb-1 leading-tight">
          {value}
        </p>
        <span className="text-[0.8rem] font-normal text-slate-600 leading-tight">
          {detail}
        </span>
      </div>
    </div>
  );
};

export default StatsGrid;
