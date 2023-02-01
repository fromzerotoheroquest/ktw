
let playground = document.getElementById("playground")
let viewer = document.createElement("div");
viewer.setAttribute('id', 'viewer')
playground.append(viewer)


function randomNumber(number) {
    return Math.floor(Math.random() * (number + 1))
}

function createWasp(number) {
    

    let coords = []

    /*     
    */
    while (coords.length < number) {

        let x = randomNumber(500);
        let y = randomNumber(700);

        let valid = true;

        coords.forEach(function (element) {
            if (Math.abs(x - element.x) < 55 && Math.abs(y - element.y) < 55) {
                valid = false
            }
        })
        if (valid) coords.push({ x: x, y: y })
        
        console.log(valid)
        //number++
    }

    console.log(coords)
    /*
    wasp.style.top = randomNumber(500) + 50 + "px"
    wasp.style.left = randomNumber(700) + 50 + "px"
    */
   for(let i = 0; i < number; i++){
       let wasp = document.createElement("div");
       wasp.setAttribute('class', 'wasp')
       playground.append(wasp)
       wasp.style.top = coords[i].y +  "px"
       wasp.style.left = coords[i].x + "px"
    }
    
}


createWasp(5)






let allWasps = document.querySelectorAll(".wasp")

function waspDown() {
    allWasps.forEach(el => el.addEventListener('click', function (e) {
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

