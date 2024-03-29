var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;
var collCount = 0;

var ball = new Ball();

var timer = setInterval(animate, interval);

ball.draw();

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    //caps vx and vy at the speed cap, sCap (set to 10)
    if (ball.vx == ball.sCap && ball.xAccel == 1 || ball.vx == -ball.sCap && ball.xAccel == -1) {
        ball.xAccel = 0;
    }

    if (ball.vy == ball.sCap && ball.yAccel == 1 || ball.vy == -ball.sCap && ball.yAccel == -1) {
        ball.yAccel = 0;
    }

    ball.move();

    if(ball.x >= canvas.width - ball.width/2 || ball.x <= 0 + ball.width/2) {
        ball.vx+=ball.xAccel;
        ball.vx = -ball.vx;
        ball.xAccel = -ball.xAccel;
        collCount++;
        //console.log("VX: " + ball.vx);
        //console.log("XACCEL: " + ball.xAccel);
    }

    if(ball.y >= canvas.height - ball.height/2 || ball.y <= 0 + ball.height/2) {
        ball.vy+=ball.yAccel;
        ball.vy = -ball.vy
        ball.yAccel = -ball.yAccel;
        collCount++;
        //console.log("VY: " + ball.vy);
        //console.log("YACCEL: " + ball.yAccel)
    }

    //prints collCount to h1 "test" in the html file
    document.getElementById("test").innerHTML = collCount + " HITS";

    ball.draw();
}