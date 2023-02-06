
let demo = new Game(undefined, undefined, 3, 3, 5000)




// Interface

//Buttons
let startBtn = document.getElementById('start-btn')
let replayBtn = document.getElementById('replay-btn')
let deleteScoreBtn = document.getElementById('delete-history')

// Layouts
let beginningLayout = document.getElementById('start')
let playgroundLayout = document.getElementById('playground')
let finalLayout = document.getElementById('final')
let controlPanel = document.getElementById('control-panel')

deleteScoreBtn.addEventListener('click', function(){
  demo.deleteHistory()
})


startBtn.addEventListener('click', function(){
  soundOnClick(sfxStatus)
  demo.init()
  beginningLayout.style.display = 'none'
  //controlPanel.style.display = 'block'
  playgroundLayout.style.display = 'block'
  finalLayout.style.display = 'none'
})

replayBtn.addEventListener('click', function(){
  soundOnClick(sfxStatus)
  beginningLayout.style.display = 'block'

  playgroundLayout.style.display = 'none'
  finalLayout.style.display = 'none'
  demo.resetKilledAnimals()
})
