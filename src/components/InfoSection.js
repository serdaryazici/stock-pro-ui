import React from "react"

const InfoSection = ({ title, items }) => {
    return (
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">{title}</h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
              <label className="font-medium text-gray-600 text-sm mr-2">{item.label}</label>
              <span className="font-medium text-gray-800 text-left">{item.value || "-"}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default InfoSection
  