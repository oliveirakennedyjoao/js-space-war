export class Sprite {
  constructor(imageUrl) {
    this.img = new Image();
    this.img.src = imageUrl;
    this.img.onload = () => console.log("imageLoad success");
  }
}
