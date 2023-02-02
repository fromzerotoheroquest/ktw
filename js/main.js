const Game = function () {
    this.waspArmy = [12]
}
Game.prototype.createViewer = function () {

    let playground = document.getElementById("playground")
    let viewer = document.createElement("div");
    viewer.setAttribute('id', 'viewer')
    playground.append(viewer)
    document.addEventListener('mousemove', function (e) {
        let cursorX = e.clientX;
        let cursorY = e.clientY;
        let offSet = 23
        viewer.style.left = cursorX - offSet + 'px';
        viewer.style.top = cursorY - offSet + 'px';
    });
}

Game.prototype.randomNumber = function (number) {
    return Math.floor(Math.random() * (number + 1))
}

Game.prototype.start = function () {
    this.createViewer()
}

let demo = new Game()
demo.start()

console.log('test: ', demo)


