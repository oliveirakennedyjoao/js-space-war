export class Sound {
  constructor(audioFileUrl, loop = true, volume = 0.1) {
    this.sound = new Audio();
    this.sound.src = audioFileUrl;
    this.sound.loop = loop;
    this.sound.volume = volume;
  }

  play() {
    if(!this.sound.paused) {
      this.sound.currentTime = 0;
      return;
    }
    this.sound.play();
  }
}
