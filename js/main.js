

function Game (){
    this.phase1 = document.getElementById("phase1")
    this.viewer = document.createElement("div");
    this.viewer.setAttribute('id', 'viewer')
    this.phase1.append(viewer)
}
Game()
function moveViewer() {
    console.log(viewer.style)
    
    document.addEventListener('mousemove', function (e) {
        let cursorX = e.clientX;
        let cursorY = e.clientY;
        console.log('x:', cursorX, 'y:', cursorY)
        viewer.style.left = cursorX + 'px';
        viewer.style.top = cursorY + 'px';
    });
}

moveViewer()

