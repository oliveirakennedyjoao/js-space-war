export class UI {
  constructor(context) {
    this.context = context;
  }
  render() {
    this.context.font = "64px Arial";
    this.context.fillStyle = "white";
    this.context.fillText("IIII", 100, 200);
  }
}
