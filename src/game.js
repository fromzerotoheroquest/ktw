
const Game = function (waspSpeed = 8, beeSpeed = 1, waspQty = 5, beeQty = 3, time = 30) {
    let self = this
    this.time = time
    this.waspSpeed = waspSpeed
    this.beeSpeed = beeSpeed
    this.waspQty = waspQty
    this.beeQty = beeQty
    this.waspHive = []
    this.beeHive = []
    this.beeDownCount = 0
    this.waspDownCount = 0
    this.scores = []
    this.savedGame = localStorage.getItem('myScore')
    this.playerName
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
    this.timer = function () {
        let gameTime = this.time
        let timerId1 = setInterval(function () {
            if (gameTime < 0) {
                clearInterval(timerId1)
                let playground = document.getElementById("playground")
                let final = document.getElementById("final")
                // let controlPanel = document.getElementById("control-panel")
                // controlPanel.style.display = "none"
                playground.style.display = "none"
                final.style.display = "block"
                self.saveLastFiveGameScore()
                self.showCurrentScore()
                self.showHistory()

            } else {
                console.log(gameTime)
                document.getElementById("seconds").innerText = gameTime
                gameTime--
            }
        }, 1000)
    }

    this.saveLastFiveGameScore = function () {
        // this.playerName =  document.getElementById('result-player-name')
        let player = {
            name: this.playerName,
            mark: this.waspDownCount
        }
        if (this.scores.length < 5) {
            this.scores.push(player)
            console.log('scores', this.scores)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        } else {
            this.scores.shift()
            this.scores.push(player)
            console.log('scores', this.scores)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        }
    }

    this.loadLastGameScore = function () {
        if (this.savedGame) {
            console.log('this is saved game', JSON.parse(this.savedGame))
            this.scores = JSON.parse(this.savedGame)
            // player.innerHTML = this.savedGame
        }
    }

    this.showHistory = function () {
        let marks = document.getElementById('marks')
        let list = document.querySelectorAll('#marks li')
        //delete the previous list
        list.forEach(el => el.remove())
        //order scores
        this.scores.sort((a, b) => b.mark - a.mark)
        //create new list with sorted scores
        this.scores.forEach(function (el, idx) {
            let li = document.createElement('li')
            li.setAttribute('class', 'mark')
            marks.append(li)
            li.innerText = `${el.name}: ${el.mark} points`
        })
    }

    this.deleteHistory = function () {
        localStorage.removeItem('myScore')
        let list = document.querySelectorAll('#marks li')
        list.forEach(el => el.remove())
    }

    this.showCurrentScore = function () {
        let currentScore = document.getElementById('current-score')
        currentScore.innerText = this.waspDownCount
    }

    this.savePlayerName = function () {
        this.playerName = document.getElementById('insert-player-name').value
        let resultPlayerName = document.getElementById('result-player-name')
        console.log(this.playerName)
        resultPlayerName.innerText = this.playerName
    }

    this.resetKilledAnimals = function () {
        this.waspDownCount = 0
        this.beeDownCount = 0
        this.beeHiveUpdate()
        this.waspHiveUpdate()

    }

    this.init = function () {
        this.createViewer()
        this.createWaspHive()
        this.createBeeHive()
        this.kill()
        this.beeHiveUpdate()
        this.waspHiveUpdate()
        this.savePlayerName()
        this.timer()
        this.loadLastGameScore()
    }
    //this.init()
}
