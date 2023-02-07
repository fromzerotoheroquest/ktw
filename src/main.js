
let demo = new Game(undefined, undefined, 3, 3, 300)

// Interface

//Buttons
let startBtn = document.getElementById('start-btn')
let replayBtn = document.getElementById('replay-btn')
let deleteScoreBtn = document.getElementById('delete-history')
let inputPlayer = document.getElementById('insert-player-name')

// Layouts
let beginningLayout = document.getElementById('start')
let playgroundLayout = document.getElementById('playground')
let finalLayout = document.getElementById('final')
let controlPanel = document.getElementById('control-panel')

deleteScoreBtn.addEventListener('click', function () {
  demo.deleteHistory()
})


startBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  demo.init()
  toFadeOut('start')
  playgroundLayout.style.display = 'block'
  finalLayout.style.display = 'block'
})

replayBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  toFadeIn('start')
  playgroundLayout.style.display = 'none'
  toFadeOut('final')
  demo.init()
})

inputPlayer.addEventListener('keydown', function (e) {
  console.log(e.key)
  if (e.key === "Enter") {
    soundOnClick(sfxStatus)
    demo.init()
    beginningLayout.style.display = 'none'
    playgroundLayout.style.display = 'block'
    finalLayout.style.display = 'none'
  }
})

// aux functions to fadeIn and fadeOut elements
function toFadeOut(id) {
  let element = document.getElementById(`${id}`)
  let opacity = 1

  let timer = setInterval(function () {
    if (opacity > 0) {
      opacity -= 0.1
      console.log('from fadeout', opacity)
      element.style.opacity = opacity
    } else {
      console.log('element off')
      clearInterval(timer)
      element.style.display = 'none'
      element.style.opacity = 1
    }
  }, 50)
  
}

function toFadeIn(id) {
  let element = document.getElementById(`${id}`)
  let opacity = 0

  let timer = setInterval(function () {
    if (opacity <= 1) {
      opacity += 0.1
      console.log('from fadeout', opacity)
      element.style.opacity = opacity
    } else {
      clearInterval(timer)
      element.style.display = 'block'
      element.style.opacity = 1
    }
  }, 50)
}


// brutal responsive 
function responsive () {
  let layouts = document.querySelectorAll('.layout')
  layouts.forEach(function (el){
    el.style.width = window.innerWidth + 'px'
    el.style.height = window.innerHeight + 'px'
  })
}

setInterval(() => {responsive ()},500)

// window.addEventListener('resize', responsive());