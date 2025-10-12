export class ObstaclesManager {
  constructor(obstacles) {
    this.obstacles = obstacles;
  }

  update() {
    this.obstacles.forEach((obstacle) => obstacle.update());
  }

  render() {
    this.obstacles.forEach((obstacle) => obstacle.render());
  }
}
