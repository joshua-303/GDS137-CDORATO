var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var interval = 1000/60;
var player1Score = 0;
var player2Score = 0;

var player = new GameObj(10, canvas.height/2, 20, 180, "#ff0000");
var playerTwo = new GameObj(canvas.width - player.width/2, canvas.height/2, 20, 180, "#fcba03");
var ball = new GameObj();
ball.width = 50;
ball.height = 50;
ball.vx = -2;
ball.vy = 2;
ball.xAccel = -1;

var timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);

    if(w && player.y > 0 + player.height/2 /*&& !player.testCollide(ball)*/) {
        player.y-=5;
    }
    if(s && player.y < canvas.height - player.height/2 /*&& !player.testCollide(ball)*/) {
        player.y+=5;
    }

    if(up && playerTwo.y > 0 + playerTwo.height/2) {
        playerTwo.y-=5;
    }
    if(down && playerTwo.y < canvas.height - playerTwo.height/2 /*&& !player.testCollide(ball)*/) {
        playerTwo.y+=5;
    }

    //caps vx and vy at the speed cap, sCap (set to 10)
    if (ball.vx == ball.sCap && ball.xAccel == 1 || ball.vx == -ball.sCap && ball.xAccel == -1) {
        ball.xAccel = 0;
    }

    if (ball.vy == ball.sCap && ball.yAccel == 1 || ball.vy == -ball.sCap && ball.yAccel == -1) {
        ball.yAccel = 0;
    }

    ball.move();
    
    //if ball hits left/right side of canvas
    if(ball.x >= canvas.width - ball.width/2 || ball.x <= 0 + ball.width/2) {
        if(ball.x >= canvas.width - ball.width/2) {
            player1Score++;
        }
        if(ball.x <= 0 + ball.width/2) {
            player2Score++;
        }
        ball.vx = -2;
        ball.vy = -1;
        ball.xAccel = -1;
        ball.yAccel = 1;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        
        //console.log("VX: " + ball.vx);
        //console.log("XACCEL: " + ball.xAccel);
    }

    //if ball hits certain parts of paddle, bounce up, directly back, or down
    if(player.testCollide(ball)) {
        ball.vx += ball.xAccel;
        if(ball.y < player.y - player.height/6) {
            ball.vy = -Math.abs(ball.vy);
        } else if (ball.y > player.y + player.height/6) {
            ball.vy = Math.abs(ball.vy);
        }
        ball.vx = -ball.vx;
        ball.xAccel = -ball.xAccel;
        ball.yAccel = -ball.yAccel;
        //collCount++;
    }

    if(playerTwo.testCollide(ball)) {
        ball.vx += ball.xAccel;
        if(ball.y < playerTwo.y - playerTwo.height/6) {
            ball.vy = -Math.abs(ball.vy);
        } else if (ball.y > playerTwo.y + playerTwo.height/6) {
            ball.vy = Math.abs(ball.vy);
        }
        ball.vx = -ball.vx;
        ball.xAccel = -ball.xAccel;
        ball.yAccel = -ball.yAccel;
        //collCount++;
    }

    //if ball hits top/bottom of canvas
    if(ball.y >= canvas.height - ball.height/2 || ball.y <= 0 + ball.height/2) {
        //ball.vy += ball.yAccel;
        ball.vy = -ball.vy;
        ball.yAccel = -ball.yAccel;
        //collCount++;
        //console.log("VY: " + ball.vy);
        //console.log("YACCEL: " + ball.yAccel)
    }

    /*if(ball.testCollide(player)) {
        console.log("True");
    } else {
        console.log("False");
    }*/

    //prints collCount to h1 "test" in the html file
    document.getElementById("test").innerHTML = "P1 SCORE: " + player1Score;
    document.getElementById("test2").innerHTML = "P2 SCORE: " + player2Score;

    context.save();
        context.strokeStyle = "#54e5ff";
        context.beginPath();
        context.moveTo(canvas.width/2, 0);
        context.lineTo(canvas.width/2, canvas.height);
        context.closePath();
        context.lineWidth = 5;
        context.stroke();
    context.restore();
    player.drawRect();
    playerTwo.drawRect();
    ball.drawCircle();
}