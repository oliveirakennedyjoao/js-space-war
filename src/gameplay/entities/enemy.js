import { Frame } from "../../engine/renderer/frame.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { Animation } from "../../engine/renderer/animation.js";
import { Sound } from "../../engine/audio/sound.js";
import { sinusoidalMovement } from "../../engine/physics/movement-controller.js";
import { drawer } from "../../core/drawer.js";
import { assetManager } from "../../core/asset-manager.js";
export class Enemy {
  constructor(sprite, player) {
    this.type = "enemy";
    this.player = player;
    this.sprite = sprite;
    this.explosion = new Sprite(assetManager.getImage("explosion"));
    this.width = 175;
    this.height = 200;
    this.position = this.generateOriginPosition();
    this.velocity = this.generateVelocity();
    this.velocity;

    this.direction = 1;
    this.hitted = false;
    this.destroy = false;
    this.explosionAnimation = new Animation(
      [
        new Sprite(assetManager.getImage("explosion"), {
          startX: 0,
          startY: 0,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 64,
          startY: 0,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 128,
          startY: 0,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 192,
          startY: 0,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 0,
          startY: 64,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 64,
          startY: 64,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 128,
          startY: 64,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 192,
          startY: 64,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 0,
          startY: 128,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 64,
          startY: 128,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 128,
          startY: 128,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 192,
          startY: 128,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 0,
          startY: 192,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 64,
          startY: 192,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 128,
          startY: 192,
          finalX: 64,
          finalY: 64,
        }),
        new Sprite(assetManager.getImage("explosion"), {
          startX: 192,
          startY: 192,
          finalX: 64,
          finalY: 64,
        }),
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
    if (this.hitted) {
      this.explosionAnimation.update();
      this.playDeadAnimation();
      return;
    }

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
    drawer.draw(this);
  }

  playDeadAnimation() {
    if (this.canPlayDeathSound) {
      this.deathSound.play();
      this.canPlayDeathSound = false;
    }

    drawer.draw({
      sprite: this.explosionAnimation.getCurrentFrame(),
      position: { x: this.position.x, y: this.position.y },
      width: 128,
      height: 128,
    });
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
