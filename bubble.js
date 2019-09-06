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
  normalizedNotes: [],
  startTime: null,
  sequence: new TinyMusic.Sequence(ac),

  normalizeNotes(notes, tempo, timeSignature) {
    const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
    const quarterNoteLength = 60 / tempo
    const loopLength = MAGIC_NUMBER_OF_MEASURES * beatsPerMeasure * quarterNoteLength
    const beats = new Array(MAGIC_NUMBER_OF_MEASURES * beatsPerMeasure).fill('- q')

    const seconds2duration = (seconds) => {
      const quarterNotesPerSecond = tempo / 60
      const quarterNotes = seconds * quarterNotesPerSecond
      const duration = quarterNotes // in TM-land, q = 1
      return duration
    }

    for (const note of notes) {
      let start = seconds2duration(note.start - this.startTime)
      start = Math.round(start) % beats.length

      let end = seconds2duration(note.end - this.startTime)
      end = Math.round(end) % beats.length

      for (let i = start; i <= end; i++) {
        beats[i] = `${note.note}${note.octave} q`
      }
    }

    return beats.map(note => new TinyMusic.Note(note))
  },

  play(when) {
    this.sequence.notes = this.normalizedNotes
    this.sequence.gain.gain.value = this.volume
    this.sequence.loop = true
    this.sequence.play()
  },

  stop() {
    this.sequence.stop()
  }
})

export default ({ onDelete, onSelect, selected, ac, bubble, tempo, timeSignature, t }) => {
  const deleteButton = () => {
    if (selected) return null

    return (
      <button type="button" className="bubble-delete" onClick={onDelete}>
        <svg width="24" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M16 8l-8 8m0-8l8 8"/>
        </svg>
      </button>
    )
  }

  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
  const quarterNoteLength = 60 / tempo
  const loopLength = MAGIC_NUMBER_OF_MEASURES * beatsPerMeasure * quarterNoteLength

  const className = classname({
    'bubble': true,
    'bubble-selected': selected,
    'bubble-left-trim': false
  })

  const vx = 0
  const vy = 0
  const vw = (timeSignature === '3/4' ? 3 : 4) * MAGIC_NUMBER_OF_MEASURES
  const vh = vw / 10

  const notes = []
  bubble.normalizedNotes.forEach((note, index) => {
    if (note.frequency === 0) return
    notes.push({ note, index })
  })

  return (
    <div className="bubble-wrapper">
      <div className={className} onClick={onSelect}>
        <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} width="100%">
          {t === null ? null : <rect x={map(t, 0, loopLength, 0, vw)} y={0} width={1} height={vh} fill="rgba(0, 0, 0, 0.1)"></rect>}
          {notes.map(({ note, index }) => {
            return <rect key={index} x={map(index * quarterNoteLength, 0, loopLength, 0, vw)} y={0} width={1} height={1} fill="black"></rect>
          })}
        </svg>
      </div>
      {deleteButton()}
    </div>
  )
}
