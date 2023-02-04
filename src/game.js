const Game = function (waspSpeed = 8, beeSpeed = 1, waspQty = 5, beeQty = 3, time = 10) {
    //this.animalSpeed = animalSpeed
    this.time = time
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
    
    this.timer = function(){  
        let gameTime = this.time   
        let timerId1 = setInterval(function(){
            if(gameTime < 0) {
                clearInterval(timerId1)
                let playground = document.getElementById("playground")
                let final = document.getElementById("final")
                playground.style.display = "none"
                final.style.display = "block"
            } else {
                console.log(gameTime)
                document.getElementById("seconds").innerText = gameTime
                gameTime--
            }
        }, 1000)
    }
    
    this.init = function () {
        this.createViewer()
        this.createWaspHive()
        this.createBeeHive()
        this.timer()
    }
    this.init()
}