const Game = function (waspSpeed = 10, beeSpeed = 3, waspQty = 5, beeQty = 3, time = 30) {
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
    this.userLives = 3

    let timerId1

    this.createViewer = function () {
        let playground = document.getElementById("playground")
        //let layoutDimension = document.querySelector('.layout')
        let cursorOffsetX = (window.innerWidth - 900) / 2
        let viewer = document.createElement("div");
        viewer.setAttribute('id', 'viewer')
        playground.append(viewer)
        document.addEventListener('mousemove', function (e) {
            let cursorX = e.clientX;
            let cursorY = e.clientY;
            let offSet = 18
            viewer.style.left = cursorX - offSet - cursorOffsetX + 'px';
            viewer.style.top = cursorY - offSet + 'px';

        });
    }
    this.randomNumber = function (number) {
        return Math.floor(Math.random() * (number + 1))
    }
    this.createWaspHive = function () {
        while (this.waspHive.length < this.waspQty) {
            let tempWasp = new Wasp(undefined, this.randomNumber(this.waspSpeed) + 0.5)
            let valid = true;
            this.waspHive.forEach(function (element) {
                if ((Math.abs(tempWasp.coords.x - element.x) < 55) && (Math.abs(tempWasp.coords.y - element.y) < 55)) {
                    valid = false
                }
            })
            if (valid) this.waspHive.push(tempWasp)
        }
    }
    this.createBeeHive = function () {
        while (this.beeHive.length < this.beeQty) {
            let tempBee = new Bee(undefined, this.randomNumber(this.beeSpeed) + 0.5)
            let valid = true;
            this.beeHive.forEach(function (element) {
                if ((Math.abs(tempBee.coords.x - element.x) < 55) && (Math.abs(tempBee.coords.y - element.y) < 55)) {
                    valid = false
                }
            })
            if (valid) this.beeHive.push(tempBee)

        }
    }
    this.beeHiveUpdate = function () {
        let beeCounter = document.getElementById('killed-bees')
        beeCounter.innerText = this.beeDownCount

    }
    this.waspHiveUpdate = function () {
        let waspCounter = document.getElementById('killed-wasps')
        waspCounter.innerText = `${this.waspDownCount} / ${this.waspQty}`
           
    }
    this.kill = function () {
        let playground = document.getElementById('playground')
        let cursorOffsetX = (window.innerWidth - 900) / 2
        playground.addEventListener('click', function (e) {
            self.beeHive.forEach(function (bee, idx) {
                if ((bee.coords.x < (e.clientX - cursorOffsetX) && (e.clientX - cursorOffsetX) < bee.coords.x + 50) &&
                    (bee.coords.y < e.clientY && e.clientY < bee.coords.y + 50)) {
                    self.beeHive.splice(idx, 1)
                    self.beeDownCount++
                    self.beeHiveUpdate()
                    self.displayBeeLives()
                    if (self.beeDownCount === 3) {
                        // to update score
                        let currentScore = document.getElementById('current-score')
                        currentScore.innerText = self.waspDownCount 
                        self.gameOver()
                    }
                }
            })
            self.waspHive.forEach(function (wasp, idx) {
                if ((wasp.coords.x < (e.clientX - cursorOffsetX) && (e.clientX - cursorOffsetX) < wasp.coords.x + 50) &&
                    (wasp.coords.y < e.clientY && e.clientY < wasp.coords.y + 50)) {
                    self.waspHive.splice(idx, 1)
                    self.waspDownCount++
                    self.waspHiveUpdate()
                    if (self.waspDownCount === self.waspQty) {
                        self.gameOver()
                    }
                }
            })
        })
    }

    this.displayBeeLives = function() {
        this.lifeIcons = document.querySelector(".life")
        this.lifeIcons.remove()
    }

    this.recreateBeeLivesIcons = function(){
        let oldLives = document.querySelectorAll('.life')
        oldLives.forEach(life => life.remove())
        for(let i = 0; i < this.userLives; i++){
            let icons = document.createElement('div')
            icons.setAttribute('class', 'life')
            let beeLivesContainer = document.getElementById('bee-lives')
            beeLivesContainer.append(icons)
        }
    }

    this.timer = function () {
        let gameTime = this.time
        timerId1 = setInterval(function () {
            if (gameTime < 0) {
                clearInterval(timerId1)
                let playground = document.getElementById("playground")
                let final = document.getElementById("final")
                playground.style.display = "none"
                final.style.display = "block"
                self.gameOver()

            } else {
                document.getElementById("seconds").innerText = gameTime
                gameTime--
            }
        }, 1000)
    }

    this.saveLastFiveGameScore = function () {
        let player = {
            name: this.playerName,
            mark: this.waspDownCount,
            qty: this.waspQty
        }
        if (this.scores.length < 5) {
            this.scores.push(player)
            console.log('scores minor of 5', this.scores)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        } else {
            //console.log('before', this.scores)
            //console.log('after', this.scores)
            this.scores.pop()
            this.scores.push(player)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        }
    }

    this.loadLastGameScore = function () {
        if (this.savedGame) {
            console.log('this is saved game from loadlastgamescore', JSON.parse(this.savedGame))
            this.scores = JSON.parse(this.savedGame)
        }
    }

    this.createHistory = function () {
        let marks = document.getElementById('marks')
        let list = document.querySelectorAll('#marks li')
        //delete the previous list
        list.forEach(el => el.remove())
        //order scores
        this.scores.sort((a, b) => b.mark - a.mark)
        //create new list with sorted scores
        this.scores.forEach(function (el) {
            let li = document.createElement('li')
            li.setAttribute('class', 'mark')
            marks.append(li)
            li.innerText = `${el.name}: ${el.mark} wasps out of ${el.qty}`
        })

    }

    this.deleteHistory = function () {
        localStorage.removeItem('myScore')
        let list = document.querySelectorAll('#marks li')
        list.forEach(el => el.remove())
        this.scores = []
        this.savedGame = ''
    }

    this.showCurrentScore = function () {
        let currentScore = document.getElementById('current-score')
        currentScore.innerText = `${self.waspDownCount } out of ${self.waspQty} wasps`
    }

    this.savePlayerName = function () {
        this.playerName = document.getElementById('insert-player-name').value
        if (this.playerName === "") { this.playerName = "Player" }
        let resultPlayerName = document.getElementById('result-player-name')
        resultPlayerName.innerText = this.playerName
    }

    this.resetKilledAnimals = function () {
        this.waspDownCount = 0
        this.beeDownCount = 0
        this.beeHiveUpdate()
        this.waspHiveUpdate()

    }

    this.gameOver = function () {
        clearInterval(timerId1)
        let seconds = document.getElementById('seconds')
        seconds.innerText = ''
        let playground = document.getElementById('playground')
        let gameOver = document.getElementById('final')
        playground.style.display = 'none'
        gameOver.style.display = 'block'
        self.saveLastFiveGameScore()
        self.showCurrentScore()
        self.createHistory()
    }

    this.init = function () {
        this.recreateBeeLivesIcons()
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

}