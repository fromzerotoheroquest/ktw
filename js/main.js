
let playground = document.getElementById("playground")
let viewer = document.createElement("div");
viewer.setAttribute('id', 'viewer')
playground.append(viewer)


function randomNumber(number) {
    return Math.floor(Math.random() * (number + 1))
}

/* function separateWasps(bugNumber, dimension){
    let arr = []
    for(let i = 0; i < bugNumber; i++){
        if (randomNumber(dimension) / 50 === 0){
            arr.push(randomNumber(dimension))
        }

    }
    return arr.sort((a,b)=>a-b);
} */

console.log(randomNumber(5))

function createWasp(number) {
    let wasp = document.createElement("div");
    wasp.setAttribute('class', 'wasp')
    let waspSize = 50
    playground.append(wasp)

    let coords = [ {x: 200, y: 600}]

/*     while (coords.length < number) {
        let x = randomNumber(500);
        let y = randomNumber(700);
        
        let valid = true;
        
        coords.forEach(function(element) {
        })
        
        coords.push('demo')
        //number++
    }
    */
   
/*    for( let i = 0; i < coords.length; i++){
       
       let x = randomNumber(500);
       let y = randomNumber(700);
       coords.push('demo')
      // if (Math.abs(element.x - x) > 55 && Math.abs(element.y - y)>55){
       //    coords.push({x:x,y:y})
      // }
       
    }
 */

    wasp.style.top = randomNumber(500) + waspSize + "px"
    wasp.style.left = randomNumber(700) + waspSize + "px"
}


createWasp()




let allWasps = document.querySelectorAll(".wasp")
function waspDown() {
    allWasps.forEach(el => el.addEventListener('click', function(e) {
        console.log(e.target)
    }))
}
waspDown()



function moveViewer() {
    //console.log(viewer)
    document.addEventListener('mousemove', function (e) {
        let cursorX = e.clientX;
        let cursorY = e.clientY;
        //console.log('x:', cursorX, 'y:', cursorY)
        viewer.style.left = cursorX + 'px';
        viewer.style.top = cursorY + 'px';
    });
}

moveViewer()

