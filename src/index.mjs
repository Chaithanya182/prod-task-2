const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

let timer;
let running = false;
let startTime;
let pausedTime = 0;
let lapCount = 1;

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startPause() {
  if (!running) {
    startStopwatch();
    startPauseBtn.textContent = "Pause";
  } else {
    pauseStopwatch();
    startPauseBtn.textContent = "Resume";
  }
}

function startStopwatch() {
  running = true;
  startTime = Date.now() - pausedTime;
  timer = setInterval(updateDisplay, 10);
}

function pauseStopwatch() {
  running = false;
  clearInterval(timer);
  pausedTime = Date.now() - startTime;
}

function reset() {
  clearInterval(timer);
  running = false;
  pausedTime = 0;
  display.textContent = "00:00:00";
  startPauseBtn.textContent = "Start";
  lapCount = 1;
  lapsList.innerHTML = "";
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millisecondsRemainder = Math.floor((milliseconds % 1000) / 10);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
    millisecondsRemainder
  )}`;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

function lap() {
  if (running) {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCount++;
  }
}
