import { Game } from "./src/scripts/game.js";

const canvas = document.getElementById("game-screen");
const context = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game(context);

let previousTime = 0;

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
