import { Game } from "./src/scripts/game.js";

export const CANVAS_WIDTH = 2048;
export const CANVAS_HEIGHT = 2048;

const canvas = document.getElementById("game-screen");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game(context);

let previousTime = 0;

function run(currentTime) {

  game.destroy();
  game.update();
  game.clearScreen();
  game.render();

  DELTA_TIME = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  window.requestAnimationFrame(run);
}

run(0);
