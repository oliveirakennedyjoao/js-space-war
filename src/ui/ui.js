import { drawer } from "../core/drawer.js";

export class UI {
  constructor(player) {
    this.player = player;
  }
  render() {
    drawer.context.font = "64px Arial";
    drawer.context.fillStyle = "white";
    drawer.context.fillText(`Life: ${this.player.health}`, 100, 200);
  }
}
