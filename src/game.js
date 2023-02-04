const Game = function (waspSpeed = 8, beeSpeed = 1, waspQty = 5, beeQty = 3) {
    let self = this
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

    this.init = function () {
        this.createViewer()
        this.createWaspHive()
        this.createBeeHive()
        this.kill()
        this.beeHiveUpdate()
        this.waspHiveUpdate()
    }
    this.init()
}

/*
let playground = document.getElementById("playground")
document.addEventListener('click', function (e) {
    demo.beeHiveStatus()
})*/