import { Sprite } from "../../engine/renderer/sprite.js";
export class Shoot {
  constructor(x, y) {
    this.sprite = new Sprite("./src/assets/sprites/laser_green.png", {
      startX: 0,
      startY: 0,
      finalX: 9,
      finalY: 33,
    });
    this.type = "shoot";
    this.position = { x: x, y: y };
    this.velocity = { x: 0, y: 20 };
    this.width = 9;
    this.height = 33;
    this.destroy = false;
  }

  update() {
    this.position.y -= 1500 * DELTA_TIME;

    if (this.position.y < 0) {
      this.destroy = true;
    }
  }

  render() {
    draw(this);
  }
}
