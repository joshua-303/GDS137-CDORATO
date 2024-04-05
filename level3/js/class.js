class GameObj {
    constructor(x, y, w, h, color) {
        //assigns defaults to data if otherwise undefined
        if (x == undefined) {
            this.x = canvas.width/2;
        } else {
            this.x = x;
        }

        if (y == undefined) {
            this.y = canvas.height/2;
        } else {
            this.y = y;
        }

        if (w == undefined) {
            this.width = 100;
        } else {
            this.width = w;
        }

        if (h == undefined) {
            this.height = 100;
        } else {
            this.height = h;
        }

        if (color == undefined) {
            this.color = "#ff0000";
        } else {
            this.color = color;
        }

        //horizontal and vertical speeds
        this.vx = 2;
        this.vy = 2;

        //rate of acceleration (when colliding with walls)
        this.xAccel = 1;
        this.yAccel = 1;

        //speed cap
        this.sCap = 10;

        this.force = 0;
    }

    drawCircle() {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
        context.restore();
    }

    drawRect() {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
        context.restore();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    left() {
        return this.x - this.width/2;
    }

    right() {
        return this.x + this.width/2;
    }

    top() {
        return this.y - this.height/2;
    }

    bottom() {
        return this.y + this.height/2;
    }

    testCollide(obj) {
        if (this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top()) {
            return true;
        } else {
            return false;
        }
    }
}