var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var player = new GameObj({x:canvas.width/2, y:canvas.height/2, height:40, width:40, color:"#00ffff"});
var jumpHeight = -20;
var canJump = false;
var dash = false;
var coolDown = false;
var dashSpeed = 15;
player.force = 0.55;

var keyReleaseTimer = 0;
var coolDownTimer = 0;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if (dash) {
        if (!a && !d) {
            keyReleaseTimer++;
            //console.log(keyReleaseTimer);
        }
    }

    if (keyReleaseTimer >= 15) {
        keyReleaseTimer = 0
        dash = false;
    }

    if (coolDown) {
        coolDownTimer++;
        if (coolDownTimer > 30) {
            coolDown = false;
            coolDownTimer = 0;
        }
        //console.log(coolDownTimer);
    }

    if(w && canJump && player.vy == 0) {
        canJump = false;
        player.vy = jumpHeight;
    }
    if (d && dash && keyReleaseTimer >= 1 && lastKeyPressed == newKey && canJump && !coolDown) {
        player.vx += dashSpeed;
        dash = false;
        keyReleaseTimer = 0;
        coolDown = true;
    } else if(d) {
        player.vx += player.px * player.force;
        dash = true;
        player.fx = 0;
    }
    if (a && dash && keyReleaseTimer >= 1 && lastKeyPressed == newKey && canJump && !coolDown) {
        player.vx += -dashSpeed;
        dash = false;
        keyReleaseTimer = 0;
        coolDown = true;
    } else if(a) {
        player.vx += player.px * -player.force;
        dash = true;
        player.fx = 0;
    }

    player.vy += player.gravity;
    if(player.fx > 0 && canJump) {
        player.vx *= player.fx;
    }
    player.vy *= player.fy;

    if (player.vx > 25) {
        player.vx = 25;
    }

    player.fx = 0.87

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