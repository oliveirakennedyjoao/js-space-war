import { Game } from "./src/core/game.js";
import { assetManager } from "./src/core/asset-manager.js";

window.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    PAUSE_GAME = !PAUSE_GAME;
  }
});

assetManager.loadAllAssets().then(() => {
  const game = new Game();
  game.start();
});
