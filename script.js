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