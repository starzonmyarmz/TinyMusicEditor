import React from 'react'
import classname from 'classname'
import TinyMusic from 'tinymusic'

const { useEffect, useState } = React

const map = (value, d1, d2, r1, r2) => ((value - d1) / (d2 - d1)) * (r2 - r1) + r1
const MAGIC_NUMBER_OF_MEASURES = 4

let nextId = 1

export const Bubble = (ac) => ({
  bass: 0,
  id: nextId++,
  fade: 'none',
  mid: 0,
  smoothing: 0,
  staccato: 0,
  treble: 0,
  volume: 0.3,
  wave: 'sine',
  notes: [],
  startTime: null,
  sequence: new TinyMusic.Sequence(ac),

  normalizeNotes(tempo, timeSignature) {
    let lastTime = this.startTime
    const notes = []

    const seconds2duration = (seconds) => {
      const quarterNotesPerSecond = tempo / 60
      const quarterNotes = seconds * quarterNotesPerSecond
      const duration = quarterNotes // in TM-land, q = 1
      return duration
    }

    for (const note of this.notes) {
      notes.push(`- ${seconds2duration(note.start - lastTime)}`)
      notes.push(`${note.note}${note.octave} ${seconds2duration(note.end - note.start)}`)
      lastTime = note.end
    }

    // Add a rest to fill out the end of the loop
    const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
    const quarterNoteLength = 60 / tempo
    const loopLength = MAGIC_NUMBER_OF_MEASURES * beatsPerMeasure * quarterNoteLength
    notes.push(`- ${seconds2duration(loopLength - lastTime)}`)

    return notes.map(note => new TinyMusic.Note(note))
  },

  play(tempo, timeSignature, when) {
    this.sequence.notes = this.normalizeNotes(tempo, timeSignature)
    this.sequence.gain.gain.value = this.volume
    this.sequence.loop = true
    this.sequence.play(when)
  },

  stop() {
    this.sequence.stop()
  }
})

export default ({ onDelete, onSelect, selected, ac, bubble, tempo, timeSignature }) => {
  const deleteButton = () => {
    if (selected) return null

    return (
      <button type="button" className="bubble-delete" onClick={onDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l-8 8m0-8l8 8"/>
        </svg>
      </button>
    )
  }

  const [t, setT] = useState(0)

  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
  const quarterNoteLength = 60 / tempo
  const loopLength = MAGIC_NUMBER_OF_MEASURES * beatsPerMeasure * quarterNoteLength

  useEffect(() => {
    let keepGoing = true

    requestAnimationFrame(function loop() {
      const seconds = ac.currentTime - bubble.startTime
      const distance = seconds % loopLength
      const rounded = distance - distance % quarterNoteLength

      setT(rounded)

      if (keepGoing) requestAnimationFrame(loop)
    })

    return () => { keepGoing = false }
  }, [ac, bubble])

  const className = classname({
    'bubble': true,
    'bubble-selected': selected,
    'bubble-left-trim': true
  })

  const vx = 0
  const vy = 0
  const vw = (timeSignature === '3/4' ? 3 : 4) * MAGIC_NUMBER_OF_MEASURES
  const vh = vw / 10

  return (
    <div className="bubble-wrapper">
      <div className={className} onClick={onSelect}>
        <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} width="100%">
          <rect x={map(t, 0, loopLength, 0, vw)} y={0} width={1} height={vh} fill="rgba(0, 0, 0, 0.1)"></rect>
        </svg>
      </div>
      {deleteButton()}
    </div>
  )
}
