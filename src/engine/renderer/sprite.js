export class Sprite {
  constructor(imageUrl, { startX, startY, finalX, finalY } = {}) {
    this.img = new Image();
    this.img.src = imageUrl;
    this.frameStartX = startX || 0;
    this.frameStartY = startY || 0;
    this.frameFinalX = finalX || this.img.width;
    this.frameFinalY = finalY || this.img.height;
  }
}
