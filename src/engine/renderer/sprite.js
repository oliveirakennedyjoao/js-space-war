import { Frame } from "./frame.js";

export class Sprite extends Frame {
  constructor(imageUrl, { startX, startY, finalX, finalY } = {}) {
    super(startX, startY, finalX, finalY);
    this.img = new Image();
    this.img.src = imageUrl;
    this.img.onload = () => console.log("imageLoad success");
    this.startX = startX || 0;
    this.startY = startY || 0;
    this.finalX = finalX || this.img.width;
    this.finalY = finalY || this.img.height;
  }
}
