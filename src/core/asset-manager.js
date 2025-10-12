export class AssetManager {
  constructor() {
    this.images = new Map();
    this.sounds = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.onProgressCallback = null;
    this.onCompleteCallback = null;
  }

  getAssetList() {
    return {
      images: {
        player: "./src/assets/sprites/player.png",
        enemy: "./src/assets/sprites/enemy.png",
        enemy_green: "./src/assets/sprites/enemy_green.png",
        enemy_blue: "./src/assets/sprites/enemy_blue.png",
        enemy_golden: "./src/assets/sprites/enemy_golden.png",
        asteroid: "./src/assets/sprites/asteroid.png",
        laser_green: "./src/assets/sprites/laser_green.png",
        destroyer: "./src/assets/sprites/destroyer.png",
        bg1: "./src/assets/sprites/bg1.png",
        bkgd_0: "./src/assets/sprites/bkgd_0.png",
        bkgd_1: "./src/assets/sprites/bkgd_1.png",
        bkgd_2: "./src/assets/sprites/bkgd_2.png",
        explosion: "./src/assets/spritesheets/explosion.png",
        explosions: "./src/assets/spritesheets/explosions.png",
      },
      sounds: {
        laser: "./src/assets/sounds/laser_shooting_sfx.wav",
        explosion: "./src/assets/sounds/explosion.wav",
        spaceship: "./src/assets/sounds/spaceship.mp3",
        fly: "./src/assets/sounds/Fly.mp3",
        fly_1: "./src/assets/sounds/Fly_1.mp3",
        industria: "./src/assets/sounds/Industria.mp3",
        industria_1: "./src/assets/sounds/Industria_1.mp3",
        nDimensions:
          "./src/assets/sounds/n-Dimensions (Main Theme - Retro Ver_0.mp3",
        orbitalColossus: "./src/assets/sounds/Orbital Colossus_0.mp3",
      },
    };
  }

  loadImage(name, path) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.images.set(name, img);
        this.onAssetLoaded();
        resolve(img);
      };

      img.onerror = () => {
        console.error(`Erro ao carregar imagem: ${path}`);
        reject(new Error(`Failed to load image: ${path}`));
      };

      img.src = path;
    });
  }

  loadSound(name, path) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.oncanplaythrough = () => {
        this.sounds.set(name, audio);
        this.onAssetLoaded();
        resolve(audio);
      };

      audio.onerror = () => {
        console.error(`Erro ao carregar som: ${path}`);
        reject(new Error(`Failed to load sound: ${path}`));
      };

      audio.src = path;
      audio.load();
    });
  }

  async loadAllAssets(onProgress = null, onComplete = null) {
    this.onProgressCallback = onProgress;
    this.onCompleteCallback = onComplete;

    const assets = this.getAssetList();
    const imagePromises = [];
    const soundPromises = [];

    this.totalCount =
      Object.keys(assets.images).length + Object.keys(assets.sounds).length;
    this.loadedCount = 0;

    Object.entries(assets.images).forEach(([name, path]) => {
      imagePromises.push(this.loadImage(name, path));
    });

    Object.entries(assets.sounds).forEach(([name, path]) => {
      soundPromises.push(this.loadSound(name, path));
    });

    try {
      await Promise.all([...imagePromises, ...soundPromises]);

      console.log("✅ Todos os assets carregados com sucesso!");
      console.log(`📸 Imagens: ${this.images.size}`);
      console.log(`🔊 Sons: ${this.sounds.size}`);

      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }

      return true;
    } catch (error) {
      console.error("❌ Erro ao carregar assets:", error);
      return false;
    }
  }

  onAssetLoaded() {
    this.loadedCount++;
    const progress = (this.loadedCount / this.totalCount) * 100;

    console.log(
      `Loading: ${this.loadedCount}/${this.totalCount} (${progress.toFixed(
        1
      )}%)`
    );

    if (this.onProgressCallback) {
      this.onProgressCallback(progress, this.loadedCount, this.totalCount);
    }
  }

  getImage(name) {
    const image = this.images.get(name);
    if (!image) {
      console.warn(`⚠️ Imagem não encontrada: ${name}`);
      return null;
    }
    return image;
  }

  getSound(name) {
    const sound = this.sounds.get(name);
    if (!sound) {
      console.warn(`⚠️ Som não encontrado: ${name}`);
      return null;
    }

    return sound.cloneNode();
  }

  isLoaded() {
    return this.loadedCount === this.totalCount && this.totalCount > 0;
  }

  getProgress() {
    return this.totalCount > 0 ? (this.loadedCount / this.totalCount) * 100 : 0;
  }

  dispose() {
    this.images.clear();
    this.sounds.clear();
    this.loadedCount = 0;
    this.totalCount = 0;
  }
}

export const assetManager = new AssetManager();
