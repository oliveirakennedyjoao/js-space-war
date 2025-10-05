// Entities

import { Player } from "../gameplay/entities/player.js";
import { Enemy } from "../gameplay/entities/enemy.js";
import { GreenEnemy } from "../gameplay/entities/green-enemy.js";
import { GoldenEnemy } from "../gameplay/entities/golden-enemy.js";
import { Asteroid } from "../gameplay/entities/asteroid.js";
import { Background } from "../gameplay/background.js";
import { detectCollisions } from "../engine/physics/collision-detector.js";
import { UI } from "../ui/ui.js";
import { renderCollisionBoxes } from "../engine/tools/debug.js";
import { Sprite } from "../engine/renderer/sprite.js";

const PLAYER_SPRITE = new Sprite("./src/assets/sprites/player.png", {
  startX: 0,
  startY: 0,
  finalX: 1000,
  finalY: 1000,
});

const ASTEROID_SPRITE = new Sprite("./src/assets/sprites/asteroid.png");
const SHOOT_SPRITE = new Sprite("./src/assets/sprites/laser_green.png", {
  startX: 0,
  startY: 0,
  finalX: 9,
  finalY: 33,
});

const GOLDEN_ENEMY_SPRITE = new Sprite(
  "./src/assets/sprites/enemy_golden.png",
  {
    startX: 0,
    startY: 0,
    finalX: 472,
    finalY: 529,
  }
);

const GREEN_ENEMY_SPRITE = new Sprite("./src/assets/sprites/enemy_green.png", {
  startX: 0,
  startY: 0,
  finalX: 472,
  finalY: 529,
});

const ENEMY_SPRITE = new Sprite("./src/assets/sprites/enemy.png", {
  startX: 0,
  startY: 0,
  finalX: 472,
  finalY: 529,
});
export class Game {
  constructor(context) {
    this.context = context;
    this.particles = [];
    this.player = new Player(
      context,
      this.particles,
      PLAYER_SPRITE,
      SHOOT_SPRITE
    );
    this.background = new Background(context);
    this.enemies = [
      this.pickRandomEnemy(),
      this.pickRandomEnemy(),
      this.pickRandomEnemy(),
    ];

    this.ui = new UI(this.context, this.player);
    this.obstacles = [
      new Asteroid(ASTEROID_SPRITE),
      new Asteroid(ASTEROID_SPRITE),
      new Asteroid(ASTEROID_SPRITE),
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
        this.enemies.push(this.pickRandomEnemy());
      }
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].destroy === true) {
        this.obstacles.splice(i, 1);
        this.obstacles.push(new Asteroid(ASTEROID_SPRITE));
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
    // renderCollisionBoxes([this.player, ...this.enemies, ...this.obstacles]);
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
    console.log(rand);
    switch (rand) {
      case 0:
        return new GreenEnemy(GREEN_ENEMY_SPRITE, this.context, this.player);
      case 1:
        return new GoldenEnemy(GOLDEN_ENEMY_SPRITE, this.context, this.player);
      case 2:
        return new Enemy(ENEMY_SPRITE, this.context, this.player);
      default:
        return new Enemy(ENEMY_SPRITE, this.context, this.player);
    }
  }
}
