import React from 'react'
import classname from 'classname'
import TinyMusic from 'tinymusic'

const { useMemo, useRef } = React

export default ({ onNote, volume }) => {
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

  const pianoSequence = useMemo(() => {
    const context = new AudioContext()
    const sequence = new TinyMusic.Sequence(context, 120)
    sequence.loop = false
    return sequence
  }, [])

  const noteRef = useRef(null)

  const keys = new Array(85).fill().map((_, index) => {
    const octave = (index / notes.length) | 0
    const note = notes[index % notes.length]
    const gridColumnStart = octave * 21 + offsets[note] + 1
    const className = classname({
      key: true,
      'key-black': note.length > 1,
      'key-white': note.length === 1
    })

    const startNote = (note, octave) => {
      pianoSequence.stop()
      pianoSequence.notes = [new TinyMusic.Note(`${note}${octave} q`)]
      pianoSequence.gain.gain.value = volume
      pianoSequence.play()

      if (noteRef.current !== null) {
        endNote()
      }

      noteRef.current = {
        note,
        octave,
        start: pianoSequence.ac.currentTime,
        end: null,
      }
    }

    const endNote = () => {
      if (noteRef.current === null) return
      noteRef.current.end = pianoSequence.ac.currentTime
      onNote(noteRef.current)
      noteRef.current = null
    }

    const onMouseDown = () => {
      startNote(note, octave)
    }

    const onMouseEnter = ({ buttons }) => {
      if ((buttons & 1) === 1) {
        startNote(note, octave)
      }
    }

    return (
      <button key={index} type="button" className={className} style={{ gridColumnStart }}
        onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}
        onMouseLeave={endNote} onMouseUp={endNote}>
      </button>
    )
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
