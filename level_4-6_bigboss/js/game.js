function randNum(a, b) {
    return  Math.floor(a + (b-a) * Math.random());
}

function respawn() {
    timeout = false;
    dead = false;
}

function didScore() {
    twomout = false;
    scored = false;
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;
var player1Score = 0;
var dead = false;
var timeout = false;
var twomout = false;
var scored = false;

var player = new GameObj({x: canvas.width/2, width: 50, height: 50, color: "#ffff00", vy: 0, fx: 0.85});
player.y = canvas.height - player.width - 25

let numOf = 5;
var collectible = [];
var hazard = [];

for (let i = 0; i < numOf; i++) {
    collectible[i] = new GameObj ({x: randNum(0, canvas.width), y: randNum(-100, -50), width: 20, height: 20, color: "#ff0000", vy: randNum(5, 50)});
    hazard[i] = new GameObj ({x: randNum(0, canvas.width), y: randNum(-100, -50), width: 20, height: 20, color: "#ff0000", vy : randNum(5, 50)});

    collectible[i].fy = .9;
    hazard[i].fy = .9;
}

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    /*collectible[i].vx *= collectible[i].fx;
	collectible[i].vy *= collectible[i].fy;
	
	collectible[i].vy += collectible[i].gravity;*/

    player.color = "#ffff00";

    if(dead) {
        //console.log("True");
        player.color = "#ff0000";
        if (!timeout) {
            player.x = canvas.width/2;
            player.vx = 0;
            player1Score = 0;
            scored = false;
            timeout = true;
            clearTimeout();
            setTimeout(respawn, 500);
        }
    }

    if(scored) {
        //console.log("True");
        player.color = "#34eb52";
        if (!twomout) {
            console.log("Triggered");
            twomout = true;
            clearTimeout();
            setTimeout(didScore, 500);
        }
    }

    if (d && !dead) {
        player.vx += player.px * player.force;
    }

    if (a && !dead) {
        player.vx -= player.px * player.force;
    }

    player.vx *= player.fx;

    player.move();

    for (i in collectible) {
        collectible[i].vx *= collectible[i].fx;
	    collectible[i].vy *= collectible[i].fy;
	
	    collectible[i].vy += collectible[i].gravity;

        hazard[i].vx *= hazard[i].fx;
	    hazard[i].vy *= hazard[i].fy;
	
	    hazard[i].vy += hazard[i].gravity;

        collectible[i].move()
        hazard[i].move()
			
		if (collectible[i].y >= canvas.height + collectible[i].height || dead) { 
			collectible[i].y = randNum(-20, -300);
            collectible[i].x = randNum(0, canvas.width);
			collectible[i].vy = randNum(5, 15);
		}

        if (hazard[i].y >= canvas.height + hazard[i].height || dead) { 
			hazard[i].y = randNum(-20, -300);
            hazard[i].x = randNum(0, canvas.width);
			hazard[i].vy = randNum(5, 15);
		}

        if(player.testHitPoint(hazard[i].bottom())) {
            dead = true;
        }

        if(player.testHitPoint(collectible[i].bottom())) {
            player1Score++;
            console.log(player1Score);
            scored = true;
            collectible[i].y = randNum(-20, -300);
            collectible[i].x = randNum(0, canvas.width);
			collectible[i].vy = randNum(5, 15);
        }

        collectible[i].drawRect();
        hazard[i].drawCircle();
    }

    while(player.x < 0+player.width/2) {
        player.x++;
    }

    while(player.x > canvas.width-player.width/2) {
        player.x--;
    }

    context.font = "bold 30px Arial";
    context.fillStyle = "#000000";
    context.fillText("Score = " + player1Score, 60, 60);

    player.drawRect();
}