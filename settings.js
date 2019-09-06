import React from 'react'

const { useEffect, useRef, useState } = React

export default ({ setMetronomeSound, metronomeSound, setTempo, setTimeSignature, timeSignature, setVolume, tempo, volume }) => {
  const [hidden, setHidden] = useState(true)
  const popoverRef = useRef()

  const toggle = () => {
    setHidden(!hidden)
  }

  const changeVolume = ({ target }) => {
    setVolume(+target.value)
  }

  const changeTempo = ({ target }) => {
    setTempo(+target.value)
  }

  const changeTimeSignature = ({ target }) => {
    setTimeSignature(target.value)
  }

  const changeMetronome = ({ target }) => {
    setMetronomeSound(target.value)
  }

  useEffect(() => {
    const close = ({ target }) => {
      const { current } = popoverRef
      if (current && current.contains(target)) {
        return
      }
      setHidden(true)
    }

    document.addEventListener('click', close)

    return () => { document.removeEventListener(close) }
  }, [])

  return (
    <div ref={popoverRef} className="popover-wrapper">
      <button type="button" className={hidden ? "button button-settings" : 'button button-settings button-active' } onClick={toggle}>
        <svg className="icon-settings" width="48" height="48" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M24 14c1 0 1.82.81 1.82 1.82v.08a1.5 1.5 0 0 0 2.56 1.07l.06-.05A1.82 1.82 0 1 1 31 19.49l-.06.06a1.5 1.5 0 0 0-.3 1.65v.07c.24.55.78.9 1.38.91h.15a1.82 1.82 0 1 1 0 3.64h-.08a1.5 1.5 0 0 0-1.07 2.56l.05.06A1.82 1.82 0 1 1 28.51 31l-.06-.06a1.5 1.5 0 0 0-1.65-.3c-.55.24-.9.78-.9 1.38v.15a1.82 1.82 0 1 1-3.65 0v-.08a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.65.3l-.06.05A1.82 1.82 0 1 1 17 28.51l.06-.06c.42-.43.54-1.09.3-1.65a1.5 1.5 0 0 0-1.38-.9h-.15a1.82 1.82 0 1 1 0-3.65h.08a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.65l-.05-.06A1.82 1.82 0 1 1 19.49 17l.06.06c.43.42 1.09.54 1.65.3h.07c.55-.24.9-.78.91-1.38v-.15c0-1 .82-1.82 1.82-1.82zm0 7.27a2.73 2.73 0 1 0 0 5.46 2.73 2.73 0 0 0 0-5.46z"/>
        </svg>
      </button>

      <div className={hidden ? 'popover popover-hidden' : 'popover'}>
        <h3>Settings</h3>
        <div className="field-container">
          <div className="field">
            <div className="label">
              Master Volume
            </div>
            <input type="range" className="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} />
          </div>
        </div>

        <hr/>

        <div className="field-container">
          <div className="field">
            <div className="label">
              Metronome Sound
            </div>
            <select className="input select" onChange={changeMetronome} value={metronomeSound}>
              <option value="chipAccented">Chip — Accented</option>
              <option value="chipUnaccented">Chip — Unaccented</option>
              <option value="mutedAccented">Muted — Accented</option>
              <option value="mutedUnaccented">Muted — Unaccented</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="two-fields">
          <div className="field m0">
            <div className="label">
              Tempo
            </div>
            <input type="number" className="input" min="40" max="200" step="1" value={tempo} onChange={changeTempo} />
          </div>

          <div className="field m0">
            <div className="label">
              Time Signature
            </div>
            <select className="input select" onChange={changeTimeSignature} value={timeSignature}>
              <option value="3/4">3/4</option>
              <option value="4/4">4/4</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
