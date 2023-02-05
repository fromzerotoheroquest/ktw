let demo = new Game(undefined, undefined, 10, 10, 5)


// Interface

let deleteScore = document.getElementById('delete-history')

deleteScore.addEventListener('click', function(){

  demo.deleteHistory()
  console.log(demo.scores)
})

