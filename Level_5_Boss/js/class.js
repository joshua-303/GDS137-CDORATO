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

        //speed cap
        //this.sCap = 10;

        this.gravSpeed = 0;

        this.gravity = 1;

        this.fx = 1;
        this.fy = 1;

        this.prevX;

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

    collision = {
        left() {
            return {x:this.x - this.width/2, y:this.y};
        },

        right() {
            return {x:this.x + this.width/2, y:this.y};
        },

        top() {
            return {x:this.x, y:this.y - this.height/2};
        },

        bottom() {
            return {x:this.x, y:this.y + this.height/2};
        }
    }

    testHitPoint(obj) {
        if(obj.x >= this.collision.left().x && 
        obj.x <= this.collision.right().x &&
        obj.y >= this.collision.top().y &&  
        obj.y <= this.collision.bottom().y)
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