import React from 'react'

export default ({ setTempo, setTimeSignature, setVolume, tempo, volume }) => {
  const changeVolume = ({ target }) => {
    setVolume(+target.value)
  }

  const changeTempo = ({ target }) => {
    setTempo(+target.value)
  }

  const changeTimeSignature = ({ target }) => {
    setTimeSignature(target.value)
  }

  return (
    <div className="context">
      <div className="field">
        <div className="label">
          Slider Component
        </div>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} />
      </div>
      <div className="field">
        <div className="label">
          Tempo
        </div>
        <input type="number" min="40" max="200" step="1" value={tempo} onChange={changeTempo} />
      </div>
      <div className="field">
        <div className="label">
          Time Signature
        </div>
        <select onChange={changeTimeSignature}>
          <option value="3/4">3/4</option>
          <option value="4/4">4/4</option>
        </select>
      </div>
    </div>
  )
}
