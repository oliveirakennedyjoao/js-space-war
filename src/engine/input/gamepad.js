export class Gamepad {
  constructor() {
    this.controllerIndex = undefined;

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

    window.addEventListener("gamepadconnected", (e) => {
      console.log("Gamepad connected.");
      this.controllerIndex = e.gamepad.index;
    });
  }

  update() {
    if (this.controllerIndex !== undefined) {
      const { buttons } = navigator.getGamepads()[this.controllerIndex];

      this.keysPressed.right = buttons[15].pressed;
      this.keysPressed.left = buttons[14].pressed;

      if (buttons[0].pressed && this.canRepeat) {
        this.actionsPressed.action1 = true;
        this.canRepeat = false;
      } else if (!buttons[0].pressed && !this.canRepeat) {
        // this.actionsPressed.action1 = false;
        this.canRepeat = true;
      }

      if (buttons[1].pressed) {
        this.actionsPressed.action2 = true;
      }
    }
  }
}
