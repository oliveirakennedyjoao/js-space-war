import { Frame } from "./frame.js";
import { Sprite } from "./sprite.js";
import { Animation } from "./animation.js";

export class Enemy {
  constructor(context) {
    this.context = context;
    this.sprite = new Sprite("./src/assets/sprites/enemy.png");
    this.explosion = new Sprite("./src/assets/spritesheets/explosion.png");
    this.width = 150;
    this.height = 200;
    this.position = {
      x: 300,
      y: -100,
      velocityX: 5,
      velocityY: 2,
    };
    this.direction = 1;
    this.hitted = false;
    this.destroy = false;

    this.explosionAnimation = new Animation(
      this.explosion,
      [
        new Frame(0, 0, 64, 64),
        new Frame(64, 0, 64, 64),
        new Frame(128, 0, 64, 64),
        new Frame(192, 0, 64, 64),
        new Frame(0, 64, 64, 64),
        new Frame(64, 64, 64, 64),
        new Frame(128, 64, 64, 64),
        new Frame(192, 64, 64, 64),
        new Frame(0, 128, 64, 64),
        new Frame(64, 128, 64, 64),
        new Frame(128, 128, 64, 64),
        new Frame(192, 128, 64, 64),
        new Frame(0, 192, 64, 64),
        new Frame(64, 192, 64, 64),
        new Frame(128, 192, 64, 64),
        new Frame(192, 192, 64, 64),
      ],
      2,
      false,
      this.onDeadAnimationEnd.bind(this)
    );
  }

  update() {
    if (this.position.y < 400) {
      this.position.y += this.position.velocityY;
    }

    if (this.direction === 1) {
      this.position.x + 150 + this.position.velocityX >= 2048
        ? this.invertDirection()
        : (this.position.x += this.position.velocityX);
    } else {
      this.position.x + this.position.velocityX <= 0
        ? this.invertDirection()
        : (this.position.x -= this.position.velocityX);
    }
  }

  render() {
    this.context.drawImage(
      this.sprite.img,
      0,
      0,
      820,
      918,
      this.position.x,
      this.position.y,
      250,
      350
    );
  }

  invertDirection() {
    this.direction *= -1;
  }

  playDeadAnimation() {
    const { startX, startY, finalX, finalY } =
      this.explosionAnimation.frames[this.explosionAnimation.currentFrame];

    this.context.drawImage(
      this.explosion.img,
      startX,
      startY,
      finalX,
      finalY,
      this.position.x,
      this.position.y,
      192,
      192
    );
  }

  onDeadAnimationEnd() {
    this.destroy = true;
  }
}
