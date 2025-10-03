/**
 * Engine Module - Central export for all engine systems
 *
 * This module provides a single entry point for all engine functionality,
 * organized by system responsibility using native ES6 modules.
 */

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

// Utils System
export { Frame } from "./tools/frame.js";
export { Debug } from "./tools/debug.js";

// UI System
export { UI } from "../ui/ui.js";

/**
 * Engine namespaces for grouped imports
 *
 * Usage examples:
 *
 * // Import everything
 * import * as Engine from './engine/index.js';
 * const sprite = new Engine.Sprite('path/to/image.png');
 *
 * // Import specific systems
 * import { Renderer, Physics, Input } from './engine/index.js';
 * const collision = new Physics.CollisionDetector(...);
 *
 * // Import individual classes (recommended for tree-shaking)
 * import { Sprite, CollisionDetector, Keyboard } from './engine/index.js';
 */

// Grouped exports for organized access
export const Renderer = {
  Sprite,
  Animation,
};

export const Physics = {
  CollisionDetector,
  Particle,
};

export const Audio = {
  Sound,
};

export const Input = {
  Keyboard,
  Gamepad,
  Virtual,
};

export const Utils = {
  Frame,
  Debug,
};

export const UserInterface = {
  UI,
};

/**
 * Engine version and metadata
 */
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
