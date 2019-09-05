import React from 'react'

export default ({ bubble, update }) => {
  const {
    bass,
    fade,
    mid,
    smoothing,
    staccato,
    treble,
    volume,
    wave
  } = bubble

  const changeVolume = ({ target }) => {
    update({ volume: +target.value })
  }

  const changeWave = ({ target }) => {
    update({ wave: target.value })
  }

  const changeFade = ({ target }) => {
    update({ fade: target.value })
  }

  const changeStaccato = ({ target }) => {
    update({ staccato: +target.value })
  }

  const changeSmoothing = ({ target }) => {
    update({ smoothing: +target.value })
  }

  const changeBass = ({ target }) => {
    update({ bass: +target.value })
  }

  const changeMid = ({ target }) => {
    update({ mid: +target.value })
  }

  const changeTreble = ({ target }) => {
    update({ treble: +target.value })
  }

  return (
    <div className="context">
      <h3>Sequence Properties</h3>
      <div className="field-container">
        <div className="field">
          <div className="label">
            Volume
          </div>
          <input type="range" className="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} />
        </div>
      </div>

      <h4>Effects</h4>
      <div className="field-container">
        <div className="field">
          <div className="label">
            Wave Type
          </div>
          <select className='input select' onChange={changeWave} value={wave}>
            <option value='sine'>Sine</option>
            <option value='square'>Square</option>
            <option value='sawtooth'>Sawtooth</option>
            <option value='triangle'>Triangle</option>
          </select>
        </div>
      </div>
      <div className="field-container">
        <div className="field">
          <div className="label">
            Fading
          </div>
          <select className='input select' onChange={changeFade} value={fade}>
            <option value='none'>None</option>
            <option value='fadein'>Fade In</option>
            <option value='fadeout'>Fade Out</option>
            <option value='pulse'>Pulse</option>
          </select>
        </div>
      </div>
      <div className="field-container">
        <div className="field">
          <div className="label">
            Staccato
          </div>
          <input type="range" className="range" min="0" max="1" step="0.05" value={staccato} onChange={changeStaccato} />
        </div>
      </div>
      <div className="field-container">
        <div className="field">
          <div className="label">
            Smoothing
          </div>
          <input type="range" className="range" min="0" max="1" step="0.05" value={smoothing} onChange={changeSmoothing} />
        </div>
      </div>

      <h4>Equalizer</h4>
      <div className="field-container">
        <div className="field">
          <div className="label">
            100 Hz
          </div>
          <input type="range" className="range" min="-10" max="10" step="1" value={bass} onChange={changeBass} />
        </div>
      </div>
      <div className="field-container">
        <div className="field">
          <div className="label">
            1000 Hz
          </div>
          <input type="range" className="range" min="-10" max="10" step="1" value={mid} onChange={changeMid} />
        </div>
      </div>
      <div className="field-container">
        <div className="field">
          <div className="label">
            2500 Hz
          </div>
          <input type="range" className="range" min="-10" max="10" step="1" value={treble} onChange={changeTreble} />
        </div>
      </div>
    </div>
  )
}
