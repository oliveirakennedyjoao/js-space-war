export class Animation {
  constructor(image, frames) {
    this.image = image;
    this.frames = frames;
    this.totalFrames = this.frames.length;
    this.currentFrame = 0;
    this.frameDelay = 50;
    this.frameDelayCounter = 0;
  }

  update() {
    this.frameDelayCounter += 1;

    if (this.frameDelayCounter >= this.frameDelay) {
      this.frameDelayCounter = 0;
      this.nextFrame();
    }
  }

  nextFrame() {
    this.currentFrame + 1 >= this.totalFrames
      ? (this.currentFrame = 0)
      : this.currentFrame++;
  }
}
