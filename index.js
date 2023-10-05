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

const toggleButton = () => {
  lapButton.classList.remove("hidden");
};

const play = () => {
  if (!isplay) {
    playButton.innerHTML = "PAUSE";
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
    playButton.innerHTML = "PLAY";
    clearInterval(sec);
    clearInterval(centiSec);
    clearInterval(min);
    isplay = false;
    bg.classList.remove("animationBg");
  }
  toggleButton();
};

const playSec = () => {};

const reset = () => {
  play();
  lapButton.classList.add("hidden");
};

const lap = () => {
  if (isplay) {
    if ((playButton.innerHTML = "PAUSE")) {
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
    if ((playButton.innerHTML = "PLAY")) {
      lapButton.innerHTML = "RESET";
      second.innerHTML = " &nbsp;00 :";
      centiSecond.innerHTML = " &nbsp;00";
      minute.innerHTML = " 00 :";
      lapButton.classList.remove("hidden");
    }
  }
};

const clearAll = () => {
  laps.innerHTML = "";
  laps.append(clearButton);
  clearButton.classList.add("hidden");
  lapItem = 0;
};

playButton.addEventListener("click", play);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
