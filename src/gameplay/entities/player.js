import { Keyboard } from "../../engine/input/keyboard.js";
import { Shoot } from "../projectiles/shoot.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { Sound } from "../../engine/audio/sound.js";

export class Player {
  constructor(context, particles, sprite, shootSprite) {
    this.type = "player";
    this.position = {
      x: 500,
      y: 1550,
      velocityX: 0,
      velocityY: 0,
      angle: 0,
    };
    this.width = 180;
    this.height = 225;
    this.context = context;
    this.playerController = new Keyboard();
    this.sprite = sprite;
    this.laser = shootSprite;

    this.laserSound = new Sound(
      "./src/assets/sounds/laser_shooting_sfx.wav",
      false
    );

    this.spaceShipSound = new Sound(
      "./src/assets/sounds/spaceship.mp3",
      true,
      0.7
    );
    this.spaceShipSound.play();

    this.particles = particles;
    this.health = 5;
  }

  update() {
    if (this.playerController.keysPressed.left && this.position.x > 0) {
      this.position.x -= 10;
      return;
    }

    if (
      this.playerController.keysPressed.right &&
      this.position.x < CANVAS_WIDTH - this.width
    ) {
      this.position.x += 10;
      return;
    }
  }

  shoot() {
    this.particles.push(
      new Shoot(
        this.laser,
        this.position.x + this.width / 2 - 4,
        this.position.y
      )
    );
    this.laserSound.play();
  }

  render() {
    draw(this);

    if (this.playerController.actionsPressed.action1) {
      this.shoot();
      this.playerController.actionsPressed.action1 = false;
    }
  }
}
