import { Player } from "./player.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../main.js";
import { Background } from "./background.js";
import { Enemy } from "./enemy.js";
import { CollisionDetector } from "./collision-detector.js";
import { UI } from "./ui.js";
import { Sprite } from "./sprite.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.particles = [];
    this.player = new Player(context, this.particles);
    this.background = new Background(context);
    this.enemies = [new Enemy(context)];
    this.ui = new UI(context);
    this.collisionDetector = new CollisionDetector(
      this.player,
      this.particles,
      this.enemies,
      this.context
    );

    this.elements = [];
  }

  destroy() {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].destroy === true) {
        this.particles.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].destroy === true) {
        this.enemies.splice(i, 1);
        this.enemies.push(new Enemy(this.context));
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  render() {
    this.background.render();
    this.player.render();

    this.enemies.forEach((enemy) => {
      if (enemy.hitted) {
        enemy.playDeadAnimation();
      } else {
        enemy.render();
      }
    });

    this.particles.forEach((particle) => particle.render());
    this.collisionDetector.renderCollisionBoxes();
    this.ui.render();
  }

  update() {
    this.background.update();
    // this.player.playerController.update();
    this.player.update();

    this.enemies.forEach((enemy) => {
      if (enemy.hitted) {
        enemy.explosionAnimation.update();
      } else {
        enemy.update();
      }
    });

    this.particles.forEach((particle) => particle.update());
    this.collisionDetector.detect();
  }
}
