import Drawer from "../../engine/renderer/drawer.js";
import { Sprite } from "../../engine/renderer/sprite.js";

export class Asteroid {
  constructor(context, x, y) {
    this.sprite = new Sprite("./src/assets/sprites/asteroid.png");
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = 155;
    this.height = 150;
    this.velocityY = 200;
    this.destroy = false;
    this.drawer = new Drawer();

    // Propriedades de rotação
    this.angle = 0; // Ângulo atual
    this.rotationSpeed = 2; // Velocidade de rotação (radianos por segundo)
  }

  update() {
    // Movimento vertical
    this.y += this.velocityY * DELTA_TIME;

    // Atualiza a rotação
    this.angle += this.rotationSpeed * DELTA_TIME;

    if (this.y > CANVAS_HEIGHT) {
      this.destroy = true;
    }
  }

  render() {
    const centerX = (this.x + this.width) / 2;
    const centerY = (this.y + this.height) / 2;
    this.drawer.rotate(this, this.angle); // Usa o ângulo dinâmico
    // this.context.save();
    // this.context.translate(centerX, centerY);
    // this.context.rotate(0.4);
    // this.context.drawImage(
    //   this.asteroidSprite.img,
    //   0,
    //   0,
    //   150,
    //   150,
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // );
    // this.context.translate(this.x, this.y);
    // this.context.restore();
  }
}
