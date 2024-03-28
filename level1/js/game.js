var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var timer;
var interval = 1000/60;

var ball = new Ball();

timer = setInterval(animate, interval);

ball.draw();

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    ball.move();

    if(ball.x > canvas.width - ball.width/2 || ball.x < 0 + ball.width/2) {
        ball.vx = -ball.vx;
    }

    if(ball.y > canvas.height - ball.height/2 || ball.y < 0 + ball.height/2) {
        ball.vy = -ball.vy
    }

    ball.draw();
}