import React from 'react'
import Context from './context.js'
import Piano from './piano.js'
import Timeline from './timeline.js'
import TinyMusic from 'tinymusic'

const { Fragment, useState } = React

export default ({ onChangeVolume }) => {
  const [tempo, setTempo] = useState(120)
  const [timeSignature, setTimeSignature] = useState('3')
  const [volume, setVolume] = useState(0.2)

  const onKeypress = (note, octave) => {
    const context = new AudioContext()
    const sequence = new TinyMusic.Sequence(context, tempo)
    sequence.push(new TinyMusic.Note(`${note}${octave} q`))
    sequence.loop = false
    sequence.gain.gain.value = volume
    sequence.play()
  }

  return <Fragment>
    <div className="header">
      <h1 className="wordmark">
        <span>TinyMusic</span> Editor
        <sup><a href="https://github.com/starzonmyarmz/TinyMusicEditor">Github</a></sup>
      </h1>

      <div className="actions-primary">
        <button type="button" className="button button-rewind">
          <svg className="icon-rewind" width="48" height="48" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M22 31l-9-7 9-7zM33 31l-9-7 9-7z"/>
          </svg>
        </button>

        <button type="button" className="button button-stopped" id="button-play-stop">
          <svg width="48" height="48">
            <path className="icon-play" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 15l14 9-14 9z"/>
            <rect className="icon-stop" width="14" height="14" x="17" y="17" stroke-width="2" rx="2"/>
          </svg>
        </button>

        <button type="button" className="button button-record">
          <svg width="48" height="48">
            <circle className="icon-record" cx="24" cy="24" r="8" fill-rule="evenodd" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <div className="actions-secondary">
        <button type="button" className="button button-loop">
          <svg className="icon-loop" width="48" height="48" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M29 14l4 4-4 4"/>
            <path d="M15 23v-1a4 4 0 0 1 4-4h14M19 34l-4-4 4-4"/>
            <path d="M33 25v1a4 4 0 0 1-4 4H15"/>
          </svg>
        </button>

        <div className="popover-wrapper">
          <button type="button" className="button button-settings">
            <svg className="icon-settings" width="48" height="48" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M24 14c1 0 1.82.81 1.82 1.82v.08a1.5 1.5 0 0 0 2.56 1.07l.06-.05A1.82 1.82 0 1 1 31 19.49l-.06.06a1.5 1.5 0 0 0-.3 1.65v.07c.24.55.78.9 1.38.91h.15a1.82 1.82 0 1 1 0 3.64h-.08a1.5 1.5 0 0 0-1.07 2.56l.05.06A1.82 1.82 0 1 1 28.51 31l-.06-.06a1.5 1.5 0 0 0-1.65-.3c-.55.24-.9.78-.9 1.38v.15a1.82 1.82 0 1 1-3.65 0v-.08a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.65.3l-.06.05A1.82 1.82 0 1 1 17 28.51l.06-.06c.42-.43.54-1.09.3-1.65a1.5 1.5 0 0 0-1.38-.9h-.15a1.82 1.82 0 1 1 0-3.65h.08a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.65l-.05-.06A1.82 1.82 0 1 1 19.49 17l.06.06c.43.42 1.09.54 1.65.3h.07c.55-.24.9-.78.91-1.38v-.15c0-1 .82-1.82 1.82-1.82zm0 7.27a2.73 2.73 0 1 0 0 5.46 2.73 2.73 0 0 0 0-5.46z"/>
            </svg>
          </button>

          <div className="popover popover-hidden">
            <h3>Settings</h3>
            ...
          </div>
        </div>

        <button type="button" className="button button-save">
          <svg className="icon-save" width="48" height="48" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M31 33H17a2 2 0 0 1-2-2V17c0-1.1.9-2 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <path className="icon-save-details" d="M29 33v-8H19v8M19 15v5h8"/>
          </svg>
        </button>
      </div>
    </div>

    <div className="main">
      <Timeline timeSignature={timeSignature} />

      <div className="sequences">
        <div className="sequence-wrapper">
          <div className="sequence sequence-selected sequence-left-resize"></div>
          <button type="buton" className="sequence-delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l-8 8m0-8l8 8"/></svg></button>
        </div>

        <button id="show">Show context</button>
      </div>
    </div>

    <Context setTimeSignature={setTimeSignature} setVolume={setVolume} setTempo={setTempo} tempo={tempo} volume={volume} />
    <Piano onKeypress={onKeypress} />
  </Fragment>
}
