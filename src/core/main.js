import { Game } from "./game.js";

const canvas = document.getElementById("game-screen");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let DELTA_TIME = 0;
let PAUSE_GAME = false;
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 2048;

console.log(window.screen);

const game = new Game(context);

let previousTime = 0;

document.body.addEventListener(
  "touchstart",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
document.body.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
document.body.addEventListener(
  "touchend",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

function run(currentTime) {
  if (!PAUSE_GAME) {
    game.destroy();
    game.update();
    game.clearScreen();
    game.render();

    DELTA_TIME = (currentTime - previousTime) / 1000;
    previousTime = currentTime;
  }

  window.requestAnimationFrame(run);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    PAUSE_GAME = !PAUSE_GAME;
  }
});

run(0);
