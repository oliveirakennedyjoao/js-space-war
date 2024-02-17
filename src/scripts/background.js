// import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../main";
import { Sound } from "./sound.js";
import { Sprite } from "./sprite.js";

export class Background {
  background;
  background1;
  bg1Position;
  background2;
  bg2Position;
  bgSound;

  constructor(context) {
    this.context = context;
    this.background = new Sprite("./src/assets/sprites/bkgd_0.png");
    this.background1 = new Sprite("./src/assets/sprites/bkgd_1.png");
    this.background2 = new Sprite("./src/assets/sprites/bkgd_2.png");
    this.bg1Position = { x: 0, y: 0, velocityX: 0, velocityY: 1 };
    this.bg2Position = { x: 0, y: 0, velocityX: 0, velocityY: 2 };
    this.bgSound = new Sound("./src/assets/sounds/Fly.mp3");
    // this.#bgSound.play();
  }

  render() {
    this.#renderStaticBackground();
    this.#renderBackground1();
    this.#renderBackground2();
  }

  update() {
    this.bg1Position.y + this.bg1Position.velocityY >= 2048
      ? (this.bg1Position.y = 0)
      : (this.bg1Position.y += this.bg1Position.velocityY);
    this.bg2Position.y + this.bg2Position.velocityY >= 2048
      ? (this.bg2Position.y = 0)
      : (this.bg2Position.y += this.bg2Position.velocityY);
  }

  #renderStaticBackground() {
    this.context.drawImage(
      this.background.img,
      0,
      0,
      2000,
      2000,
      0,
      0,
      2048,
      2048
    );
  }

  #renderBackground1() {
    this.context.drawImage(
      this.background1.img,
      0,
      0,
      2000,
      2000,
      this.bg1Position.x,
      this.bg1Position.y,
      2048,
      2048
    );

    this.context.drawImage(
      this.background1.img,
      0,
      0,
      2000,
      2000,
      this.bg1Position.x,
      -2048 + this.bg1Position.y,
      2048,
      2048
    );
  }

  #renderBackground2() {
    this.context.drawImage(
      this.background2.img,
      0,
      0,
      2000,
      2000,
      this.bg2Position.x,
      this.bg2Position.y,
      2048,
      2048
    );

    this.context.drawImage(
      this.background2.img,
      0,
      0,
      2000,
      2000,
      this.bg2Position.x,
      -2048 + this.bg2Position.y,
      2048,
      2048
    );
  }
}
