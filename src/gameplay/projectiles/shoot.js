import { drawer } from "../../core/drawer.js";
export class Shoot {
  constructor(sprite, x, y) {
    this.sprite = sprite;
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
    drawer.draw(this);
  }
}
