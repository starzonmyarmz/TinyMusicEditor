import React from 'react'
import TinyMusic from 'tinymusic'
import classname from 'classname'

export default () => {
  const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

  const offsets = {
    'A': 0,
    'A#': 2,
    'B': 3,
    'C': 6,
    'C#': 8,
    'D': 9,
    'D#': 11,
    'E': 12,
    'F': 15,
    'F#': 17,
    'G': 18,
    'G#': 20
  }

  const keys = new Array(88).fill().map((_, index) => {
    const octave = (index / notes.length) | 0
    const note = notes[index % notes.length]
    const gridColumnStart = octave * 21 + offsets[note] + 1
    const className = classname({
      key: true,
      'key-black': note.length > 1,
      'key-white': note.length === 1
    })

    const onClick = () => {
      const context = new AudioContext()
      const sequence = new TinyMusic.Sequence(context, 120)
      sequence.push(new TinyMusic.Note(`${note}${octave} q`))
      sequence.loop = false
      sequence.play()
    }

    return <button key={index} type="button" className={className} style={{ gridColumnStart }} onClick={onClick}></button>
  })

  return (
    <div className="scroll">
      <div className="keys">
        {keys}
      </div>
    </div>
  )
}
