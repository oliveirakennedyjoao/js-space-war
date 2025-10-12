import { Player } from "../gameplay/entities/player.js";
import { Enemy } from "../gameplay/entities/enemy.js";
import { GreenEnemy } from "../gameplay/entities/green-enemy.js";
import { GoldenEnemy } from "../gameplay/entities/golden-enemy.js";
import { Asteroid } from "../gameplay/entities/asteroid.js";
import { Background } from "../gameplay/entities/background.js";
import { detectCollisions } from "../engine/physics/collision-detector.js";
import { UI } from "../ui/ui.js";
import { renderCollisionBoxes } from "../engine/tools/debug.js";
import { Sprite } from "../engine/renderer/sprite.js";
import { assetManager } from "./asset-manager.js";
import { drawer } from "./drawer.js";

export class Game {
  constructor() {
    this.particles = [];
    this.player = new Player(
      this.particles,
      new Sprite(assetManager.getImage("player"), 0, 0, 99, 75),
      new Sprite(assetManager.getImage("laser_green"), 0, 0, 9, 33)
    );
    this.background = new Background();
    this.enemies = [
      this.pickRandomEnemy(),
      this.pickRandomEnemy(),
      this.pickRandomEnemy(),
    ];

    this.ui = new UI(this.player);
    this.obstacles = [
      new Asteroid(
        new Sprite(assetManager.getImage("asteroid"), 0, 0, 128, 128)
      ),
      new Asteroid(
        new Sprite(assetManager.getImage("asteroid"), 0, 0, 128, 128)
      ),
      new Asteroid(
        new Sprite(assetManager.getImage("asteroid"), 0, 0, 128, 128)
      ),
    ];

    this.elements = [];
    this.previousTime = 0;
  }

  start(currentTime = 0) {
    if (!PAUSE_GAME) {
      this.destroy();
      this.update();
      this.clearScreen();
      this.render();

      DELTA_TIME = (currentTime - this.previousTime) / 1000;
      this.previousTime = currentTime;
    }

    window.requestAnimationFrame(this.start.bind(this));
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
        this.enemies.push(this.pickRandomEnemy());
      }
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].destroy === true) {
        this.obstacles.splice(i, 1);
        this.obstacles.push(
          new Asteroid(
            new Sprite(assetManager.getImage("asteroid"), 0, 0, 128, 128)
          )
        );
      }
    }
  }

  clearScreen() {
    drawer.clear();
  }

  render() {
    this.background.render();
    this.player.render();
    this.obstacles.forEach((obstacle) => obstacle.render());
    this.enemies.forEach((enemy) => enemy.render());
    this.particles.forEach((particle) => particle.render());
    if (DEBUG_MODE) {
      renderCollisionBoxes([this.player, ...this.enemies, ...this.obstacles]);
    }

    this.ui.render();
  }

  update() {
    this.background.update();
    this.player.update();
    this.obstacles.forEach((obstacle) => obstacle.update());
    this.enemies.forEach((enemy) => enemy.update());
    this.particles.forEach((particle) => particle.update());
    this.detectEnemyCollisions();
    this.detectPlayerCollisions();
    this.detectObstaclesCollisions();
  }

  detectPlayerCollisions() {
    detectCollisions(
      [this.player],
      [...this.enemies, ...this.obstacles],
      (element1, element2) => {
        if (element2.type === "enemy") {
          return;
        }

        if (element2.type === "asteroid") {
          element1.health -= 1;
          element2.destroy = true;
          return;
        }
      }
    );
  }

  detectEnemyCollisions() {
    detectCollisions(
      [...this.enemies],
      [...this.particles],
      (element1, element2) => {
        element1.hitted = true;
        element2.destroy = true;
        return;
      }
    );
  }

  detectObstaclesCollisions() {
    detectCollisions(
      [...this.obstacles],
      [...this.particles],
      (element1, element2) => {
        element1.destroy = true;
        element2.destroy = true;
        return;
      }
    );
  }

  pickRandomEnemy() {
    const rand = Math.floor(Math.random() * 3);

    switch (rand) {
      case 0:
        return new GreenEnemy(
          new Sprite(assetManager.getImage("enemy_green")),
          this.player
        );
      case 1:
        return new GoldenEnemy(
          new Sprite(assetManager.getImage("enemy_golden")),
          this.player
        );
      case 2:
        return new Enemy(
          new Sprite(assetManager.getImage("enemy")),
          this.player
        );
      default:
        return new Enemy(
          new Sprite(assetManager.getImage("enemy")),
          this.player
        );
    }
  }
}
