const CANVAS = document.getElementById("game-screen");
const CONTEXT = CANVAS.getContext("2d");

function draw(element) {
  CONTEXT.drawImage(
    element.sprite.img,
    element.sprite.startX,
    element.sprite.startY,
    element.sprite.finalX,
    element.sprite.finalY,
    element.position.x,
    element.position.y,
    element.width,
    element.height
  );
}

function rotateAndDraw(element, angle) {
  CONTEXT.save();

  // Move a origem para o centro do elemento
  CONTEXT.translate(
    element.x + element.width / 2,
    element.y + element.height / 2
  );

  // Aplica a rotação
  CONTEXT.rotate(angle);

  // Desenha a imagem centrada na nova origem (0,0)
  CONTEXT.drawImage(
    element.sprite.img,
    0,
    0,
    150,
    150,
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
