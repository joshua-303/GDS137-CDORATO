var w = false;
var s = false;
var up = false;
var down = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e) {
    console.log(e.keyCode);

    if(e.keyCode == 87) {
        w = true;
    }
    if(e.keyCode == 83){
        s = true;
    }
    if(e.keyCode == 38){
        up = true;
    }
    if(e.keyCode == 40){
        down = true;
    }
}

function release(e) {
    if(e.keyCode == 87) {
        w = false;
    }
    if(e.keyCode == 83){
        s = false;
    }
    if(e.keyCode == 38){
        up = false;
    }
    if(e.keyCode == 40){
        down = false;
    }
}