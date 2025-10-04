export class UI {
  constructor(context, player) {
    this.context = context;
    this.player = player;
  }
  render() {
    this.context.font = "64px Arial";
    this.context.fillStyle = "white";
    this.context.fillText(`Life: ${this.player.health}`, 100, 200);
  }
}
