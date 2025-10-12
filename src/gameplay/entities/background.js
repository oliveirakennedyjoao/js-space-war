import { Sound } from "../../engine/audio/sound.js";
import { Sprite } from "../../engine/renderer/sprite.js";
import { drawer } from "../../core/drawer.js";
import { assetManager } from "../../core/asset-manager.js";

export class Background {
  constructor() {
    this.layer0 = {
      sprite: new Sprite(assetManager.getImage("bkgd_0"), {
        startX: 0,
        startY: 0,
        finalX: 2000,
        finalY: 2000,
      }),
      position: { x: 0, y: 0 },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    };
    this.layer1 = {
      sprite: new Sprite(assetManager.getImage("bkgd_1"), {
        startX: 0,
        startY: 0,
        finalX: 2000,
        finalY: 2000,
      }),
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 1 },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    };
    this.layer1_copy = {
      sprite: new Sprite(assetManager.getImage("bkgd_1"), {
        startX: 0,
        startY: 0,
        finalX: 2000,
        finalY: 2000,
      }),
      position: { x: 0, y: -CANVAS_HEIGHT },
      velocity: { x: 0, y: 1 },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    };
    this.layer2 = {
      sprite: new Sprite(assetManager.getImage("bkgd_2"), {
        startX: 0,
        startY: 0,
        finalX: 2000,
        finalY: 2000,
      }),
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 1 },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    };
    this.layer2_copy = {
      sprite: new Sprite(assetManager.getImage("bkgd_2"), {
        startX: 0,
        startY: 0,
        finalX: 2000,
        finalY: 2000,
      }),
      position: { x: 0, y: -CANVAS_HEIGHT },
      velocity: { x: 0, y: 1 },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    };

    this.bgSound = new Sound("./src/assets/sounds/Fly.mp3");
    this.bgSound.play();
  }

  render() {
    drawer.draw(this.layer0);
    drawer.draw(this.layer1);
    drawer.draw(this.layer1_copy);
    drawer.draw(this.layer2);
    drawer.draw(this.layer2_copy);
  }

  updateLayerPositions(element) {
    if (element.position.y < 0) {
      element.position.y + element.velocity.y >= 0
        ? (element.position.y = -CANVAS_HEIGHT)
        : (element.position.y += element.velocity.y);
    } else {
      element.position.y + element.velocity.y >= 2048
        ? (element.position.y = 0)
        : (element.position.y += element.velocity.y);
    }
  }

  update() {
    this.updateLayerPositions(this.layer1);
    this.updateLayerPositions(this.layer1_copy);
    this.updateLayerPositions(this.layer2);
    this.updateLayerPositions(this.layer2_copy);
  }
}
