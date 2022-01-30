let pomodoroTime = 1;
let shortBreakTime = 1;
let longBreakTime = 10;
let sessionCounter = 1;
let startPauseControl = 0 //to control when to start and when to pause


let min = pomodoroTime;
let sec = 0;
let t;
let mode = {
    title: "",
    code: "", //can be "pomodoro", "short break" or "long break"
    time: pomodoroTime
};

let countdownDisplay = document.getElementById("countdown");
let modeDisplay = document.getElementById("mode");
let startPauseButton = document.getElementById("startpause");
let configTimers = document.getElementById("configTimers");
let pomodoroConfig = document.getElementById("pomodoroConfig");

displayTime();
//pomodoroConfig.innerHTML = (min > 9 ? (min):("0"+min));

function tick() {
    displayTime();
    if(sec == 0) {
        if(min == 0) {
            clearInterval(t);
            endTimer();
        }else{
            sec = 59;
            min--;
        }
    }else{
        sec--;
    }
}

function endTimer(){
    if(sessionCounter != 0 && sessionCounter % 4 == 0) {
    //every 4th break session, there is a long pause instead of a short pause
    startLongBreak();
    }else {
        if(mode.code == "pomodoro") {
        //a working session just ended
            startShortBreak();
        }else{
        //a short break session just ended, which means a complete session ended
            sessionCounter++;
            startPomodoro();
        }
    }
}

function displayTime() {
    countdownDisplay.innerHTML = (min > 9 ? (min):("0"+min))
    + ":" + (sec > 9 ? (sec):("0"+sec));
}

function countdown() {
    t = setInterval(tick, 100);
}

function startPomodoro() {
    mode.title = "Working Session (be focused!)";
    mode.code = "pomodoro";
    modeDisplay.innerHTML = mode.title;
    mode.time = pomodoroTime;
    min = mode.time;
    countdown();
}

function startShortBreak() {
    mode.title = "Short Break (relax my man)";
    mode.code = "short-break";
    modeDisplay.innerHTML = mode.title;
    mode.time = shortBreakTime;
    min = mode.time;
    countdown();
}

function startLongBreak() {
    mode.title = "Long Break (ultimate relax)";
    mode.code = "long-break";
    modeDisplay.innerHTML = mode.title;
    mode.time = longBreakTime;
    min = mode.time;
    countdown();
}

function startAndPause(){
    if (startPauseControl == 0) {
        //first time button is pressed. Set variable to 1 and start Pomodoro
        startPauseControl = 1;
        startPauseButton.innerHTML = "Pause";
        startPomodoro();

    } else if(startPauseControl == 1) {
        //stop pomodoro
        startPauseControl = 2;
        startPauseButton.innerHTML = "Start";
        clearInterval(t);

    } else if (startPauseControl == 2) {
        //resume pomodoro
        startPauseControl = 1;
        startPauseButton.innerHTML = "Pause";
        countdown();
    }
}

function reset() {
    clearInterval(t);
    startPauseControl = 0;
    startPauseButton.innerHTML = "Start";
    sec = 0;
    min = mode.time;
    displayTime();
}

/*
function subtractPomodoroMin() {
    if(pomodoroTime > 0){
        pomodoroTime--;
        min--;
    }
    displayTime();
    pomodoroConfig.innerHTML = (min > 9 ? (min):("0"+min));
}
*/