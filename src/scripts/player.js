import { CANVAS_WIDTH } from "../../main.js";
import { GamepadPlayerController } from "./gamepad-player-controller.js";
import { PlayerController } from "./player-controller.js";
import { Sprite } from "./sprite.js";

export class Player {
  constructor(context) {
    this.position = {
      x: 500,
      y: 1550,
    };
    this.context = context;
    // this.playerController = new PlayerController();
    this.playerController = new GamepadPlayerController();
    this.sprite = new Sprite("./src/assets/sprites/player.png");

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

    if (this.playerController.actionsFired.action1) {
      this.playerController.actionsFired.action1 = false;
    }

    if (this.playerController.actionsFired.action2) {
      this.playerController.actionsFired.action2 = false;
    }
  }

  render() {
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
  }
}
