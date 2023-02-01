let phase1 = document.getElementById("phase1")
let viewer = document.createElement("div");
viewer.setAttribute('id', 'viewer')
phase1.append(viewer)



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
