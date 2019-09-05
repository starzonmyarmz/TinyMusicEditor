import React from 'react'
import classname from 'classname'

export default ({ onKeypress }) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', ]

  const offsets = {
    'C': 0,
    'C#': 2,
    'D': 3,
    'D#': 5,
    'E': 6,
    'F': 9,
    'F#': 11,
    'G': 12,
    'G#': 14,
    'A': 15,
    'A#': 17,
    'B': 18,
  }

  const keys = new Array(85).fill().map((_, index) => {
    const octave = (index / notes.length) | 0
    const note = notes[index % notes.length]
    const gridColumnStart = octave * 21 + offsets[note] + 1
    const className = classname({
      key: true,
      'key-black': note.length > 1,
      'key-white': note.length === 1
    })

    const onMouseDown = () => {
      onKeypress(note, octave)
    }

    const onMouseEnter = ({ buttons }) => {
      if ((buttons & 1) === 1) {
        onKeypress(note, octave)
      }
    }

    return <button key={index} type="button" className={className} style={{ gridColumnStart }} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}></button>
  })

  return (
    <div className="piano">
      <div className="scroll">
        <div className="keys">
          {keys}
        </div>
      </div>
    </div>
  )
}
