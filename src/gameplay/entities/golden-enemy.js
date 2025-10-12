import { Enemy } from "./enemy.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { zigzagMovement } from "../../engine/physics/movement-controller.js";

export class GoldenEnemy extends Enemy {
  constructor(sprite, context, player) {
    super(sprite, context, player);
    this.move = zigzagMovement;
  }

  update() {
    if (this.hitted) {
      this.explosionAnimation.update();
      return;
    }

    this.move(
      this,
      this.velocity.x,
      this.velocity.y,
      CANVAS_WIDTH - this.position.x,
      DELTA_TIME
    );

    this.position.x = Math.max(
      0,
      Math.min(CANVAS_WIDTH - this.width, this.position.x)
    );

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }
}
