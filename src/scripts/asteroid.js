import { Sprite } from "./sprite.js";

export class Asteroid {
  constructor(context, x, y) {
    this.asteroidSprite = new Sprite("./src/assets/sprites/asteroid.png");
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = 155;
    this.height = 150;
    this.velocityY = 200;
    this.destroy = false;
  }

  update() {
    this.y += this.velocityY * DELTA_TIME;

    if (this.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    // Matrix transformation

    const centerX = (this.x + this.width) / 2;
    const centerY = (this.y + this.height) / 2;

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(0.4);
    this.context.drawImage(
      this.asteroidSprite.img,
      0,
      0,
      150,
      150,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.context.translate(this.x, this.y);
    this.context.restore();
  }
}
