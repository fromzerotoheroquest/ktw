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
        let playground = document.getElementById('container')
        let playgroundWidth = playground.offsetWidth
        let cursorOffsetX = (window.innerWidth - playgroundWidth) / 2
        let allAnimals = document.querySelectorAll(`.${this.type}`)
        allAnimals.forEach(animal => animal.addEventListener('click', function (e) {
            //e.target.remove()
            //console.log('e client x', e.clientX)
            console.log('playground width',playgroundWidth)

            
            let posX = parseInt(animal.style.left.slice(0, -2))
            let posY = parseInt(animal.style.top.slice(0, -2))
            if ((posX < (e.clientX - cursorOffsetX ) && (e.clientX - cursorOffsetX ) < posX + 50) &&
                (posY < e.clientY && e.clientY < posY + 50)) {
                animal.remove()
                lastBreath(this, sfxStatus)
                console.log('posx', posX)
                
            }
            
        }))
    }
    
    this.move = function () {
        let playground = document.getElementById('playground')
        let playgroundWidth = playground.offsetWidth
        let playgroundHeight = playground.offsetHeight
        if (this.coords.x <= 0 || this.coords.x >= playgroundWidth - 50) {
            this.directionX *= -1
        }
        this.coords.x += this.speed * this.directionX
        this.animal.style.left = this.coords.x + 'px'

        if (this.coords.y <= 0 || this.coords.y >= playgroundHeight - 50) {
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