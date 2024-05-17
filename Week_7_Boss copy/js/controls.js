var a = false;
var d = false;
var w = false;
var s = false;
var space = false;
var newKey;
var lastKeyPressed;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e) {
    console.log(e.keyCode);

    if(e.keyCode == 65) {
        a = true;
    }
    if(e.keyCode == 68) {
        d = true;
    }
    if(e.keyCode == 87) {
        w = true;
    }
    if(e.keyCode == 83) {
        s = true;
    }
    if(e.keyCode == 32) {
        space = true;
    }

    keyHasReleased = false;
    newKey = e.keyCode;
    //console.log(newKey + ' ' + lastKeyPressed);
}

function release(e) {
    if(e.keyCode == 65) {
        a = false;
    }
    if(e.keyCode == 68) {
        d = false;
    }
    if(e.keyCode == 87) {
        w = false;
    }
    if(e.keyCode == 83) {
        s = false;
    }
    if(e.keyCode == 32) {
        space = false;
    }

    keyHasReleased = true;
    lastKeyPressed = e.keyCode;
}