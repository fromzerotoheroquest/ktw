const Animal = function (type, speed) {
    this.type = type
    this.directionX = 1
    this.directionY = 1
    this.speed = speed
    this.coords = {}
    this.timerId = setInterval(() => { this.move() }, 50)

    this.randomNumber = function (number) {
        return Math.floor(Math.random() * (number + 1))
    }
    this.create = function () {
        this.coords.x = this.randomNumber(800);
        this.coords.y = this.randomNumber(500);
        this.animal = document.createElement("div");
        this.animal.setAttribute('class', type)
        playground.append(this.animal)
        this.animal.style.top = this.coords.y + "px"
        this.animal.style.left = this.coords.x + "px"
    }
    
    this.die = function () {
        let cursorOffsetX = (window.innerWidth - 900) / 2
        let allAnimals = document.querySelectorAll(`.${this.type}`)
        allAnimals.forEach(animal => animal.addEventListener('click', function (e) {
            e.target.remove()
        }))
    }
    
    this.move = function () {
        if (this.coords.x <= 0 || this.coords.x >= 850) {
            this.directionX *= -1
        }
        this.coords.x += this.speed * this.directionX
        this.animal.style.left = this.coords.x + 'px'

        if (this.coords.y <= 0 || this.coords.y >= 550) {
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