const Sound = function (id) {
  this.element = document.getElementById(id)
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

let deadWasp = new Sound("deadWasp")
let deadBee = new Sound("deadBee")
let buzzing = new Sound("buzzing")
let music = new Sound("music")

let musicBtn = document.getElementById('music-btn')

// Music button toggle
let natureSound = false

musicBtn.addEventListener('click', function () {
  if (natureSound === false) {
    music.playEffect()
    buzzing.playLoop()

    natureSound = true
    musicBtn.innerText = 'music is on'
  } else {
    music.stopEffect()
    buzzing.stopEffect()
    natureSound = false
    musicBtn.innerText = 'music is off'
  }
  console.log('start button just pressed')
})

/*
setTimeout(() =>{
  musicBtn.click();
},1000)
*/