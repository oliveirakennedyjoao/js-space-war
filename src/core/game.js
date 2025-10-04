// Entities

import { Player } from "../gameplay/entities/player.js";
import { Enemy } from "../gameplay/entities/enemy.js";
import { Asteroid } from "../gameplay/entities/asteroid.js";
import { Background } from "../gameplay/background.js";
import { detectCollisions } from "../engine/physics/collision-detector.js";
import { UI } from "../ui/ui.js";
import { renderCollisionBoxes } from "../engine/tools/debug.js";

export class Game {
  constructor(context) {
    this.context = context;
    this.particles = [];
    this.player = new Player(context, this.particles);
    this.background = new Background(context);
    this.enemies = [new Enemy(context, this.player)];
    this.ui = new UI(this.context, this.player);
    this.obstacles = [
      this.generateRandomPositionAsteroid(),
      this.generateRandomPositionAsteroid(),
      this.generateRandomPositionAsteroid(),
      this.generateRandomPositionAsteroid(),
      this.generateRandomPositionAsteroid(),
    ];

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
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].destroy === true) {
        this.obstacles.splice(i, 1);
        this.obstacles.push(this.generateRandomPositionAsteroid());
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  render() {
    this.background.render();
    this.player.render();
    this.obstacles.forEach((obstacle) => obstacle.render());
    this.enemies.forEach((enemy) => {
      if (enemy.hitted) {
        enemy.playDeadAnimation();
      } else {
        enemy.render();
      }
    });

    this.particles.forEach((particle) => particle.render());
    renderCollisionBoxes([this.player, ...this.enemies]);
    this.ui.render();
  }

  update() {
    this.background.update();
    this.player.update();
    this.obstacles.forEach((obstacle) => obstacle.update());
    this.enemies.forEach((enemy) => {
      if (enemy.hitted) {
        enemy.explosionAnimation.update();
      } else {
        enemy.update();
      }
    });

    this.particles.forEach((particle) => particle.update());
    detectCollisions(
      [this.player, ...this.enemies, ...this.particles, ...this.obstacles],
      (element1, element2) => {
        // Lógica de colisão específica

        if (element1.type === "player") {
          if (element2.type === "enemy") {
            return;
          }

          if (element2.type === "asteroid") {
            element1.health -= 1;
            element2.destroy = true;
            return;
          }
        }

        if (element1.type === "enemy") {
          if (element2.type === "shoot") {
            element1.hitted = true;
            element2.destroy = true;
            return;
          }
        }

        if (element1.type === "shoot") {
          if (element2.type === "asteroid") {
            element1.destroy = true;
            element2.destroy = true;

            return;
          }
        }
      }
    );
  }

  generateRandomPositionAsteroid() {
    const randomX = Math.floor(Math.random() * 2048);
    return new Asteroid(randomX, -100);
  }
}
