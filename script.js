let min = 25;
let sec = 0;
var t;

let countdown = document.getElementById("countdown");

function tick() {
    if (min === 0) {
        endTimer()
    }else{
        if(sec === 0) {
            min--;
            sec = 59;
        }else{
        sec--;
        }
    }
}

function endTimer(){

}

function displayTime () {
    countdown.innerHTML = (min > 9 ? (min):("0"+min))
    + ":" + (sec > 9 ? (sec):("0"+sec));
}

function subtractSecond() {
    displayTime();
    tick();
    timer();
}

function timer() {
    t = setTimeout(subtractSecond, 1000);
}

timer();