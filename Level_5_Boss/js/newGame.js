var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var player = new GameObj({x:canvas.width/2, y:canvas.height/2, height:40, width:40, color:"#00ffff"});
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
player.force = 0.22;

var keyReleaseTimer = 0;
var coolDownTimer = 0;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    player.color = "#00ffff"

    if (skid) {
        player.color = "#ff0000";
    }
    if (keyHasReleased && player.vx >= 12 && lastKeyPressed != 87 && canJump
        || keyHasReleased && player.vx <= -12 && lastKeyPressed != 87 && canJump
        || d && player.vx <= -12 && canJump
        || a && player.vx >= 12 && canJump) {
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
        if(w && canJump && player.vy == 0) {
            canJump = false;
            player.vy = jumpHeight;
        } else if (w && dJump && player.vy >= 0) {
            if (d && player.vx < 0 || a && player.vx > 0) {
                player.vx= -player.vx*.7
            }
            dJump = false;
            player.vy = jumpHeight;
        }
        if (!dJump) {
            player.color = "#0100ff";
        }
        if (d && walkButtonPressed && keyReleaseTimer >= 1 && lastKeyPressed == newKey && canJump && !dashUsed) {
            player.vx += dashSpeed;
            walkButtonPressed = false;
            keyReleaseTimer = 0;
            dashUsed = true;
            console.log("Dash!")
        } else if(d && canJump) {
            player.vx += player.px * player.force;
            player.fx = 0;
            walkButtonPressed = true;
        }
        if (a && walkButtonPressed && keyReleaseTimer >= 1 && lastKeyPressed == newKey && canJump && !dashUsed) {
            player.vx += -dashSpeed;
            walkButtonPressed = false;
            keyReleaseTimer = 0;
            dashUsed = true;
            console.log("Dash!")
        } else if(a && canJump) {
            player.vx += player.px * -player.force;
            player.fx = 0;
            walkButtonPressed = true;
        }
    }

    player.vy += player.gravity;
    //if player is moving + grounded, apply friction
    if(player.fx > 0 && canJump) {
        player.vx *= player.fx;
    }
    player.vy *= player.fy;

    while (player.vx >= 30) {
        player.vx--;
        player.color = "#ffa500"
    }
    while (player.vx <= -30) {
        player.vx++;
        player.color = "#ffa500"
    }

    player.fx = 0.88

    player.move();

    if(player.x > canvas.width + player.width/2) {
        /*player.x--;
        player.vx = 0;*/
        player.x = 0 - player.width/2;
    }
    if(player.x < 0 - player.width/2) {
        /*player.x++;
        player.vx = 0;*/
        player.x = canvas.width + player.width/2;
    }
    while(player.y > canvas.height - player.height/2) {
        player.y--;
        player.vy = 0;
        canJump = true;
        dJump = true;
    }
    while(player.y < 0 + player.height/2) {
        player.y++;
        player.vy = 0;
    }
    

    /*if(paddle.vx > 10) {
        paddle.vx = 10;
    }
    if(paddle.vx < -10) {
        paddle.vx = -10;
    }*/

    player.drawRect();
}