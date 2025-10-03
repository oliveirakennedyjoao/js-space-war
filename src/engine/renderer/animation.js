export const ANIMATION_STATE = {
  PLAYING: 1,
  FINISHED: 2,
};

export class Animation {
  constructor(image, frames, frameDelay, isLoop, onAnimationEnd) {
    this.image = image;
    this.frames = frames;
    this.totalFrames = this.frames.length;
    this.currentFrame = 0;
    this.frameDelay = frameDelay;
    this.frameDelayCounter = 0;
    this.isLoop = isLoop;
    this.destroy = false;
    this.onAnimationEnd = onAnimationEnd;
  }

  update() {
    this.frameDelayCounter += 1;

    if (this.frameDelayCounter >= this.frameDelay) {
      this.frameDelayCounter = 0;
      this.nextFrame();
    }
  }

  nextFrame() {
    if (this.currentFrame + 1 >= this.totalFrames) {
      if (this.isLoop) {
        this.currentFrame = 0;
      } else {
        this.onAnimationEnd();
      }
    } else {
      this.currentFrame++;
    }
  }
}
