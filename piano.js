import React from 'react'
import classname from 'classname'
import TinyMusic from 'tinymusic'

const { useMemo, useRef, useEffect } = React

export default ({ onNote, volume, ac }) => {
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

  const sequence = useMemo(() => {
    const sequence = new TinyMusic.Sequence(ac, 120)
    sequence.loop = false
    return sequence
  }, [])

  const noteRef = useRef(null)

  const startNote = (note, octave) => {
    sequence.notes = [new TinyMusic.Note(`${note}${octave} 500`)]
    sequence.gain.gain.value = volume
    sequence.play()

    if (noteRef.current !== null) {
      endNote()
    }

    noteRef.current = {
      note,
      octave,
      start: sequence.ac.currentTime,
      end: null,
    }
  }

  const endNote = () => {
    if (noteRef.current === null) return
    sequence.stop()
    noteRef.current.end = sequence.ac.currentTime
    onNote(noteRef.current)
    noteRef.current = null
  }

  const keyboardKeys = {
    z: 'C', s: 'C#', x: 'D', d: 'D#', c: 'E',
    v: 'F', g: 'F#', b: 'G', h: 'G#', n: 'A', j: 'A#', m: 'B',
  }

  useEffect(() => {
    let pressedNote = null

    const keydown = event => {
      const note = keyboardKeys[event.key]
      if (note && pressedNote !== note) {
        startNote(note, 4)
        pressedNote = note
      }
    }

    const keyup = event => {
      const note = keyboardKeys[event.key]
      if (note && pressedNote === note) {
        endNote()
        pressedNote = null
      }
    }

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
    }
  }, [onNote])


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
