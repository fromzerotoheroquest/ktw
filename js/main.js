const Game = function (maxWaspSpeed, waspQty) {
    this.waspSpeed = maxWaspSpeed,
        this.waspQty = waspQty,
        this.waspArmy = [],
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
        },
        this.randomNumber = function (number) {
            return Math.floor(Math.random() * (number + 1))
        },
        this.addWasp = function () {
            this.waspArmy.push(new Wasp(this.randomNumber(this.waspSpeed)))
        },
        console.log('this is wasp army:', this.waspArmy)
    this.createArmy = function () {
        while (this.waspArmy.length < this.waspQty) {
            let tempWasp = new Wasp(this.randomNumber(this.waspSpeed))
            let valid = true;
            console.log(tempWasp.coords)
            this.waspArmy.forEach(function (element) {
                if (Math.abs(tempWasp.coords.x - element.x) < 55 && Math.abs(tempWasp.coords.y - element.y) < 55) {
                    valid = false
                }
            })
            if (valid) this.waspArmy.push(tempWasp)
            console.log(valid)
        }
    },
        this.init = function () {
            this.createViewer()
            this.createArmy()
        },
        this.init()
}

const Wasp = function (speed) {
    this.directionX = 1,
        this.directionY = 1,
        this.speed = speed,
        this.coords = {},
        this.timerId = setInterval(() => { this.move() }, 50)

    this.randomNumber = function (number) {
        return Math.floor(Math.random() * (number + 1))
    },
        this.create = function () {
            this.coords.x = this.randomNumber(700);
            this.coords.y = this.randomNumber(500);
            this.wasp = document.createElement("div");
            this.wasp.setAttribute('class', 'wasp')
            playground.append(this.wasp)
            this.wasp.style.top = this.coords.y + "px"
            this.wasp.style.left = this.coords.x + "px"
        },
        this.die = function () {
            let allWasps = document.querySelectorAll(".wasp")
            allWasps.forEach(wasp => wasp.addEventListener('click', function (e) {
                //e.target.remove()
                console.log(e)
                let posX = parseInt(wasp.style.left.slice(0, -2))
                let posY = parseInt(wasp.style.top.slice(0, -2))
                console.log(posX)
                console.log(e.clientX)
                //Collision detection
                if (posX < e.clientX && e.clientX < posX + 50) {
                    if (posY < e.clientY && e.clientY < posY + 50) {
                        wasp.remove()
                        console.log('dead!')
                    }
                }
            }))
        },
        this.move = function () {
            if (this.coords.x <= 0 || this.coords.x >= 750) {
                this.directionX *= -1
            }
            this.coords.x += this.speed * this.directionX
            this.wasp.style.left = this.coords.x + 'px'

            if (this.coords.y <= 0 || this.coords.y >= 550) {
                this.directionY *= -1
            }
            this.coords.y += this.speed * this.directionY
            this.wasp.style.top = this.coords.y + 'px'
        },
        this.live = function () {
            this.create()
            this.move()
            this.die()
        },
        this.live()
}

let demo = new Game(5,5)



