import React from "react"

const NoteItem = ({ note }) => {
    return (
      <div className="p-6 border-b border-gray-200 last:border-b-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{note.date}</span>
          <span className="text-sm font-medium text-amber-600">{note.author}</span>
        </div>
        <div className="text-gray-800 leading-relaxed">{note.content}</div>
      </div>
    )
  }
  
  export default NoteItem
  