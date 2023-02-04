const Sound = function (audioID) {
  this.element = document.getElementById(audioID)
  this.url = this.element.getAttribute('src')
  this.sound = new Audio(this.url)

  this.playEffect = function () {
    this.sound.play()
  }
  this.stopEffect = function () {
    this.sound.pause()
    this.sound.currentTime = 0;
  }

  this.playLoop = function () {
    this.sound.play()
    this.sound.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }
}

// Sound creation
let deadWasp = new Sound("deadWasp")
let deadBee = new Sound("deadBee")
let buzzing = new Sound("buzzing")
let music = new Sound("music")
let wizz = new Sound("wizz")

// Sound global variables
let sfxStatus = false
let natureSound = false

// SFx button toggle
let sfxBtn = document.getElementById('sfx-btn')

sfxBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  if (sfxStatus === false) {
    sfxStatus = true
    buzzing.playLoop()
    sfxBtn.innerText = 'sound effects ON'
  } else {
    sfxStatus = false
    sfxBtn.innerText = 'sound effects OFF'
    buzzing.stopEffect()
  }
})

// Music button toggle
let musicBtn = document.getElementById('music-btn')

musicBtn.addEventListener('click', function () {
  soundOnClick(sfxStatus)
  if (natureSound === false) {
    music.playEffect()
    natureSound = true
    musicBtn.innerText = 'musin ON'
  } else {
    music.stopEffect()
    natureSound = false
    musicBtn.innerText = 'music OFF'
  }
})

// Sound of animal when dying
function lastBreath(el) {
  if (sfxStatus) {
    if (el.getAttribute('class') === 'wasp') {
      deadWasp.stopEffect()
      deadBee.stopEffect()
      deadWasp.playEffect()
    } else {
      deadWasp.stopEffect()
      deadBee.stopEffect()
      deadBee.playEffect()
    }
  }
}

// Sound when clicking on buttons 

function soundOnClick(sfxStatus) {
  if (sfxStatus) {
    wizz.stopEffect()
    wizz.playEffect()
  }
}
