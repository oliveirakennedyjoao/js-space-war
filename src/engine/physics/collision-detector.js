export class CollisionDetector {
  constructor(player, player_shoots, enemies, context) {
    this.player = player;
    this.player_shoots = player_shoots;
    this.enemies = enemies;
    this.context = context;
  }

  detect() {
    this.player_shoots.forEach((shoot) => {
      this.enemies.forEach((enemy) => {
        if (this.isColliding(shoot, enemy)) {
          shoot.destroy = true;
          enemy.hitted = true;
        }
      });
    });
  }

  isColliding(shoot, enemy) {
    return (
      shoot.posX < enemy.position.x + enemy.width &&
      shoot.posX + shoot.width > enemy.position.x &&
      shoot.posY < enemy.position.y + enemy.height &&
      shoot.posY + shoot.height > enemy.position.y
    );
  }

  renderCollisionBoxes() {
    this.context.lineWidth = 3;

    // draw player collision box
    this.context.strokeStyle = "green";
    this.context.strokeRect(
      this.player.position.x + 1,
      this.player.position.y + 1,
      this.player.width + 1,
      this.player.height + 1
    );

    // draw enemies collision box
    this.context.strokeStyle = "red";
    this.enemies.forEach((enemy) =>
      this.context.strokeRect(
        enemy.position.x - 2,
        enemy.position.y - 2,
        enemy.width + 2,
        enemy.height + 2
      )
    );
  }

  renderCollisionBoxesParams(elements) {
    this.context.strokeStyle = "yellow";
    elements.forEach((element) =>
      this.context.strokeRect(
        element.x - 2,
        element.y - 2,
        element.width + 2,
        element.height + 2
      )
    );
  }
}
