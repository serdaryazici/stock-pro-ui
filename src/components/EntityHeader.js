import React from "react"

const EntityHeader = ({
  avatar,
  icon = "fa-user-circle",
  title,
  subtitle,
  badges = [],
  metadata = [],
  actions = [],
}) => {
  const getBadgeColor = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      amber: "bg-amber-100 text-amber-800",
      green: "bg-green-700 text-white",
      red: "bg-red-700 text-white",
      gray: "bg-gray-700 text-white",
      orange: "bg-orange-100 text-orange-800",
      teal: "bg-teal-100 text-teal-800",
      pink: "bg-pink-100 text-pink-800",
    }
    return colorMap[color] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="bg-white rounded-xl p-8 mb-6 shadow-md border border-gray-200 flex items-center gap-8">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400 flex-shrink-0 overflow-hidden">
        {avatar ? (
          <img src={avatar || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <i className={icon}></i>
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        <div className="flex items-center gap-4 mb-2 flex-wrap">
          {subtitle && <span className="font-semibold text-gray-600">{subtitle}</span>}
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getBadgeColor(badge.color)}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
        {metadata.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap">
            {metadata.map((item, index) => (
              <p key={index} className="text-sm text-gray-600">
                {item.label && <span className="font-medium">{item.label}: </span>}
                {item.value}
              </p>
            ))}
          </div>
        )}
      </div>

      {actions.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                action.variant === "primary"
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : action.variant === "secondary"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {action.icon && <i className={action.icon}></i>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default EntityHeader
