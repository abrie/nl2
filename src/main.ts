import './style.css';
import * as Phaser from 'phaser';

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
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let player: Phaser.GameObjects.Rectangle;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

function preload() {
  // Preload assets if needed
}

function create() {
  player = this.add.rectangle(320, 240, 50, 50, 0x0000ff);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.x -= 5;
  } else if (cursors.right.isDown) {
    player.x += 5;
  }

  if (cursors.up.isDown) {
    player.y -= 5;
  } else if (cursors.down.isDown) {
    player.y += 5;
  }
}
