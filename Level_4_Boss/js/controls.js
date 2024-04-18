var a = false;
var d = false;
var w = false;
var newKey;
var lastKeyPressed;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e) {
    //console.log(e.keyCode);

    if(e.keyCode == 65) {
        a = true;
    }
    if(e.keyCode == 68) {
        d = true;
    }
    if(e.keyCode == 87) {
        w = true;
    }

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

    lastKeyPressed = e.keyCode;
}