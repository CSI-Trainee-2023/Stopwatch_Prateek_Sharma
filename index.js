const playButton = document.getElementsByClassName("play")[0];

const clearButton = document.getElementsByClassName("lapClearButton")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const minute = document.getElementsByClassName("min")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outerCircle")[0];

let isplay = false;
let secCounter = 0;
let sec;
let centiCounter = 0;
let centiSec;
let min;
let minCounter = 0;
let lapItem = 1;

function toggleButton()  
{
  lapButton.classList.remove("hidden");
};

function play() {
  if (!isplay) 
  {
    playButton.innerHTML = "STOP";
    lapButton.textContent = "LAP";
    bg.classList.add("animationBg");

    min = setInterval(() => {
      minute.innerHTML = `${++minCounter} :&nbsp;`;
    }, 60 * 1000);
    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerHTML = `${++secCounter} :&nbsp;`;
    }, 1000);
    centiSec = setInterval(() => {
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      centiSecond.innerHTML = `${++centiCounter}`;
    }, 10);
    
    isplay = true;
  } 
  else 
  {
    playButton.innerHTML = "RESUME";
    lapButton.textContent = "RESET";
    clearInterval(sec);
    clearInterval(centiSec);
    clearInterval(min);
    isplay = false;
    bg.classList.remove("animationBg");
  }
  toggleButton();
};

function lap() {

  if (isplay) {
    if ((playButton.innerHTML = "STOP")) {
      lapButton.innerHTML = "LAP";
      const li = document.createElement("li");
      const number = document.createElement("span");
      const timeStamp = document.createElement("span");
      li.setAttribute("class", "lap-item");
      number.setAttribute("class", "number");
      timeStamp.setAttribute("class", "time-stamp");
      const num = number.innerText = `#${lapItem++}`;
      var time=timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
      li.append(number, timeStamp);
      laps.append(li);
      clearButton.classList.remove("hidden");
    }
  }
  
  if (!isplay) {
    if ((playButton.innerHTML = "RESUME")) {
      lapButton.innerHTML = "RESET";
      toReset(); 
    }
    lapButton.classList.remove("hidden");
  }
}

function toReset()
{
  second.innerHTML = " &nbsp;00 :";
  centiSecond.innerHTML = " &nbsp;00";
  minute.innerHTML = " 00 :";
}


function clearAll()
{
  laps.innerHTML = "";
  laps.append(clearButton);
  clearButton.classList.add("hidden");
  lapItem = 0;
}


playButton.addEventListener("click", play);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);

// key shortcuts
// ctrl+ s - Start/Stop \resume
// ctrl+R - Reset
// ctrl+L - Lap
// ctrl+c  - clearall laps

document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "s") { play() } });
document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "s") { toStop() } });
document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "r") { toReset() } });
document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "l") { lap() } });
document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "s") { Resume() } });
document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "c") { clearAll() } });

// use local storage to store laps 
localStorage.setItem("num", "time");
