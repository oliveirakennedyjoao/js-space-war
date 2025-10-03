import { Particle } from "../../engine/physics/particle.js";

export class Shoot extends Particle {
  constructor(width, height, posX, posY, context, particle_image) {
    super(width, height, posX, posY, context, particle_image);
    this.destroy = false;
  }

  update() {
    this.posY -= 1500 * DELTA_TIME;

    if (this.posY < 0) {
      this.destroy = true;
    }
  }

  drawParticle(posX, posY) {
    this.context.drawImage(
      this.particle_image.img,
      0,
      0,
      9,
      33,
      posX,
      posY,
      9,
      33
    );
  }

  render() {
    this.drawParticle(this.posX, this.posY);
    this.drawParticle(this.posX + 90, this.posY);
    this.drawParticle(this.posX + 171, this.posY);
  }
}
