var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

function delayEnd() {
    dashAtk.trigger = false;
    dashAtk.keyReleased = false;
}

function dashEnd() {
    player.vx = 0;
    player.vy = 0;
    dKick = true;
}

var player = new GameObj({height:80, width:80, color:"#00ffff"});

//This is used to move the level elements
var level = new Level();
//This generates a tile based level.
	level.generate(level.l1, 120, 120);	

var jumpHeight = -20;
var canJump = false;
var walkButtonPressed = false;
var dashUsed = false;
var dashSpeed = 12;
var skid = false;
var keyHasReleased = false;
var triggerCoolDown = false;
var triggerTimer = false;
var dJump = false;
var dKick = false;
var wallHang = false;
var wallDir = "none";
var playerState = "falling";
var lastVX;
var lastVY;
var dashAtk = {aerial: false, trigger: false, keyReleased: false};
player.force = 0.22;

var keyReleaseTimer = 0;
var coolDownTimer = 0;

var states = []
var currentState = "menu"

var timer = setInterval(animate, interval);

states["play"] = function() {
    player.color = "#00ffff"

    console.log(playerState);

    canJump = false;

    if (skid) {
        player.color = "#ff0000";
    }
    if (keyHasReleased && player.vx >= 12 && lastKeyPressed != 87 && lastKeyPressed != 83 && playerState == "grounded"
        || keyHasReleased && player.vx <= -12 && lastKeyPressed != 87 && lastKeyPressed !=83 && playerState == "grounded"
        || d && player.vx <= -12 && playerState == "grounded"
        || a && player.vx >= 12 && playerState == "grounded") {
        skid = true;
    }
    if (player.vx < 5 && player.vx > -5) {
        skid = false;
    }

    if (keyHasReleased && lastKeyPressed == 65 && walkButtonPressed || keyHasReleased && lastKeyPressed == 68 && walkButtonPressed) {
        triggerTimer = true;
        walkButtonPressed = false;
    }

    if (triggerTimer) {
            keyReleaseTimer++;
            //console.log(keyReleaseTimer);
            if (keyReleaseTimer >= 8) {
                keyReleaseTimer = 0
                triggerTimer = false;
            }
    }

    if (dashUsed && keyHasReleased) {
        triggerCoolDown = true;
    }

    if (triggerCoolDown) {
        coolDownTimer++;
        if (coolDownTimer >= 30) {
            dashUsed = false;
            coolDownTimer = 0;
            triggerCoolDown = false;
        }
        //console.log(coolDownTimer);
    }

    if (!skid) {
        if(w && playerState == "grounded" && player.vy == 0) {
            playerState = "jumping";
            player.vy = jumpHeight;
        } else if (w && dJump && player.vy >= 0 && !wallHang) {
            if (d && player.vx < 0 || a && player.vx > 0) {
                player.vx= -player.vx*.7
            }
            dJump = false;
            player.vy = jumpHeight;
        }
        if (!dJump) {
            player.color = "#0100ff";
        }
        if (d && wallHang && wallDir == "right") {
            if (Math.abs(lastVX) > 8) {
                player.vx = -lastVX;
                } else {
                player.vx = 8;
                }
            player.vy = jumpHeight;
            player.fy = 1;
            wallHang = false;
            dKick = true;
        } else if (d && walkButtonPressed && keyReleaseTimer >= 1 && lastKeyPressed == newKey && playerState == "grounded" && !dashUsed) {
            player.vx += dashSpeed;
            walkButtonPressed = false;
            keyReleaseTimer = 0;
            dashUsed = true;
            //console.log("Dash!")
        } else if(d && playerState == "grounded") {
            player.vx += player.px * player.force;
            player.fx = 0;
            walkButtonPressed = true;
        }
        if (a && wallHang && wallDir == "left") {
            if (Math.abs(lastVX) > 8) {
            player.vx = -lastVX;
            } else {
            player.vx = -8;
            }
            player.vy = jumpHeight;
            player.fy = 1;
            wallHang = false;
            dKick = true;
        } else if (a && walkButtonPressed && keyReleaseTimer >= 1 && lastKeyPressed == newKey && playerState == "grounded" && !dashUsed) {
            player.vx += -dashSpeed;
            walkButtonPressed = false;
            keyReleaseTimer = 0;
            dashUsed = true;
            //console.log("Dash!")
        } else if(a && playerState == "grounded") {
            player.vx += player.px * -player.force;
            player.fx = 0;
            walkButtonPressed = true;
        }
        if (s && wallHang && dKick) {
            wallHang = false;
            dKick = false;
            player.fy = 1;
        } else if(s && !canJump && dKick && playerState != "grounded") {
            console.log("Yea");
            player.vy+=25;
            if (d && player.vx < 0 || a && player.vx > 0) {
                player.vx = -player.vx*.75;
            } else {
                player.vx*=0.85;
            }
            dKick = false;
        }
        if (space && !dashAtk.trigger && !wallHang) {
            if (dashAtk.aerial) {
                //console.log("true");
                if (player.vx <= 0 && !d || player.vx >= 0 && a) {
                    player.vx = -50;
                    player.vy = 0;
                } else if (player.vx >= 0 && !a || player.vx <= 0 && d) {
                    player.vx = 50;
                    player.vy = 0;
                }
            }
            if (playerState != "grounded") {
                dashAtk.aerial = false;
            }
            dashAtk.trigger = true;
            if (!wallHang) {
                clearTimeout();
                setTimeout(dashEnd, 100);
            }
        } else if (!space && !dashAtk.keyReleased && playerState == "grounded") {
            dashAtk.keyReleased = true;
            clearTimeout();
            setTimeout(delayEnd, 600);
        }
        
    }

    player.vy += player.gravity;
    //if player is moving + grounded, apply friction
    if (player.fx > 0 && playerState == "grounded") {
        player.vx *= player.fx;
    }
    if (wallHang) {
        dashAtk.aerial = true;
    }
    if (wallHang && player.fy < 1) {
        if (Math.abs(lastVX) > 0 && Math.abs(lastVX) < 1) {
        } else {
            if (lastVX >= 30) {
                lastVX = -30;
            }
            if (lastVX <= -30) {
                lastVX = 30;
            }
            lastVX*=0.98
            //console.log(lastVX);
        }
        //console.log("True");
        player.fy+=0.01;
    }
    if (player.fy >= 1 || playerState != "wallHanging") {
        player.fy = 1;
        wallHang = false;
    }

    player.vy *= player.fy;

    while (player.vx >= 30 && !dashAtk.trigger) {
        player.vx--;
        player.color = "#ffa500"
    }
    while (player.vx <= -30 && !dashAtk.trigger) {
        player.vx++;
        player.color = "#ffa500"
    }

    player.fx = 0.85

    if (playerState != "jumping") playerState = "falling";

    player.move();

    var offset = {x:player.vx, y:player.vy};
	
	//All tile code
	for(var i = 0; i < level.grid.length; i++)
	{
		level.grid[i].drawRect();
        //Hit bottom
		while(level.grid[i].hitTestPoint(player.bottom()) && player.vy >= 0)
            {
                player.y--;
                offset.y--;
                player.vy = 0;
                player.fy = 1;
                playerState = "grounded";
                canJump = true;
                dJump = true;
                dKick = true;
                dashAtk.aerial = true;
                wallHang = false;
                //console.log("True bottom");
            }
		//Hit top
		while(level.grid[i].hitTestPoint(player.top()) && player.vy <= 0)
		{
			player.vy = 0;
			player.y++;
			offset.y++;
            //console.log("True top");
		}
		//Hit right
		while(level.grid[i].hitTestPoint(player.right()) && player.vx >= 0)
		{
            if (!wallHang && !canJump && Math.abs(player.vx) > 0.5) {
                lastVX = player.vx;
                lastVY = player.vy;
                player.vy = 0;
                player.fy = 0.5;
                wallHang = true;
            }
            wallDir = "left";
            player.x--;
            offset.x--;
            player.vx = 0;
		}
		//Hit left
		while(level.grid[i].hitTestPoint(player.left()) && player.vx <= 0)
		{
            if (!wallHang && !canJump && Math.abs(player.vx) > 0.5) {
                lastVX = player.vx;
                lastVY = player.vy;
                player.vy = 0;
                player.fy = 0.5;
                wallHang = true;
                //console.log("Hanging on wall");
            }
            wallDir = "right"
            player.x++;
            offset.x++;
            player.vx = 0;
            //console.log("True left");
		}

        if(level.grid[i].hitTestPoint(player.wallLeft()) || level.grid[i].hitTestPoint(player.wallRight())) {
            playerState = "wallHanging";
        }

	}
	
	//Moves the level and the player back the total number of pixels traveled over one animation loop.
	if (player.x >= canvas.width-canvas.width/4 ||
		player.x <= canvas.width/4) {
		player.x -= offset.x;		
		level.x -= offset.x;
	}
	if (player.y >= canvas.height-canvas.height/4 ||
		player.y <= canvas.height/4) {
		player.y -= offset.y;
		level.y -= offset.y;
	}
    
    if (wallHang) {
        player.color = "#8cff9c";
    }
    
    player.drawRect();
}

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);
    states[currentState]();
}