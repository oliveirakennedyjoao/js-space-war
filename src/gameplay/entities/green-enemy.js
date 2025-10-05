import { Enemy } from "./enemy.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { followTargetMovement } from "../../engine/physics/movement-controller.js";

export class GreenEnemy extends Enemy {
  constructor(sprite, context, player) {
    super(sprite, context, player);
    this.move = followTargetMovement;
  }

  update() {
    this.move(this, this.player, this.velocity.y, DELTA_TIME);

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }
}
