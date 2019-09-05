import React from 'react'
import Context from './context.js'
import Piano from './piano.js'
import Settings from './settings.js'
import Timeline from './timeline.js'
import TinyMusic from 'tinymusic'

const { Fragment, useEffect, useMemo, useState } = React

export default ({ onChangeVolume }) => {
  const [recording, setRecording] = useState(false)
  const [tempo, setTempo] = useState(120)
  const [timeSignature, setTimeSignature] = useState('3/4')
  const [volume, setVolume] = useState(0.2)

  const metronome = useMemo(() => {
    const metronome = new TinyMusic.Sequence(new AudioContext(), tempo)
    metronome.staccato = 0.5
    return metronome
  }, [])

  useEffect(() => {
    const notes = timeSignature === '3/4' ? ['C5 q', 'C4 q', 'C4 q'] : ['C5 q', 'C4 q', 'C4 q', 'C4 q']
    metronome.notes = notes.map(note => new TinyMusic.Note(note))
  }, [timeSignature])

  useEffect(() => {
    metronome.tempo = tempo
  }, [tempo])

  useEffect(() => {
    metronome.gain.gain.value = volume
  }, [volume])

  const toggleRecord = () => {
    setRecording(!recording)
    if (recording) {
      metronome.stop()
    } else {
      metronome.play()
    }
  }

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
          <svg className="icon-rewind" width="48" height="48" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M22 31l-9-7 9-7zM33 31l-9-7 9-7z"/>
          </svg>
        </button>

        <button type="button" className="button button-stopped" id="button-play-stop">
          <svg width="48" height="48">
            <path className="icon-play" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 15l14 9-14 9z"/>
            <rect className="icon-stop" width="14" height="14" x="17" y="17" strokeWidth="2" rx="2"/>
          </svg>
        </button>

        <button type="button" className={recording ? 'button button-recording' : 'button button-record'} onClick={toggleRecord}>
          <svg width="48" height="48">
            <circle className="icon-record" cx="24" cy="24" r="8" fillRule="evenodd" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <div className="actions-secondary">
        <button type="button" className="button button-loop">
          <svg className="icon-loop" width="48" height="48" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M29 14l4 4-4 4"/>
            <path d="M15 23v-1a4 4 0 0 1 4-4h14M19 34l-4-4 4-4"/>
            <path d="M33 25v1a4 4 0 0 1-4 4H15"/>
          </svg>
        </button>

        <Settings setTimeSignature={setTimeSignature} setVolume={setVolume} setTempo={setTempo} tempo={tempo} volume={volume} />

        <button type="button" className="button button-save">
          <svg className="icon-save" width="48" height="48" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
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
          <button type="buton" className="sequence-delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l-8 8m0-8l8 8"/></svg></button>
        </div>

        <button id="show">Show context</button>
      </div>
    </div>

    <Context/>
    <Piano onKeypress={onKeypress} />
  </Fragment>
}
