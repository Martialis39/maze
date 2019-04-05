import React from "react";
import Cell from "./components/Cell";
let uniqueId = require("lodash.uniqueid");

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [2, 1, 1, 1, 3],
        [0, 0, 0, 0, 0]
      ],
      mazeAsObject: null
    };
    this.maze = [];
    this.constructMaze = this.constructMaze.bind(this);
    this.initSolve = this.initSolve.bind(this);
    this.checkNeighbours = this.checkNeighbours.bind(this);
    this.getNeighbours = this.getNeighbours.bind(this);
    this.pathArray = [];
  }

  initSolve() {
    let maze = this.maze;
    let start = [];
    let paths = [];
    let visited = [];
    let current = null;

    maze.forEach(row => {
      row.forEach(cell => {
        // Is start?
        if ((start.length == 0) & (cell.state == 2)) {
          start.push(cell);
          paths.push(cell);
          visited.push(cell.id);
          current = cell;
        }
      });
    });
    this.checkNeighbours(
      this.getNeighbours(current.x, current.y),
      paths,
      visited,
      0
    );
    console.log("test", this.pathArray);
  }

  getNeighbours(x, y) {
    let maze = this.maze;
    let neighbours = [];
    maze.forEach(row => {
      row.forEach(cell => {
        if (
          (cell.x == x && cell.y == y + 1) ||
          (cell.x == x && cell.y == y - 1) ||
          (cell.y == y && cell.x == x + 1) ||
          (cell.y == y && cell.x == x - 1)
        ) {
          neighbours.push(cell);
        }
      });
    });

    return neighbours;
  }

  checkNeighbours(neighbours, path, visited, currentIndex) {
    let validMoves = [];
    neighbours.forEach(potentialMove => {
      if (visited.indexOf(potentialMove.id) < 0) {
        if (potentialMove.state !== 0) {
          validMoves.push(potentialMove);
        }
      }
    });

    if (validMoves.length === 0) {
      this.pathArray = [];
      this.pathArray[currentIndex] = path;
      return;
    } else {
      let finish = validMoves.filter(cell => cell.state === 3);

      if (finish.length === 1) {
        path.push(finish[0]);

        this.pathArray[currentIndex] = [];
        this.pathArray[currentIndex].push(path);
        return;
      }
    }
    validMoves.forEach(validMove => {
      currentIndex++;
      path.push(validMove);
      visited.push(validMove.id);
      this.checkNeighbours(
        this.getNeighbours(validMove.x, validMove.y),
        path,
        visited,
        currentIndex
      );
    });
  }

  constructMaze() {
    for (let i = 0; i < 5; i++) {
      this.maze[i] = [];
      for (let j = 0; j < 5; j++) {
        const Cell = {
          x: j,
          y: i,
          state: this.state.maze[i][j],
          id: uniqueId()
        };
        this.maze[i].push(Cell);
      }
    }
    this.setState({
      mazeAsObject: this.maze
    });
    console.table(this.maze);
  }
  componentDidMount() {
    this.constructMaze();
    this.initSolve();
  }

  render() {
    let maze = this.state.maze.map((row, columnIndex) => {
      return row.map((cell, rowIndex) => {
        return <Cell value={cell} x={rowIndex} y={columnIndex} />;
      });
    });
    return <div className="maze"> {maze} </div>;
  }
}

export default Maze;
