export class KeyboardController {
  constructor() {
    this.keysPressed = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    this.actionsPressed = {
      action1: false, // shoot
      action2: false, // dodge
    };

    this.fireAction1 = false;
    this.canRepeat = true;

    this.start();
  }

  start() {
    document.addEventListener("keydown", (ev) => this.onKeyPressed(ev));
    document.addEventListener("keyup", (ev) => this.onKeyReleased(ev));
  }

  getKeysPressed() {
    return this.keysPressed;
  }

  onKeyPressed(keyPressed) {
    switch (keyPressed.keyCode) {
      case 68:
        this.keysPressed.right = true;
        break;
      case 65:
        this.keysPressed.left = true;
        break;
      case 87:
        this.keysPressed.up = true;
        break;
      case 83:
        this.keysPressed.down = true;
        break;
      case 32:
        if (this.canRepeat) {
          this.actionsPressed.action1 = true;
          this.canRepeat = false;
        }
        break;
    }
  }

  onKeyReleased(keyReleased) {
    switch (keyReleased.keyCode) {
      case 68:
        this.keysPressed.right = false;
        break;
      case 65:
        this.keysPressed.left = false;
        break;
      case 87:
        this.keysPressed.up = false;
        break;
      case 83:
        this.keysPressed.down = false;
        break;
      case 32:
        if (!this.canRepeat) {
          this.canRepeat = true;
        }
        break;
    }
  }
}
