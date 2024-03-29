var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;
var collCount = 0;

var player = new GameObj(50, canvas.height/2, 20, 180, "#ff0000");
var ball = new GameObj();
ball.width = 50;
ball.height = 50;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if(w && player.y > 0 + player.height/2 /*&& !player.testCollide(ball)*/) {
        player.y-=5;
    }
    if(s && player.y < canvas.height - player.height/2 /*&& !player.testCollide(ball)*/) {
        player.y+=5;
    }

    //caps vx and vy at the speed cap, sCap (set to 10)
    if (ball.vx == ball.sCap && ball.xAccel == 1 || ball.vx == -ball.sCap && ball.xAccel == -1) {
        ball.xAccel = 0;
    }

    if (ball.vy == ball.sCap && ball.yAccel == 1 || ball.vy == -ball.sCap && ball.yAccel == -1) {
        ball.yAccel = 0;
    }

    ball.move();

    if(ball.x >= canvas.width - ball.width/2 || ball.x <= 0 + ball.width/2) {
        ball.vx = -2;
        ball.vy = -2;
        ball.xAccel = 1;
        ball.yAccel = 1;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        collCount = 0;
        //console.log("VX: " + ball.vx);
        //console.log("XACCEL: " + ball.xAccel);
    }

    if(player.testCollide(ball)) {
        ball.vx = -ball.vx;
        ball.vy = -ball.vy;
        ball.xAccel = -ball.xAccel;
        ball.yAccel = -ball.yAccel;
        collCount++;
    }

    if(ball.y >= canvas.height - ball.height/2 || ball.y <= 0 + ball.height/2) {
        ball.vy+=ball.yAccel;
        ball.vy = -ball.vy;
        ball.yAccel = -ball.yAccel;
        collCount++;
        //console.log("VY: " + ball.vy);
        //console.log("YACCEL: " + ball.yAccel)
    }

    /*if(ball.testCollide(player)) {
        console.log("True");
    } else {
        console.log("False");
    }*/

    //prints collCount to h1 "test" in the html file
    document.getElementById("test").innerHTML = collCount + " HITS";

    player.drawRect();
    ball.drawCircle();
}