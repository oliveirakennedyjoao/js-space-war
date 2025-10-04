import { Sprite } from "../../engine/renderer/sprite.js";
import { linearMovement } from "../../engine/physics/movement-controller.js";
export class Asteroid {
  constructor(x, y) {
    this.type = "asteroid";
    this.sprite = new Sprite("./src/assets/sprites/asteroid.png");
    this.position = { x: x, y: y };
    this.velocity = { x: 0, y: 200 };
    this.width = 155;
    this.height = 150;
    this.destroy = false;

    // Propriedades de rotação
    this.angle = 0; // Ângulo atual
    this.rotationSpeed = 2; // Velocidade de rotação (radianos por segundo)
  }

  update() {
    linearMovement(this, this.velocity.x, this.velocity.y, DELTA_TIME);
    this.angle += this.rotationSpeed * DELTA_TIME;

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    rotateAndDraw(this, this.angle);
  }
}
