const fan = document.getElementById("fan");

let angle = 0;
let speed = 0;
let animationFrame = null;
let isRunning = false;

function rotateFan() {
  angle += speed;
  fan.style.transform = `rotate(${angle}deg)`;

  if (isRunning || speed > 0.01) {
    animationFrame = requestAnimationFrame(rotateFan);
  } else {
    cancelAnimationFrame(animationFrame);
    speed = 0;
  }
}

function fanOn() {
  speed = 2;
  isRunning = true;
  cancelAnimationFrame(animationFrame);
  rotateFan();
}

function setSpeed(level) {
  isRunning = true;

  switch (level) {
    case 1:
      speed = 5;
      break;
    case 2:
      speed = 10;
      break;
    case 3:
      speed = 20;
      break;
    default:
      speed = 2;
  }

  cancelAnimationFrame(animationFrame);
  rotateFan();
}

function fanOff() {
  isRunning = false;

  function smoothStop() {
    speed *= 0.97;
    angle += speed;
    fan.style.transform = `rotate(${angle}deg)`;

    if (speed > 0.01) {
      animationFrame = requestAnimationFrame(smoothStop);
    } else {
      cancelAnimationFrame(animationFrame);
      speed = 0;
    }
  }

  cancelAnimationFrame(animationFrame);
  smoothStop();
}