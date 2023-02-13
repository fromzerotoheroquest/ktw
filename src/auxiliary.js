//auxiliary functions

//random number
function randomNumber (number) {
  return Math.floor(Math.random() * (number + 1))
}

// fadeOut
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

// fadeIn
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