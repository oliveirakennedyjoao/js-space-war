export class Sprite {
  constructor(image, { startX, startY, finalX, finalY } = {}) {
    if (typeof image === "string") {
      this.img = new Image();
      this.img.src = imageUrl;
    } else if (image instanceof Image) {
      this.img = image;
    } else {
      throw new Error(
        "Invalid image parameter. Must be a string URL or an Image object."
      );
    }

    this.frameStartX = startX || 0;
    this.frameStartY = startY || 0;
    this.frameFinalX = finalX || this.img.width;
    this.frameFinalY = finalY || this.img.height;
  }
}
