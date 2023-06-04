import { Sprite } from "./sprite.js";

export class Enemy {
  #context;
  #sprite;
  #position;
  #direction;

  constructor(context) {
    this.#context = context;
    this.#sprite = new Sprite("./src/assets/sprites/enemy.png");
    this.#position = {
      x: 300,
      y: 400,
      velocityX: 5,
      velocityY: 0.5,
    };
    this.#direction = 1;
  }

  update() {
    if (this.#direction === 1) {
      this.#position.x + 150 + this.#position.velocityX >= 2048
        ? this.#invertDirection()
        : (this.#position.x += this.#position.velocityX);
    } else {
      this.#position.x + this.#position.velocityX <= 0
        ? this.#invertDirection()
        : (this.#position.x -= this.#position.velocityX);
    }
  }

  render() {
    this.#context.drawImage(
      this.#sprite.img,
      0,
      0,
      820,
      918,
      this.#position.x,
      this.#position.y,
      250,
      350
    );
  }

  #invertDirection() {
    this.#direction *= -1;
  }
}
