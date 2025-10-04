export class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(position) {
    this.x += position.x;
    this.y += position.y;
    return this;
  }

  distanceTo(position) {
    const dx = this.x - position.x;
    const dy = this.y - position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clone() {
    return new Position(this.x, this.y);
  }
}
