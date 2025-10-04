const CANVAS = document.getElementById("game-screen");
const CONTEXT = CANVAS.getContext("2d");

function draw(element) {
  CONTEXT.drawImage(
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

function rotateAndDraw(element, angle) {
  CONTEXT.save();

  CONTEXT.translate(
    element.x + element.width / 2,
    element.y + element.height / 2
  );

  CONTEXT.rotate(angle);

  CONTEXT.drawImage(
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

  CONTEXT.restore();
}

function drawRect(x, y, width, height, color) {
  CONTEXT.fillStyle = color;
  CONTEXT.fillRect(x, y, width, height);
}

function clear() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
}
