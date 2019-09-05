import React from 'react'
import Context from './context.js'
import Piano from './piano.js'
import Settings from './settings.js'
import Timeline from './timeline.js'
import TinyMusic from 'tinymusic'
import BubbleView from './bubble.js'

const { useEffect, useMemo, useState } = React

let nextId = 1

const Bubble = () => ({
  bass: 0,
  id: nextId++,
  fade: 'none',
  mid: 0,
  smoothing: 0,
  staccato: 0,
  treble: 0,
  volume: 1,
  wave: 'sine',
})

export default ({ onChangeVolume }) => {
  const [recording, setRecording] = useState(false)
  const [tempo, setTempo] = useState(120)
  const [timeSignature, setTimeSignature] = useState('4/4')
  const [metronomeSound, setMetronomeSound] = useState('chipAccented')
  const [volume, setVolume] = useState(0.2)
  const [bubbles, setBubbles] = useState([Bubble()])
  const [selectedBubble, setSelectedBubble] = useState(bubbles[0])

  const addBubble = () => {
    setBubbles(bubbles.concat([Bubble()]))
  }

  const deleteBubble = (bubble) => {
    setBubbles(bubbles.filter(other => bubble !== other))
  }

  const updateSelected = (values) => {
    const newBubble = Object.assign({}, selectedBubble, values)
    setSelectedBubble(newBubble)
    setBubbles(bubbles.map(bubble => bubble === selectedBubble ? newBubble : bubble))
  }

  const metronome = useMemo(() => {
    const metronome = new TinyMusic.Sequence(new AudioContext(), tempo)
    metronome.staccato = 0.95
    return metronome
  }, [])

  const accentedMetronome = {
    '3/4': ['G5 q', 'D5 q', 'D5 q'],
    '4/4': ['G5 q', 'D5 q', 'D5 q', 'D5 q']
  }

  const unaccentedMetronome = {
    '3/4': ['D5 q', 'D5 q', 'D5 q'],
    '4/4': ['D5 q', 'D5 q', 'D5 q', 'D5 q']
  }

  useEffect(() => {
    let sound

    if (metronomeSound === 'chipAccented' || metronomeSound === 'mutedAccented') {
      sound = accentedMetronome
    }

    if (metronomeSound === 'chipUnaccented' || metronomeSound === 'mutedUnaccented') {
      sound = unaccentedMetronome
    }

    if (metronomeSound === 'chipAccented' || metronomeSound === 'chipUnaccented') {
      metronome.waveType = 'square'
    }

    if (metronomeSound === 'mutedAccented' || metronomeSound === 'mutedUnaccented') {
      metronome.waveType = 'sine'
    }

    if (metronomeSound !== 'none') {
      const notes = sound[timeSignature]
      metronome.notes = notes.map(note => new TinyMusic.Note(note))
    }
  }, [timeSignature, metronomeSound])

  useEffect(() => {
    metronome.tempo = tempo
  }, [tempo])

  useEffect(() => {
    if (metronomeSound === 'none') {
      metronome.gain.gain.value = 0
    } else {
      metronome.gain.gain.value = volume
    }
  }, [volume, metronomeSound])

  const toggleRecord = () => {
    setRecording(!recording)
    if (recording) {
      metronome.stop()
    } else {
      metronome.play()
    }
  }

  const onNote = (note) => {
    if (!recording) return
    console.log(note)
  }

  return <div className='wrapper context-open'>
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

        <button type="button" className={recording ? 'button button-record button-recording' : 'button button-record'} onClick={toggleRecord}>
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

        <Settings setTimeSignature={setTimeSignature} timeSignature={timeSignature} setVolume={setVolume} setTempo={setTempo} tempo={tempo} setMetronomeSound={setMetronomeSound} metronomeSound={metronomeSound} volume={volume} />

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

      <div className="bubbles">
        {bubbles.map((bubble) => {
          return <BubbleView key={bubble.id} selected={bubble === selectedBubble} onSelect={() => { setSelectedBubble(bubble) }} onDelete={() => { deleteBubble(bubble) }} />
        })}
      </div>

      <button type='button' className="button" onClick={addBubble}>
        <svg className="icon-add" width="48" height="48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M24 17v14m-7-7h14"/>
        </svg>
      </button>
    </div>

    <Context bubble={selectedBubble} update={updateSelected} />
    <Piano onNote={onNote} volume={volume}/>
  </div>
}
