export class GamepadPlayerController {
  constructor() {
    this.controllerIndex = undefined;

    this.keysPressed = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    this.actionsFired = {
      action1: false, // Shoot
      action2: false, // Dodge
    };

    window.addEventListener("gamepadconnected", (e) => {
      console.log("Gamepad connected.");
      this.controllerIndex = e.gamepad.index;
    });
  }

  update() {
    if (this.controllerIndex !== undefined) {
      const gamepad = navigator.getGamepads()[this.controllerIndex];
      this.actionsFired.action1 = gamepad.buttons[0].touched;
      this.actionsFired.action2 = gamepad.buttons[1].touched;
      this.keysPressed.right = gamepad.buttons[15].pressed;
      this.keysPressed.left = gamepad.buttons[14].pressed;
      console.log(gamepad.buttons);
    }
  }
}
