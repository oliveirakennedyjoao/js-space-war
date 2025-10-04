export class Virtual {
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
    this.setupPreventScrollOnTouch();
    this.setupTouchListeners();
  }

  setupTouchListeners() {
    document.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("touchstart", (ev) => this.onVirtualKeyPressed(ev));
      btn.addEventListener("touchend", (ev) => this.onVirtualKeyReleased(ev));
      btn.addEventListener("dblclick", function (e) {
        e.preventDefault();
      });
    });
  }

  setupPreventScrollOnTouch() {
    const preventCallback = (event) => {
      event.preventDefault();
    };
    document.body.addEventListener("touchstart", preventCallback, {
      passive: false,
    });
    document.body.addEventListener("touchmove", preventCallback, {
      passive: false,
    });
    document.body.addEventListener("touchend", preventCallback, {
      passive: false,
    });
  }

  getKeysPressed() {
    return this.keysPressed;
  }

  onKeyPressed(event) {
    switch (event.target.id) {
      case "move-right":
        this.keysPressed.right = true;
        break;
      case "move-left":
        this.keysPressed.left = true;
        break;
      case "move-up":
        this.keysPressed.up = true;
        break;
      case "move-down":
        this.keysPressed.down = true;
        break;
      case "fire":
        if (this.canRepeat) {
          this.actionsPressed.action1 = true;
          this.canRepeat = false;
        }
        break;
    }
  }

  onKeyReleased(event) {
    switch (event.target.id) {
      case "move-right":
        this.keysPressed.right = false;
        break;
      case "move-left":
        this.keysPressed.left = false;
        break;
      case "move-up":
        this.keysPressed.up = false;
        break;
      case "move-down":
        this.keysPressed.down = false;
        break;
      case "fire":
        if (!this.canRepeat) {
          this.canRepeat = true;
        }
        break;
    }
  }
}
