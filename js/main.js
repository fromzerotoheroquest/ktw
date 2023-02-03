const Game = function (waspSpeed = 8,beeSpeed = 1, waspQty = 5, beeQty = 3) {
    //this.animalSpeed = animalSpeed
    this.waspSpeed = waspSpeed
    this.beeSpeed = beeSpeed
    this.waspQty = waspQty
    this.beeQty = beeQty
    this.waspHive = []
    this.beeHive = []
    this.createViewer = function () {
        let playground = document.getElementById("playground")
        let viewer = document.createElement("div");
        viewer.setAttribute('id', 'viewer')
        playground.append(viewer)
        document.addEventListener('mousemove', function (e) {
            let cursorX = e.clientX;
            let cursorY = e.clientY;
            let offSet = 18
            viewer.style.left = cursorX - offSet + 'px';
            viewer.style.top = cursorY - offSet + 'px';
            //console.log(cursorX, cursorY)
        });
    }
    this.randomNumber = function (number) {
        return Math.floor(Math.random() * (number + 1))
    }
    console.log('this is wasp army:', this.waspHive)
    this.createWaspHive = function () {
        while (this.waspHive.length < this.waspQty) {
            let tempWasp = new Wasp(undefined, this.randomNumber(this.waspSpeed) + 0.5)
            let valid = true;
            //console.log(tempWasp.coords)
            this.waspHive.forEach(function (element) {
                if ((Math.abs(tempWasp.coords.x - element.x) < 55) && (Math.abs(tempWasp.coords.y - element.y) < 55)) {
                    valid = false
                }
            })
            if (valid) this.waspHive.push(tempWasp)
            //console.log(valid)
        }
    }
    this.createBeeHive = function () {
        while (this.beeHive.length < this.beeQty) {
            let tempBee = new Bee(undefined, this.randomNumber(this.beeSpeed) + 0.5)
            let valid = true;
            this.beeHive.forEach(function (element) {
            //console.log(tempBee.coords)
                if ((Math.abs(tempBee.coords.x - element.x) < 55) && (Math.abs(tempBee.coords.y - element.y) < 55)) {
                    valid = false
                }
            })
            if (valid) this.beeHive.push(tempBee)
            //console.log(valid)
        }
    }
    this.init = function () {
        this.createViewer()
        this.createWaspHive()
        this.createBeeHive()
    }
    this.init()
}

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
                console.log('dead')
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

function Wasp(type  = "wasp", speed) {
    Animal.call(this, type, speed)
}
Wasp.prototype = Object.create(Animal.prototype)
Wasp.prototype.constructor = Wasp


function Bee(type = "bee", speed) {
    Animal.call(this, type, speed)
}



Bee.prototype = Object.create(Animal.prototype)
Bee.prototype.constructor = Bee



let demo = new Game(undefined, 5)





