import { Enemy } from "./enemy.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { zigzagMovement } from "../../engine/physics/movement-controller.js";

export class GoldenEnemy extends Enemy {
  constructor(sprite, context, player) {
    super(sprite, context, player);
    this.move = zigzagMovement;
  }

  update() {
    this.move(
      this,
      this.velocity.x,
      this.velocity.y,
      CANVAS_WIDTH - this.position.x,
      DELTA_TIME
    );

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }
}
