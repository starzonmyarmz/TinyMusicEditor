import React from 'react'

export default ({ setTempo, setVolume, tempo, volume }) => {
  const changeVolume = ({ target }) => {
    setVolume(+target.value)
  }

  const changeTempo = ({ target }) => {
    setTempo(+target.value)
  }

  return (
    <div class="context">
      <div class="field">
        <div class="label">
          Slider Component
        </div>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} />
      </div>
      <div class="field">
        <div class="label">
          Tempo
        </div>
        <input type="number" min="40" max="200" step="1" value={tempo} onChange={changeTempo} />
      </div>
    </div>
  )
}
