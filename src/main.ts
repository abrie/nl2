import './style.css';
import * as Phaser from 'phaser';
import { MazeGenerator, MazeNode } from './mazeGenerator';

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
let maze: MazeNode[][];

function preload() {
  // Preload assets if needed
}

function create() {
  const mazeGenerator = new MazeGenerator(20, 15);
  mazeGenerator.generateMaze();
  maze = mazeGenerator.maze;

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const node = maze[y][x];
      if (node.isWall) {
        this.add.rectangle(x * 32, y * 32, 32, 32, 0x000000).setOrigin(0);
      } else if (node.isDoor) {
        this.add.rectangle(x * 32, y * 32, 32, 32, 0x00ff00).setOrigin(0);
      }
    }
  }

  player = this.add.rectangle(32, 32, 32, 32, 0x0000ff).setOrigin(0);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 2;
  let newX = player.x;
  let newY = player.y;

  if (cursors.left.isDown) {
    newX -= speed;
  } else if (cursors.right.isDown) {
    newX += speed;
  }

  if (cursors.up.isDown) {
    newY -= speed;
  } else if (cursors.down.isDown) {
    newY += speed;
  }

  const playerNodeX = Math.floor(newX / 32);
  const playerNodeY = Math.floor(newY / 32);

  if (maze[playerNodeY] && maze[playerNodeY][playerNodeX]) {
    const node = maze[playerNodeY][playerNodeX];
    if (!node.isWall) {
      player.x = newX;
      player.y = newY;
    }
  }
}
