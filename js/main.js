const Game = function (waspNumber) {
    this.waspArmy = [],
        this.createViewer = function () {

            let playground = document.getElementById("playground")
            let viewer = document.createElement("div");
            viewer.setAttribute('id', 'viewer')
            playground.append(viewer)
            document.addEventListener('mousemove', function (e) {
                let cursorX = e.clientX;
                let cursorY = e.clientY;
                let offSet = 22
                viewer.style.left = cursorX - offSet + 'px';
                viewer.style.top = cursorY - offSet + 'px';
            });
        },
        this.createWaspArmy = function () {
            while (this.waspArmy.length < this.waspNumber) {
                let x = this.randomNumber(700);
                let y = this.randomNumber(500);
                let valid = true;
                this.waspArmy.forEach(function (element) {
                    if (Math.abs(x - element.x) < 55 && Math.abs(y - element.y) < 55) {
                        valid = false
                    }
                })
                if (valid) this.waspArmy.push({ x: x, y: y })
                console.log(valid)
            }
            for (let i = 0; i < this.waspNumber; i++) {
                let wasp = document.createElement("div");
                wasp.setAttribute('class', 'wasp')
                playground.append(wasp)
                wasp.style.top = this.waspArmy[i].y + "px"
                wasp.style.left = this.waspArmy[i].x + "px"
            }
            console.log('this is wasp army:', this.waspArmy)
        }
}

const Wasp = function (waspNumber) {
        this.direction = 1,
        this.coords = {},
        this.waspNumber = waspNumber,
        this.timerId = setInterval(()=> {this.waspMove()}, 100)
        this.wasp
        this.randomNumber = function (number) {
            return Math.floor(Math.random() * (number + 1))
        },
        this.createWasp = function () {
            this.coords.x = this.randomNumber(700);
            this.coords.y = this.randomNumber(500);
            this.wasp = document.createElement("div");
            this.wasp.setAttribute('class', 'wasp')
            playground.append(this.wasp)
            this.wasp.style.top = this.coords.y + "px"
            this.wasp.style.left = this.coords.x + "px"

        },
        this.waspDown = function () {
            let allWasps = document.querySelectorAll(".wasp")
            allWasps.forEach(el => el.addEventListener('click', function (e) {
                console.log('this is e', e)
                e.target.remove()
            }))
        },
        this.waspMove = function () {
            //console.log(this.coords.x)
            //console.log(this.direction)
                if (this.wasp.style.left <= 0 + 'px') {
                    this.direction = 1
                    let move = 10 * this.direction
                    this.wasp.style.left = parseInt(this.wasp.style.left) + move + 'px'
                } else if (this.wasp.style.left >= 750 + 'px') {
                    //console.log('all wasps:', this.coords.x.style.left)
                    this.direction = -1
                    let move = 10 * this.direction
                    this.wasp.style.left = parseInt(this.wasp.style.left) + move + 'px'
                } else {
                    let move = 10 * this.direction
                    //console.log( this.wasp.style.left)
                    this.wasp.style.left = parseInt(this.wasp.style.left) + move + 'px'
                }
           
        }
}

let demo = new Game()
demo.createViewer()


let wasp1 = new Wasp(3)
wasp1.createWasp()
wasp1.waspMove()
wasp1.waspDown()

console.log('wasp1: ', wasp1)




/*
this.createWasp = function () {
            while (this.waspArmy.length < this.waspNumber) {
                let x = this.randomNumber(700);
                let y = this.randomNumber(500);
                let valid = true;
                this.waspArmy.forEach(function (element) {
                    if (Math.abs(x - element.x) < 55 && Math.abs(y - element.y) < 55) {
                        valid = false
                    }
                })
                if (valid) this.waspArmy.push({ x: x, y: y })
                console.log(valid)
            }
            for (let i = 0; i < this.waspNumber; i++) {
                let wasp = document.createElement("div");
                wasp.setAttribute('class', 'wasp')
                playground.append(wasp)
                wasp.style.top = this.waspArmy[i].y + "px"
                wasp.style.left = this.waspArmy[i].x + "px"
            }
            console.log('this is wasp army:', this.waspArmy)
        },
 */