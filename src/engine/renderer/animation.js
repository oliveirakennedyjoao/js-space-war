export const ANIMATION_STATE = {
  PLAYING: 1,
  FINISHED: 2,
};

export class Animation {
  constructor(sprites, frameDelay, isLoop, onAnimationEnd) {
    this.frames = sprites;
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

  getCurrentFrame() {
    return this.frames[this.currentFrame];
  }
}
