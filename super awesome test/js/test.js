var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var stage = new createjs.Stage(canvas);

context.save();
context.fillStyle = "#ff0000";
context.translate(canvas.width/2, canvas.height/2);
context.fillRect((-50/2), (-50/2), 50, 50);
context.restore();

function init() {
    /*var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = stage.canvas.width/2;
    circle.y = stage.canvas.height/2;
    stage.addChild(circle);*/

    var spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": ["images/malleo.png"],
        "frames": [
            [16, 14, 21, 35],
            [48, 14, 21, 35],
            [79, 14, 21, 35],
            [113, 14, 21, 35],
            [144, 14, 22, 35],
            [176, 14, 21, 35]
        ],//{"height": 35, "count": 6, "width": 22, "spacing": 13},
        "animations": {
            "attack": [0, 5, "attack"]
        }
    })
    var cid = new createjs.Sprite(spriteSheet, "attack");
    cid.x = stage.canvas.width/2;
    cid.y = stage.canvas.height/2;
    stage.addChild(cid);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}