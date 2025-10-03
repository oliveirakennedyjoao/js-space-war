import { KeyboardController } from "../engine/input/keyboard.js";
import { Shoot } from "./shoot.js";
import { Sprite } from "../engine/renderer/sprite.js";
import { Sound } from "../engine/audio/sound.js";

export class Player {
  constructor(context, particles) {
    this.position = {
      x: 500,
      y: 1550,
    };
    this.context = context;
    this.playerController = new KeyboardController();
    this.sprite = new Sprite("./src/assets/sprites/player.png");
    this.laser = new Sprite("./src/assets/sprites/laser_green.png");

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

    console.log("PlayerController");

    this.particles = particles;

    this.PLAYER_WIDTH = 180;
    this.PLAYER_HEIGHT = 225;
  }

  update() {
    if (this.playerController.keysPressed.left && this.position.x > 0) {
      this.position.x -= 10;
      return;
    }

    if (
      this.playerController.keysPressed.right &&
      this.position.x < CANVAS_WIDTH - this.PLAYER_WIDTH
    ) {
      this.position.x += 10;
      return;
    }
  }

  shoot() {
    // width, height, posX, posY, context, particle_image
    this.particles.push(
      new Shoot(
        this.PLAYER_WIDTH,
        33,
        this.position.x,
        this.position.y,
        this.context,
        this.laser
      )
    );
    this.laserSound.play();
  }

  render() {
    this.context.drawImage(
      this.sprite.img,
      0,
      0,
      1000,
      1000,
      this.position.x,
      this.position.y,
      this.PLAYER_WIDTH,
      this.PLAYER_HEIGHT
    );

    if (this.playerController.actionsPressed.action1) {
      this.shoot();
      this.playerController.actionsPressed.action1 = false;
    }
  }
}
