class Ball {
    constructor() {
        //initializes the ball in the center of the canvas
        this.x = canvas.width/2;
        this.y = canvas.height/2;

        this.width = 100;
        this.height = 100;

        //horizontal and vertical speeds
        this.vx = 1;
        this.vy = 1;

        //rate of acceleration (when colliding with walls)
        this.xAccel = 1;
        this.yAccel = 1;

        //speed cap
        this.sCap = 10;

        this.color = "#ff0000";

        this.force = 0;
    }

    draw() {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
        context.restore()
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}