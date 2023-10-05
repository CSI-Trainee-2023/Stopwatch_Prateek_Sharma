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

function toggleButton()  {
  lapButton.classList.remove("hidden");
};

function play() {
  if (!isplay) {
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
  } else {
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

function playSec()  {

};

function reset()  {
  play();
  lapButton.classList.add("hidden");
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

      number.innerText = `#${lapItem++}`;
      timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

      li.append(number, timeStamp);
      laps.append(li);

      clearButton.classList.remove("hidden");
    }
  }
  if (!isplay) {
    if ((playButton.innerHTML = "RESUME")) {
      lapButton.innerHTML = "RESET";
      second.innerHTML = " &nbsp;00 :";
      centiSecond.innerHTML = " &nbsp;00";
      minute.innerHTML = " 00 :";
      
    }
    lapButton.classList.remove("hidden");
  }
}

function clearAll() {
  laps.innerHTML = "";
  laps.append(clearButton);
  clearButton.classList.add("hidden");
  lapItem = 0;
}

// playButton.addEventListener ('keydown', (event)=>
//   {if (event.ctrlkey && (event.key === 'e')){
//     event.preventDefault()
//     // call the function here
//     play();
//   }}
// )
playButton.addEventListener("click", play);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);

// key shortcuts
// S/X - Start/Stop
// R - Reset
// L - Lap

// document.onkeyup = function (e) {
//   if (e.key == 'p') {
//       play.click()
//   } else if (e.key == 'x') {
//       play.click()
//   } else if (e.key == 'c') {
//       clearAll.click()
//   } else if (e.key == 'l') {
//       lap.click()
//   }
// };