export class Drawer {
  constructor() {
    this.canvas = document.getElementById("game-screen");
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.context = this.canvas.getContext("2d");
  }

  draw(element) {
    this.context.drawImage(
      element.sprite.img,
      element.sprite.frameStartX,
      element.sprite.frameStartY,
      element.sprite.frameFinalX,
      element.sprite.frameFinalY,
      element.position.x,
      element.position.y,
      element.width,
      element.height
    );
  }

  rotateAndDraw(element, angle) {
    this.context.save();

    this.context.translate(
      element.position.x + element.width / 2,
      element.position.y + element.height / 2
    );

    this.context.rotate(angle);

    this.context.drawImage(
      element.sprite.img,
      element.sprite.frameStartX,
      element.sprite.frameStartY,
      element.sprite.frameFinalX,
      element.sprite.frameFinalY,
      -element.width / 2,
      -element.height / 2,
      element.width,
      element.height
    );

    this.context.restore();
  }

  drawRect(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  strokeRect(x, y, width, height, color = "red", lineWidth = 1) {
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.strokeRect(x, y, width, height);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export const drawer = new Drawer();
