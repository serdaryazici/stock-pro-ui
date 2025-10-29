const SummaryCard = ({ icon, label, value, color = "blue", trend, trendValue }) => {
    const colorClasses = {
      blue: {
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        border: "border-blue-200",
        icon: "text-blue-600",
        value: "text-blue-700",
        trend: "text-blue-600",
      },
      green: {
        bg: "bg-gradient-to-br from-green-50 to-green-100",
        border: "border-green-200",
        icon: "text-green-600",
        value: "text-green-700",
        trend: "text-green-600",
      },
      amber: {
        bg: "bg-gradient-to-br from-amber-50 to-amber-100",
        border: "border-amber-200",
        icon: "text-amber-600",
        value: "text-amber-700",
        trend: "text-amber-600",
      },
      red: {
        bg: "bg-gradient-to-br from-red-50 to-red-100",
        border: "border-red-200",
        icon: "text-red-600",
        value: "text-red-700",
        trend: "text-red-600",
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-50 to-purple-100",
        border: "border-purple-200",
        icon: "text-purple-600",
        value: "text-purple-700",
        trend: "text-purple-600",
      },
      indigo: {
        bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
        border: "border-indigo-200",
        icon: "text-indigo-600",
        value: "text-indigo-700",
        trend: "text-indigo-600",
      },
    }
  
    const colors = colorClasses[color] || colorClasses.blue
  
    return (
      <div
        className={`${colors.bg} ${colors.border} border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`${colors.icon} text-2xl`}>
            <i className={icon}></i>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${colors.trend}`}>
              <i className={`fas fa-arrow-${trend === "up" ? "up" : "down"}`}></i>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
        </div>
      </div>
    )
  }
  
  export default SummaryCard
  