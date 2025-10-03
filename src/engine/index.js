// Renderer System
export { Sprite } from "./renderer/sprite.js";
export { Animation } from "./renderer/animation.js";

// Physics System
export { CollisionDetector } from "./physics/collision-detector.js";
export { Particle } from "./physics/particle.js";

// Audio System
export { Sound } from "./audio/sound.js";

// Input System
export { Keyboard } from "./input/keyboard.js";
export { Gamepad } from "./input/gamepad.js";
export { Virtual } from "./input/virtual.js";

// Tools and Utilities
export { Frame } from "./tools/frame.js";
export { Debug } from "./tools/debug.js";

// UI System
export { UI } from "../ui/ui.js";

export const ENGINE_INFO = {
  name: "JS Space War Engine",
  version: "1.0.0",
  author: "Game Developer",
  description: "Lightweight 2D game engine for browser-based games",
};

/**
 * Initialize engine systems
 * Call this function to set up any global engine configuration
 */
export function initializeEngine(config = {}) {
  const defaultConfig = {
    debug: false,
    audioEnabled: true,
    inputEnabled: true,
    canvasId: "game-screen",
  };

  const engineConfig = { ...defaultConfig, ...config };

  if (engineConfig.debug) {
    console.log("🚀 Engine initialized with config:", engineConfig);
  }

  return engineConfig;
}
