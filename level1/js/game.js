var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;

var ball = new Ball();

//timer = setInterval(animate, interval);

ball.draw();

/* function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    player.x += player.vx;

    ball.draw();
} */