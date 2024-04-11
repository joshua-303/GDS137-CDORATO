var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var ball = new GameObj(canvas.width/2, canvas.height/2, 80, 80, "#ff00ff");
var paddle = new GameObj(canvas.width/2, canvas.height-50, 250, 40, "#00ffff");
ball.vx = 5;
ball.vy = 0;
paddle.vx = 0;
paddle.fx = 0.87;

var score = 0;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if(d) {
        paddle.vx += paddle.px * paddle.force;
    }
    if(a) {
        paddle.vx += paddle.px * -paddle.force;
    }

    ball.vy += ball.gravity;
    ball.vx *= ball.fx;
    ball.vy *= ball.fy;

    paddle.vx *= paddle.fx;

    paddle.move();
    ball.move();

    if(paddle.x > canvas.width - paddle.width/2) {
        paddle.x = canvas.width - paddle.width/2;
    }
    if(paddle.x < 0 + paddle.width/2) {
        paddle.x = 0 + paddle.width/2;
    }

    if(paddle.vx > 10) {
        paddle.vx = 10;
    }
    if(paddle.vx < -10) {
        paddle.vx = -10;
    }

    //bouncing off the sides
    if (ball.x <= 0 + ball.width/2 || ball.x >= canvas.width - ball.width/2) {
        ball.x = ball.prevX
        ball.vx = -ball.vx;
    }
    //bouncing off the top
    if (ball.y < 0 + ball.height/2) {
        ball.y = 0 + ball.height/2;
        ball.vy = -ball.vy * 0.67;
    //bouncing off the bottom
    } else if (ball.y > canvas.height - ball.height/2) {
        ball.y = canvas.height - ball.height/2;
        ball.vy = -ball.vy * 0.67;
        score = 0;
        //console.log("Score = " + score);
    }
    //bouncing off the paddle
    if (paddle.testCollide(ball)) {
        ball.y = paddle.y - paddle.height/2 - ball.height/2 - 1;
        //ball.x = ball.prevX;
        ball.vy = -35;

        //increments vx by different amount based on paddle pos
        if (ball.x < paddle.x - paddle.width/3) {
            ball.vx += -ball.force * 5;
        } else if (ball.x < ball.x - ball.width/6) {
            ball.vx += -ball.force;
        }

        if (ball.x > paddle.x + paddle.width/3) {
            ball.vx += ball.force * 5;
        } else if (ball.x > ball.x + ball.width/6) {
            ball.vx += ball.force;
        }
        score++;
        //console.log("Score = " + score);
    }

    ball.prevX = ball.x;

    context.font = "16px Arial Black";
    context.fillStyle = "#555555";
    context.fillText("Score = " + score, 80, 25)

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