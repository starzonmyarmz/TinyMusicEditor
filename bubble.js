import React from 'react'
import classname from 'classname'

const { useEffect, useState } = React

const map = (value, d1, d2, r1, r2) => ((value - d1) / (d2 - d1)) * (r2 - r1) + r1

export default ({ onDelete, onSelect, selected, ac, bubble, tempo, timeSignature }) => {
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

  const [t, setT] = useState(0)

  const MAGIC_NUMBER_OF_MEASURES = 4
  const bpm = tempo
  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
  const quarterNoteLength = 60 / bpm
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
