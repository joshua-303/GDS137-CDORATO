canvas.addEventListener("click", press);
canvas.addEventListener("mousemove", track);
function drawText(style, color, text, x, y) {
    context.font = style;
    context.fillStyle = color;
    context.fillText(text, x, y);
}

var startButton = new GameObj({height: 80, width: 240, x: canvas.width/4, y: canvas.height/1.3});
var helpButton = new GameObj({height: 80, width: 240, x: 750, y: canvas.height/1.3});
var backButton = new GameObj({height: 80, width: 240, x: canvas.width/2, y: canvas.height/1.3});

var mouse = {x: 0, y: 0};

function track(e) {
    var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
}

function press() {
	if(mouse.x > startButton.x - startButton.width/2 &&
    mouse.x < startButton.x + startButton.width/2 &&
    mouse.y > startButton.y - startButton.height/2 &&
    mouse.y < startButton.y + startButton.height/2) {
		currentState = "play";
	}

    if(mouse.x > helpButton.x - helpButton.width/2 &&
    mouse.x < helpButton.x + helpButton.width/2 &&
    mouse.y > helpButton.y - helpButton.height/2 &&
    mouse.y < helpButton.y + helpButton.height/2) {
        currentState = "help";
    }

    if(mouse.x > backButton.x - backButton.width/2 &&
    mouse.x < backButton.x + backButton.width/2 &&
    mouse.y > backButton.y - backButton.height/2 &&
    mouse.y < backButton.y + backButton.height/2) {
        currentState = "menu";
    }
}

states["menu"] = function() {
    startButton.color = "#ff0000";
    helpButton.color = "#ff0000";

    if(mouse.x > startButton.x - startButton.width/2 &&
    mouse.x < startButton.x + startButton.width/2 &&
    mouse.y > startButton.y - startButton.height/2 &&
    mouse.y < startButton.y + startButton.height/2) {
        startButton.color = "#fcba03";
    }

    if(mouse.x > helpButton.x - helpButton.width/2 &&
    mouse.x < helpButton.x + helpButton.width/2 &&
    mouse.y > helpButton.y - helpButton.height/2 &&
    mouse.y < helpButton.y + helpButton.height/2) {
        helpButton.color = "#fcba03";
    }

    drawText("30px Arial Black", "#000000", "UNTITLED PLATFORM PROTO", canvas.width/2-(canvas.width/4), canvas.height/2-(canvas.height/6));

    startButton.drawRect();
    helpButton.drawRect();

    drawText("30px Arial Black", "#000000", "Play", startButton.x-(startButton.width/6.5), startButton.y+(startButton.height/6.5));

    drawText("30px Arial Black", "#000000", "Help", helpButton.x-(helpButton.width/6.5), helpButton.y+(helpButton.height/6.5));

    //console.log(startButton.x)
}

states["help"] = function() {
    backButton.color = "#ff0000";

    if(mouse.x > backButton.x - backButton.width/2 &&
    mouse.x < backButton.x + backButton.width/2 &&
    mouse.y > backButton.y - backButton.height/2 &&
    mouse.y < backButton.y + backButton.height/2) {
        backButton.color = "#fcba03";
    }

    drawText("15px Arial Black", "#000000", 
    "AD keys to move. W key to jump. S key to fastfall in the air.",
    100, 100);
    drawText("15px Arial Black", "#000000", 
    "Double tap A or D on the ground to dash. Press W again in the air to double jump.",
    100, 100+30);
    drawText("15px Arial Black", "#000000", 
    "Jumping into a wall with momentum will initiate a wall cling.",
    100, 100+30*2);
    drawText("15px Arial Black", "#000000", 
    "Pressing A or D while in a wall cling will initiate a wall jump.",
    100, 100+30*3);
    drawText("15px Arial Black", "#000000", 
    "Your wall jump's speed will be determined by the speed you had when you clung to the wall.",
    100, 100+30*4);
    drawText("15px Arial Black", "#000000", 
    "Pressing space will initiate a dash attack.",
    100, 100+30*5);
    drawText("15px Arial Black", "#000000", 
    "A dash attack will give you a sudden burst of speed, but will reduce your momentum on either axis to 0",
    100, 100+30*6);
    drawText("15px Arial Black", "#000000", 
    "regardless of your previous speed upon completion.",
    100, 100+30*6+15);
    drawText("15px Arial Black", "#000000", 
    "If you begin flashing, that is because you have hit your max speed.",
    100, 100+30*7+15);
    drawText("15px Arial Black", "#000000", 
    "You can press S while in a wall cling to cancel the action.",
    100, 100+30*8+15);

    backButton.drawRect();

    drawText("30px Arial Black", "#000000", "Back", backButton.x-(backButton.width/6.5), backButton.y+(backButton.height/6.5));
}
