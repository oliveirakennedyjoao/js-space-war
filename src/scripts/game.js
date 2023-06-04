import { Player } from "./player.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../main.js";
import { Background } from "./background.js";
import { Enemy } from "./enemy.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.player = new Player(context);
    this.background = new Background(context);
    this.enemy = new Enemy(context);
  }

  clearScreen() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  render() {
    this.background.render();
    this.player.render();
    this.enemy.render();
  }

  update() {
    this.background.update();
    this.player.playerController.update();
    this.player.update();
    this.enemy.update();
  }
}
