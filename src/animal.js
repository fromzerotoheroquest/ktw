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
        this.coords.x = this.randomNumber(700);
        this.coords.y = this.randomNumber(500);
        this.animal = document.createElement("div");
        this.animal.setAttribute('class', type)
        playground.append(this.animal)
        this.animal.style.top = this.coords.y + "px"
        this.animal.style.left = this.coords.x + "px"
    }
    this.die = function () {
        let allAnimals = document.querySelectorAll(`.${this.type}`)
        allAnimals.forEach(animal => animal.addEventListener('click', function (e) {
            //e.target.remove()
            let posX = parseInt(animal.style.left.slice(0, -2))
            let posY = parseInt(animal.style.top.slice(0, -2))
            if ((posX < e.clientX && e.clientX < posX + 50) &&
                (posY < e.clientY && e.clientY < posY + 50)) {
                animal.remove()
                lastBreath(this, sfxStatus)
            }
        }))
    }
    this.move = function () {
        if (this.coords.x <= 0 || this.coords.x >= 750) {
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