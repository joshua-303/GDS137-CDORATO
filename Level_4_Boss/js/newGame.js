var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var player = new GameObj({x:canvas.width/2, y:canvas.height/2, height:40, width:40, color:"#00ffff"});
var jumpHeight = -20;
var canJump = false;
var walkButtonPressed = false;
var dashUsed = false;
var dashSpeed = 15;
var skid = false;
var keyHasReleased = false;
var triggerCoolDown = false;
var triggerTimer = false;
player.force = 0.55;

var keyReleaseTimer = 0;
var coolDownTimer = 0;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if (skid) {
        //console.log("True");
    }
    if (keyHasReleased && player.vx >= 20 || keyHasReleased && player.vx <= -20 || d && player.vx <= -20 || a && player.vx >= 20) {
        skid = true;
    }
    if (player.vx < 5 && player.vx >= 0 || player.vx > -5 && player.vx <= 0) {
        skid = false;
    }

    if (keyHasReleased && lastKeyPressed == 65 && walkButtonPressed || keyHasReleased && lastKeyPressed == 68 && walkButtonPressed) {
        triggerTimer = true;
        walkButtonPressed = false;
    }

    if (triggerTimer) {
            keyReleaseTimer++;
            //console.log(keyReleaseTimer);
            if (keyReleaseTimer >= 15) {
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
        }
        if (d && walkButtonPressed && keyReleaseTimer >= 1 && lastKeyPressed == newKey && canJump && !dashUsed) {
            player.vx += dashSpeed;
            walkButtonPressed = false;
            keyReleaseTimer = 0;
            dashUsed = true;
            console.log("Dash!")
        } else if(d) {
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
        } else if(a) {
            player.vx += player.px * -player.force;
            player.fx = 0;
            walkButtonPressed = true;
        }
    }

    player.vy += player.gravity;
    if(player.fx > 0 && canJump) {
        player.vx *= player.fx;
    }
    player.vy *= player.fy;

    if (player.vx > 25) {
        player.vx = 25;
    }

    player.fx = 0.9

    player.move();

    while(player.x > canvas.width - player.width/2) {
        player.x--;
        player.vx = 0;
    }
    while(player.x < 0 + player.width/2) {
        player.x++;
        player.vx = 0;
    }
    while(player.y > canvas.height - player.height/2) {
        player.y--;
        player.vy = 0;
        canJump = true;
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