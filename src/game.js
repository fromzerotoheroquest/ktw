const Game = function (waspSpeed = 10, beeSpeed = 3, waspQty = 5, beeQty = 3, time = 30) {
    //options
    this.time = OPTIONS.time
    this.waspSpeed = OPTIONS.waspSpeed
    this.beeSpeed = OPTIONS.beeSpeed
    this.waspQty = OPTIONS.waspQty
    this.beeQty = OPTIONS.beeQty
    //others
    let self = this
    this.beeDownCount = 0
    this.waspDownCount = 0
    this.scores = []
    this.savedGame = localStorage.getItem('myScore')
    this.playerName
    this.userLives = 3
    //HTML
    this.container_HTML = document.getElementById('container')
    this.playground_HTML = document.getElementById('playground')
    this.beeCounter_HTML = document.getElementById('killed-bees')
    this.waspCounter_HTML = document.getElementById('killed-wasps')
    this.timerId

    this.createViewer = function () {
        let viewer = document.getElementById('viewer')
        let cursorOffsetX = (window.innerWidth - this.playground_HTML.offsetWidth) / 2
        document.addEventListener('mousemove', function (e) {
            let cursorX = e.clientX;
            let cursorY = e.clientY;
            let offSet = 18
            viewer.style.left = cursorX - offSet - cursorOffsetX + 'px';
            viewer.style.top = cursorY - offSet + 'px';
        });
    }

    this.createHives = function () {
        while (waspHive.colony.length < this.waspQty) {
            waspHive.addAnimal(new Wasp(undefined, randomNumber(this.waspSpeed) + 0.5))
        }
        while (beeHive.colony.length < this.waspQty) {
            beeHive.addAnimal(new Bee(undefined, randomNumber(this.beeSpeed) + 0.5))
        }
    }

    this.kill = function () {
        let cursorOffsetX = (window.innerWidth - this.container_HTML.offsetWidth) / 2
        this.playground_HTML.addEventListener('click', (e) => {
            beeHive.colony.forEach((bee, idx) => {
                if ((bee.coords.x < (e.clientX - cursorOffsetX) && (e.clientX - cursorOffsetX) < bee.coords.x + 50) &&
                    (bee.coords.y < e.clientY && e.clientY < bee.coords.y + 50)) {
                    beeHive.colony.splice(idx, 1)
                    beeHive.deathCount++
                    console.log(this)
                    this.beeCounter_HTML.innerText = beeHive.deathCount
                    this.lifeIcons = document.querySelector(".life")
                    this.lifeIcons.remove()
                    if (beeHive.deathCount === this.userLives || beeHive.deathCount === this.beeQty ) {
                        // to update score
                        console.log(beeHive.deathCount)
                        let currentScore = document.getElementById('current-score')
                        currentScore.innerText = waspHive.deathCount 
                        this.gameOver()
                    }
                }
            })
            waspHive.colony.forEach((wasp, idx) => {
                if ((wasp.coords.x < (e.clientX - cursorOffsetX) && (e.clientX - cursorOffsetX) < wasp.coords.x + 50) &&
                    (wasp.coords.y < e.clientY && e.clientY < wasp.coords.y + 50)) {
                    waspHive.colony.splice(idx, 1)
                    waspHive.deathCount++
                    this.waspCounter_HTML.innerText = `${waspHive.deathCount} / ${this.waspQty}`
                    if (waspHive.deathCount === this.waspQty) {
                        this.gameOver()
                    }
                }
            })
        })
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
        this.timerId = setInterval(() => {
            if (this.time < 0) {
                clearInterval(this.timerId)
                this.gameOver()
            } else {
                document.getElementById("seconds").innerText = this.time
                this.time--
            }
        }, 1000)
    }

    this.saveLastFiveGameScore = function () {
        let player = {
            name: this.playerName,
            mark: waspHive.deathCount,
            qty: this.waspQty
        }
        if (this.scores.length < 5) {
            this.scores.push(player)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        } else {
            this.scores.shift()
            this.scores.push(player)
            localStorage.setItem('myScore', JSON.stringify(this.scores))
        }
    }

    this.loadLastGameScore = function () {
        if (this.savedGame) {
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
        currentScore.innerText = `${waspHive.deathCount} out of ${this.waspQty} wasps`
    }

    this.savePlayerName = function () {
        this.playerName = document.getElementById('insert-player-name').value
        if (this.playerName === "") { this.playerName = "Player" }
        let resultPlayerName = document.getElementById('result-player-name')
        resultPlayerName.innerText = this.playerName
    }

    this.reset = function () {
        //game variables
        waspHive.deathCount = 0
        beeHive.deathCount = 0
        this.resetDom
        this.beeCounter_HTML = 0
        this.waspCounter_HTML = 0
        //HTML
        let beeColony = document.querySelectorAll('.bee')
        let waspColony = document.querySelectorAll('.wasp')
        beeColony.forEach(el => el.remove())
        waspColony.forEach(el => el.remove())
    }

    this.gameOver = function () {
        clearInterval(this.timerId)
        let seconds = document.getElementById('seconds')
        seconds.innerText = ''
        this.saveLastFiveGameScore()
        this.showCurrentScore()
        this.createHistory()
        this.reset()
        toFadeOut('playground')
    }

    this.init = function () {
        this.createHives()
        this.recreateBeeLivesIcons()
        this.createViewer()
        this.kill()
        this.savePlayerName()
        this.timer()
        this.loadLastGameScore()
    }
}
