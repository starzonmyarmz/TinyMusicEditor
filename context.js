import React from 'react'

export default ({ setVolume, volume }) => {
  const changeVolume = ({ target }) => {
    setVolume(+target.value)
  }

  return (
    <div class="context">
      <div class="field">
        <div class="label">
          Slider Component
        </div>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} />
      </div>
    </div>
  )
}
