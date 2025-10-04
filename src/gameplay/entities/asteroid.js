import { Sprite } from "../../engine/renderer/sprite.js";

export class Asteroid {
  constructor(context, x, y) {
    this.sprite = new Sprite("./src/assets/sprites/asteroid.png");
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = 155;
    this.height = 150;
    this.velocityY = 200;
    this.destroy = false;

    // Propriedades de rotação
    this.angle = 0; // Ângulo atual
    this.rotationSpeed = 2; // Velocidade de rotação (radianos por segundo)
  }

  update() {
    // Movimento vertical
    this.y += this.velocityY * DELTA_TIME;

    // Atualiza a rotação
    this.angle += this.rotationSpeed * DELTA_TIME;

    if (this.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    rotateAndDraw(this, this.angle);
  }
}
