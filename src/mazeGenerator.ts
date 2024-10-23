class MazeNode {
  x: number;
  y: number;
  isWall: boolean;
  isDoor: boolean;
  isOpen: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.isDoor = false;
    this.isOpen = false;
  }
}

class MazeGenerator {
  width: number;
  height: number;
  maze: MazeNode[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.maze = [];

    for (let y = 0; y < height; y++) {
      const row: MazeNode[] = [];
      for (let x = 0; x < width; x++) {
        row.push(new MazeNode(x, y));
      }
      this.maze.push(row);
    }
  }

  generateMaze() {
    const stack: MazeNode[] = [];
    const startNode = this.maze[0][0];
    startNode.isOpen = true;
    stack.push(startNode);

    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      const neighbors = this.getUnvisitedNeighbors(currentNode);

      if (neighbors.length > 0) {
        stack.push(currentNode);

        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWall(currentNode, randomNeighbor);
        randomNeighbor.isOpen = true;
        stack.push(randomNeighbor);
      }
    }
  }

  getUnvisitedNeighbors(node: MazeNode): MazeNode[] {
    const neighbors: MazeNode[] = [];

    const directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 }
    ];

    for (const direction of directions) {
      const nx = node.x + direction.dx;
      const ny = node.y + direction.dy;

      if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height) {
        const neighbor = this.maze[ny][nx];
        if (!neighbor.isOpen) {
          neighbors.push(neighbor);
        }
      }
    }

    return neighbors;
  }

  removeWall(node1: MazeNode, node2: MazeNode) {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;

    if (dx === 1) {
      node1.isDoor = true;
      node2.isDoor = true;
    } else if (dx === -1) {
      node1.isDoor = true;
      node2.isDoor = true;
    } else if (dy === 1) {
      node1.isDoor = true;
      node2.isDoor = true;
    } else if (dy === -1) {
      node1.isDoor = true;
      node2.isDoor = true;
    }
  }
}

export { MazeGenerator, MazeNode };
