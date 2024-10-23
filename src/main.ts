import './style.css';
import Phaser from 'phaser';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1 class="text-3xl font-bold underline">
    Hello Vite + TypeScript + TailwindCSS!
  </h1>
`;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: 'game-container',
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Preload assets if needed
}

function create() {
  // Create game objects if needed
}
