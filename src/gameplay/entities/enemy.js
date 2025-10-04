import { Frame } from "../../engine/renderer/frame.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { Animation } from "../../engine/renderer/animation.js";
import { Sound } from "../../engine/audio/sound.js";
import { sinusoidalMovement } from "../../engine/physics/movement-controller.js";

export class Enemy {
  constructor(sprite, context, player) {
    this.type = "enemy";
    this.context = context;
    this.player = player;
    this.sprite = sprite;
    this.explosion = new Sprite("./src/assets/spritesheets/explosion.png");
    this.width = 175;
    this.height = 200;
    this.position = this.generateOriginPosition();
    this.velocity = this.generateVelocity();
    this.velocity;

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

    this.deathSound = new Sound("./src/assets/sounds/explosion.wav", false);
    this.canPlayDeathSound = true;
    this.move = sinusoidalMovement;
  }

  update() {
    this.move(this, this.velocity.y * 0.2, 5, 50, DELTA_TIME);

    this.position.x = Math.max(
      0,
      Math.min(CANVAS_WIDTH - this.width, this.position.x)
    );

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    draw(this);
  }

  playDeadAnimation() {
    const { startX, startY, finalX, finalY } =
      this.explosionAnimation.frames[this.explosionAnimation.currentFrame];

    if (this.canPlayDeathSound) {
      this.deathSound.play();
      this.canPlayDeathSound = false;
    }

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

  generateOriginPosition() {
    const x = Math.floor(Math.random() * CANVAS_WIDTH);
    const y = -100;
    return { x, y };
  }

  generateVelocity() {
    const x = Math.floor(Math.random() * 100 - 50);
    const y = Math.floor(Math.random() * 300 + 200);
    return { x, y };
  }
}
