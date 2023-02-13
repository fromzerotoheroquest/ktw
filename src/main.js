const OPTIONS = {
  waspSpeed: 10,
  beeSpeed: 3,
  waspQty: 15,
  beeQty: 40,
  time: 30
}

let demo = new Game(OPTIONS)

//HTML elements 
const html_elems = {
  startLayout : document.getElementById('start'),
  playgroundLayout : document.getElementById('playground'),
  finalLayout : document.getElementById('final'),
  startBtn : document.getElementById('start-btn'),
  replayBtn : document.getElementById('replay-btn'),
  deleteScoreBtn : document.getElementById('delete-history'),
  inputPlayer : document.getElementById('insert-player-name')
}

html_elems.deleteScoreBtn.addEventListener('click', function () {
  demo.deleteHistory()
})

html_elems.startBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  demo.init()
  toFadeOut('start')
  html_elems.playgroundLayout.style.display = 'block'
  html_elems.finalLayout.style.display = 'block'
})

html_elems.replayBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  toFadeIn('start')
  html_elems.playgroundLayout.style.display = 'none'
  toFadeOut('final')
  /*
  let demo = new Game(OPTIONS)
  demo.init()
*/
  location.reload()
})

html_elems.inputPlayer.addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    soundOnClick(sfxStatus)
    demo.init()
    html_elems.startLayout.style.display = 'none'
    //controlPanel.style.display = 'block'
    html_elems.playgroundLayout.style.display = 'block'
    html_elems.finalLayout.style.display = 'none'
  }
})

