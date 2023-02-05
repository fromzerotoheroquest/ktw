
const Game = function (waspSpeed = 8, beeSpeed = 1, waspQty = 5, beeQty = 3, tim = 10) {
    let self = this
    //this.time = time
    let timerId1
    this.waspSpeed = waspSpeed
    this.beeSpeed = beeSpeed
    this.waspQty = waspQty
    this.beeQty = beeQty
    this.waspHive = []
    this.beeHive = []
    this.beeDownCount = 0
    this.waspDownCount = 0
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
    //console.log('this is wasp army:', this.waspHive)
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
    this.beeHiveUpdate = function () {
        console.log('Bees killed: ', this.beeDownCount)
        let beeCounter = document.getElementById('killed-bees')
        beeCounter.innerText = this.beeDownCount
    }
    this.waspHiveUpdate = function () {
        console.log('wasps killed: ', this.waspDownCount)
        let waspCounter = document.getElementById('killed-wasps')
        waspCounter.innerText = this.waspDownCount
    }
    this.kill = function () {
        let playground = document.getElementById('playground')

        playground.addEventListener('click', function (e) {
            self.beeHive.forEach(function (bee, idx) {
                if ((bee.coords.x < e.clientX && e.clientX < bee.coords.x + 50) &&
                    (bee.coords.y < e.clientY && e.clientY < bee.coords.y + 50)) {
                    console.log('bee dead')
                    self.beeHive.splice(idx, 1)
                    self.beeDownCount++
                    self.beeHiveUpdate()
                    // Aqui digo que cuando matemos 3 abejas nos mande a la pantalla de game over
                    if(self.beeDownCount === 3){
                        clearInterval(timerId1)
                        let playground = document.getElementById('playground')
                        let gameOver = document.getElementById('final')
                        playground.style.display = 'none'
                        gameOver.style.display = 'block'
                        let seconds = document.getElementById('seconds')
                        seconds.innerText = 10
                    }
                }
            })
            self.waspHive.forEach(function (wasp, idx) {
                if ((wasp.coords.x < e.clientX && e.clientX < wasp.coords.x + 50) &&
                    (wasp.coords.y < e.clientY && e.clientY < wasp.coords.y + 50)) {
                    console.log('wasp dead')
                    self.waspHive.splice(idx, 1)
                    self.waspDownCount++
                    self.waspHiveUpdate()
                }
            })
        })
    }
    /*this.timer = function(){  
        let gameTime = this.time   
        let timerId1 = setInterval(function(){
            if(gameTime < 0) {
                clearInterval(timerId1)
                let playground = document.getElementById("playground")
                let start = document.getElementById('start')
                let final = document.getElementById("final")
                playground.style.display = "none"
                start.style.display = 'none'
                final.style.display = "block"
            } else {
                console.log(gameTime)
                document.getElementById("seconds").innerText = gameTime
                gameTime--
            }
        }, 1000)
    }*/
    // Añadí la funcion timer dentro del start game para ponerla como condicion cuando le damos al boton Start y que hasi se inicie la cuenta atrás
    this.start = function() {
         function time(){  
            let gameTime = tim  
                timerId1 = setInterval(function(){
                if(gameTime < 0) {
                    clearInterval(timerId1)
                    let playground = document.getElementById("playground")
                    let start = document.getElementById('start')
                    let final = document.getElementById("final")
                    playground.style.display = "none"
                    start.style.display = 'none'
                    final.style.display = "block"
                } else {
                    console.log(gameTime)
                    document.getElementById("seconds").innerText = gameTime
                    gameTime--
                }
            }, 1000)
        }
        // Aquí le damos funcionalidad al start buttton
        let startScreen = document.getElementById('start')
        let startGame = document.getElementById("button-start")
        let playground = document.getElementById("playground")
        let timer = document.getElementById("timer")
        startGame.addEventListener('click', function(){
            startScreen.style.display = "none"
            playground.style.display = "block"
            timer.style.display = "block"
            time()
        })
    }
    // Aqui implemento la funcion para intentar otra vez la partida, aunque hay que reiniciar los valores obtenidos en la puntuacion y tiempo
    this.tryAgain = function() {
        let finalScreen = document.getElementById('final')
        let tryAgain = document.getElementById("try-again")
        let start = document.getElementById("start")
        let timer = document.getElementById("timer")
        tryAgain.addEventListener('click', function(){
            finalScreen.style.display = "none"
            timer.style.display = "none"
            start.style.display = "flex"
            // Aqui actualizo el contador de abejas y avispas
            self.beeDownCount = 0
            self.waspDownCount = 0
            let beeCounter = document.getElementById('killed-bees')
            beeCounter.innerText = self.beeDownCount
            let waspCounter = document.getElementById('killed-wasps')
            waspCounter.innerText = self.waspDownCount
        })
    }

    this.init = function () {
        this.createViewer()
        this.createWaspHive()
        this.createBeeHive()
        this.kill()
        this.beeHiveUpdate()
        this.waspHiveUpdate()
        this.start()
        this.tryAgain()
    }
    this.init()
}

/*
let playground = document.getElementById("playground")
document.addEventListener('click', function (e) {
    demo.beeHiveStatus()
})*/