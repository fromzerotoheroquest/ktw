
const Animal = function (type, speed) {
    this.type = type
    this.directionX = 1
    this.directionY = 1
    this.speed = speed
    this.coords = {}
    this.timerId = setInterval(() => { this.move() }, 50)
    this.animalDimension = 50 // 50x50px
    this.playground_HTML = document.getElementById('playground')
    this.animal = null

    this.create = function () {
        this.coords.x = randomNumber(window.innerWidth - this.animalDimension);
        this.coords.y = randomNumber(window.innerHeight - this.animalDimension);
        this.animal = document.createElement("div");
        this.animal.setAttribute('class', type)
        playground.append(this.animal)
        this.animal.style.top = this.coords.y + "px"
        this.animal.style.left = this.coords.x + "px"
    }
    
    this.die = function () {
        let allAnimals = document.querySelectorAll(`.${this.type}`)
        allAnimals.forEach(animal => animal.addEventListener('click', function (e) {
            animal.remove()
            lastBreath(this, sfxStatus)
        }))
    }
    
    this.move = function () {
        if (this.coords.x <= 0 || this.coords.x >= window.innerWidth - this.animalDimension) {
            this.directionX *= -1
        }
        this.coords.x += this.speed * this.directionX
        this.animal.style.left = this.coords.x + 'px'

        if (this.coords.y <= 0 || this.coords.y >= window.innerHeight - this.animalDimension) {
            this.directionY *= -1
        }
        this.coords.y += this.speed * this.directionY
        this.animal.style.top = this.coords.y + 'px'
    }
    this.live = function () {
        this.create()
        this.move()
        this.die()
    }
    this.live()
}


/*
class Animal {
    constructor (type, speed) {
        this.type = type
        this.directionX = 1
        this.directionY = 1
        this.speed = speed
        this.coords = {}
        this.timerId = setInterval(() => { this.move() }, 50)
        this.window_width
        this.animalDimension = 50 // 50x50px
        this.playground_HTML = document.getElementById('playground')
        this.animal
    }
   create () {
        this.coords.x = randomNumber(window.innerWidth - this.animalDimension);
        this.coords.y = randomNumber(window.innerHeight - this.animalDimension);
        this.animal = document.createElement("div");
        this.animal.setAttribute('class', type)
        playground.append(this.animal)
        this.animal.style.top = this.coords.y + "px"
        this.animal.style.left = this.coords.x + "px"
    }
    die () {
        let allAnimals = document.querySelectorAll(`.${this.type}`)
        allAnimals.forEach(animal => animal.addEventListener('click', function (e) {
            animal.remove()
            lastBreath(this, sfxStatus)
        }))
    }
    move () {
        if (this.coords.x <= 0 || this.coords.x >= window.innerWidth - this.animalDimension) {
            this.directionX *= -1
        }
        this.coords.x += this.speed * this.directionX
        this.animal.style.left = this.coords.x + 'px'

        if (this.coords.y <= 0 || this.coords.y >= window.innerHeight - this.animalDimension) {
            this.directionY *= -1
        }
        this.coords.y += this.speed * this.directionY
        this.animal.style.top = this.coords.y + 'px'
    }
    live () {
        this.create()
        this.move()
        this.die()
    }
}

// new Animal().live()*/