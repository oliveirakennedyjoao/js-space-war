export class Particle {
  constructor(width, height, posX, posY, context, particle_image) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.context = context;

    this.particle_image = particle_image;
  }

  update() {

  }

  render() {
    this.context.drawImage(
      this.particle_image,
      0,
      0,
      this.width,
      this.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
