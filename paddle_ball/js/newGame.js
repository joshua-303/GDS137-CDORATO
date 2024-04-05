var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var ball = new GameObj(canvas.width/2, canvas.height/2, 80, 80, "#ff00ff");
var paddle = new GameObj(canvas.width/2, canvas.height-50, 250, 40, "#00ffff");
ball.vx = 5;
ball.vy = 0.1;


var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if(a && paddle.x > 0 + paddle.width/2) {
        paddle.x-=5;
    }
    if(d && paddle.x < canvas.width - paddle.width/2) {
        paddle.x+=5;
    }

    ball.move();

    if (ball.x <= 0 + ball.width/2 || ball.x >= canvas.width - ball.width/2) {
        ball.vx = -ball.vx;
    }
    if (ball.y <= 0 + ball.height/2) {
        ball.y = 0 + ball.height/2 + 1;
        ball.vy = -ball.vy;
        ball.gravSpeed = -ball.gravSpeed;
    } else if (ball.y >= canvas.height - ball.height/2) {
        ball.y = canvas.height - ball.height/2 - 1;
        ball.vy = -ball.vy * 0.67;
        //ball.gravity = -ball.gravity;
        ball.gravSpeed = -ball.gravSpeed;
        //ball.gravity = 0;
        //ball.vx = 0;
    } else if (paddle.testCollide(ball)) {
        ball.x = ball.prevX;
        ball.y = paddle.y - paddle.height/2 - ball.height/2 - 1;
        ball.vy = -ball.vy * 0.67;
        //ball.gravity = -ball.gravity;
        ball.gravSpeed = -ball.gravSpeed;
        //ball.gravity = 0;
        //ball.vx = 0;
    } else {
        ball.gravSpeed += ball.gravity;
        ball.y += ball.gravSpeed;
    }

    ball.prevX = ball.x;

    ball.drawCircle();
    paddle.drawRect();
    context.save();
        context.strokeStyle = "#000000";
        context.beginPath();
        context.moveTo(ball.x, ball.y);
        context.lineTo(paddle.x, paddle.y);
        context.closePath();
        context.lineWidth = 1;
        context.stroke();
    context.restore();
}