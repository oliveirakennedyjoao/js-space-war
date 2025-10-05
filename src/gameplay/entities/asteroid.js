import { followTargetMovement } from "../../engine/physics/movement-controller.js";
import { drawer } from "../../core/drawer.js";
export class Asteroid {
  constructor(sprite) {
    this.type = "asteroid";
    this.sprite = sprite;
    this.position = this.generateOriginPosition();
    this.velocity = this.generateVelocity();
    this.width = 155;
    this.height = 150;
    this.destroy = false;

    this.angle = 0;
    this.rotationSpeed = 2;

    this.move = followTargetMovement;
    this.destination = {
      position: this.generateDestinationPosition(this.position),
    };
  }

  update() {
    this.move(this, this.destination, this.velocity.y, DELTA_TIME);
    this.angle += this.rotationSpeed * DELTA_TIME;

    if (this.position.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    drawer.rotateAndDraw(this, this.angle);
  }

  generateOriginPosition() {
    const x = Math.floor(Math.random() * CANVAS_WIDTH);
    const y = -100;
    return { x, y };
  }

  generateDestinationPosition(originPosition) {
    let x, y;
    originPosition.x < CANVAS_WIDTH / 2
      ? ((x = Math.random() * CANVAS_WIDTH + CANVAS_WIDTH),
        (y = Math.random() * CANVAS_HEIGHT + CANVAS_HEIGHT))
      : ((x = Math.random() * -CANVAS_WIDTH),
        (y = Math.random() * CANVAS_HEIGHT + CANVAS_HEIGHT));

    return { x, y };
  }

  generateVelocity() {
    const y = Math.floor(Math.random() * 300 + 200);
    return { x: 0, y };
  }
}
