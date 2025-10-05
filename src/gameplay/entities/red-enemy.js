import { Enemy } from "./enemy.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { followTargetMovement } from "../../engine/physics/movement-controller.js";

const RED_ENEMY_SPRITE = new Sprite("./src/assets/sprites/enemy_green.png", {
  startX: 0,
  startY: 0,
  finalX: 472,
  finalY: 529,
});

export class RedEnemy extends Enemy {
  constructor(context, player) {
    super(RED_ENEMY_SPRITE, context, player);
    this.move = followTargetMovement;
  }

  update() {
    this.move(this, this.player, this.velocity.y, DELTA_TIME);

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }
}
