import React from 'react'
import ReactDOM from 'react-dom'
import TinyMusic from 'tinymusic'
import Piano from './piano.js'

document.getElementById('show').addEventListener('click', () => {
  document.querySelector('.wrapper').classList.add('context-open')
})

document.getElementById('hide').addEventListener('click', () => {
  document.querySelector('.wrapper').classList.remove('context-open')
})

document.getElementById('button-play-stop').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('button-playing')
  event.currentTarget.classList.toggle('button-stopped')
})

document.querySelector('.button-record').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('button-recording')
})

document.querySelector('.button-loop').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('button-looping')
})

const play = (note, octave) => {
  const context = new AudioContext()
  const sequence = new TinyMusic.Sequence(context, 120)
  sequence.push(new TinyMusic.Note(`${note}${octave} q`))
  sequence.loop = false
  sequence.play()
}

ReactDOM.render(<Piano onKeypress={play} />, document.getElementById('piano'))
