export class Sound {
  constructor(audioFileUrl) {
    this.sound = new Audio();
    this.sound.src = audioFileUrl;
    this.sound.loop = true;
    this.sound.volume = 0.2;
    this.sound.play();
  }
}
