const Game = function (waspNumber) {
    this.waspNumber = waspNumber
    this.waspArmy = []
}
Game.prototype.createViewer = function () {

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
}

Game.prototype.randomNumber = function (number) {
    return Math.floor(Math.random() * (number + 1))
}

Game.prototype.createWasp = function (waspNumber) {
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
    
    console.log(this.waspArmy)
}

Game.prototype.waspDown = function () {
    let allWasps = document.querySelectorAll(".wasp")
    allWasps.forEach(el => el.addEventListener('click', function(e){
        console.log(e)
        e.target.remove()
    }))
}



Game.prototype.start = function () {

    this.createViewer()
    this.createWasp()
    this.waspDown()
}

let demo = new Game(5)
demo.start()

console.log('test: ', demo)




