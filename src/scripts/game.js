import { Player } from "./player.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../main.js";
import { Background } from "./background.js";
import { Enemy } from "./enemy.js";
import { CollisionDetector } from "./collision-detector.js";
import { UI } from "./ui.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.particles = [];
    this.player = new Player(context, this.particles);
    this.background = new Background(context);
    this.enemy = new Enemy(context);
    this.ui = new UI(context);
    this.collisionDetector = new CollisionDetector(
      this.player,
      this.particles,
      [this.enemy],
      this.context
    );
  }

  destroy() {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].destroy === true) {
        this.particles.splice(i, 1);
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  render() {
    this.background.render();
    this.player.render();

    if (this.enemy.destroy) {
      this.enemy.playDeadAnimation();
    } else {
      this.enemy.render();
    }

    this.particles.forEach((particle) => particle.render());
    this.collisionDetector.renderCollisionBoxes();
    this.ui.render();
  }

  update() {
    this.background.update();
    // this.player.playerController.update();
    this.player.update();

    if (this.enemy.destroy) {
      this.enemy.explosionAnimation.update();
    } else {
      this.enemy.update();
    }

    this.particles.forEach((particle) => particle.update());
    this.collisionDetector.detect();
  }
}
