import React from 'react'
import classname from 'classname'

export default ({ onDelete, onSelect, selected }) => {
  const deleteButton = () => {
    if (selected) return null

    return (
      <button type="buton" className="bubble-delete" onClick={onDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l-8 8m0-8l8 8"/>
        </svg>
      </button>
    )
  }

  const className = classname({
    'bubble': true,
    'bubble-selected': selected,
    'bubble-left-trim': true
  })

  return (
    <div className="bubble-wrapper">
      <div className={className} onClick={onSelect}></div>
      {deleteButton()}
    </div>
  )
}
