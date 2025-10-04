export default class Drawer {
  constructor() {}

  rotate(element, angle) {
    element.context.save();

    // Move a origem para o centro do elemento
    element.context.translate(
      element.x + element.width / 2,
      element.y + element.height / 2
    );

    // Aplica a rotação
    element.context.rotate(angle);

    // Desenha a imagem centrada na nova origem (0,0)
    element.context.drawImage(
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

    element.context.restore();
  }
}

export function draw(element) {
  const canvas = document.getElementById("game-screen");
  const context = canvas.getContext("2d");

  console.log("Draw function called for:", { element, context });

  context.drawImage(
    element.sprite.img,
    0,
    0,
    1000,
    1000,
    element.position.x,
    element.position.y,
    element.width,
    element.height
  );
}
