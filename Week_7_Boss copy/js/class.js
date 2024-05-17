class GameObj {
    constructor(obj) {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.width = 100;
        this.height = 100;
        this.color = "#ff0000";

        //horizontal and vertical speeds
        this.vx = 0;
        this.vy = 0;


        //rate of acceleration (when colliding with walls)
        this.px = 1;
        this.py = 1;

        this.force = 2;

        this.gravSpeed = 0;

        this.gravity = 1;

        this.fx = 1;
        this.fy = 1;

        this.prevX;
        this.world = {x: 0, y: 0};

        if(obj !== undefined)
		{
			for(let value in obj)
			{
				if(this[value] !== undefined)
				{
					this[value] = obj[value];
				}
			}
		}
    }

    drawCircle() {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x + this.world.x, this.y + this.world.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
        context.restore();
    }

    drawRect() {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.world.x, this.y, this.world.y);
            context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
        context.restore();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    left() {
        return {x:this.x - this.width/2, y:this.y, world:this.world};
    }

    right() {
        return {x:this.x + this.width/2, y:this.y, world:this.world};
    }

    top() {
        return {x:this.x, y:this.y - this.height/2, world:this.world};
    }

    bottom() {
        return {x:this.x, y:this.y + this.height/2, world:this.world};
    }

    testHitPoint(obj) {
        if(obj.x + obj.world.x >= this.left().x + this.world.x && 
        obj.x + obj.world.x <= this.right().x + this.world.x &&
        obj.y + obj.world.y >= this.top().y + this.world.y &&  
        obj.y + obj.world.y <= this.bottom().y + this.world.y)
     {
         return true;
     }
     return false;
    }

    /*testCollide(obj) {
        if (this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top()) {
            return true;
        } else {
            return false;
        }
    }*/
}