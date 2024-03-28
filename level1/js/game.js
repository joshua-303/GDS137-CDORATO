var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var timer;
var interval = 1000/60;

var ball = new Ball();

timer = setInterval(animate, interval);

ball.draw();

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    ball.x += ball.vx;

    ball.draw();
}