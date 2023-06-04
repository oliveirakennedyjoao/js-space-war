import { Game } from "./src/scripts/game.js";

export const CANVAS_WIDTH = 2048;
export const CANVAS_HEIGHT = 2048;

const canvas = document.getElementById("game-screen");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game(context);

function run() {
  game.update();
  game.clearScreen();
  game.render();

  window.requestAnimationFrame(run);
}

run();
