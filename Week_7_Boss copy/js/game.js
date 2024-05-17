canvas.addEventListener("click", press);
canvas.addEventListener("mouseover", track);

var startButton = new GameObj({height: 80, width: 240, x: canvas.width/2, y: canvas.height/2});

var mouse = {x: 0, y: 0};

function track(e) {
    var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
}

function press() {
    currentState = "play";
}

states["menu"] = function() {
    startButton.drawRect();
}
