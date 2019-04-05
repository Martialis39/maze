import React from "react";
import Cell from "./components/Cell";
let uniqueId = require("lodash.uniqueid");

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: 
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 3], 
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 
        [2, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      mazeAsObject: null
    };
    this.maze = [];
    this.bestPath = []
    this.constructMaze = this.constructMaze.bind(this);
    this.initSolve = this.initSolve.bind(this);
    this.checkNeighbours = this.checkNeighbours.bind(this);
    this.getNeighbours = this.getNeighbours.bind(this);
    this.pathArray = [];
  }

  initSolve() {
    let maze = this.maze;
    let start = null;
    let paths = [];
    let visited = [];
    maze.forEach((row) => {
      row.forEach((cell) => {
        // Is start?
        if ((start === null) & (cell.state == 2)) {
          start = cell;
          paths.push(cell);
          visited.push(cell.id);
        }
      });
    });
    console.log({ start });
    this.checkNeighbours(
      this.getNeighbours(start.x, start.y),
      paths,
      visited,
      0
    );
    console.log("Result", this.pathArray);
    // Get path that ends with exit
    this.pathArray.forEach((path) => {
      if(path[path.length - 1].state == 3){
        this.bestPath = path
      }
    })


  }

  getNeighbours(x, y) {
    let maze = this.maze;
    let neighbours = [];
    maze.forEach((row) => {
      row.forEach((cell) => {
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
    neighbours.forEach((potentialMove) => {
      if (visited.indexOf(potentialMove.id) < 0) {
        if (potentialMove.state !== 0) {
          validMoves.push(potentialMove);
        }
      }
    });
    if (validMoves.length === 0) {
      
      this.pathArray[currentIndex] = path;
      return;
    } else {
      let finish = validMoves.filter((cell) => cell.state === 3);
      if (finish.length === 1) {
        path.push(finish[0]);
        
        this.pathArray[currentIndex] = path;
        return;
      }
    }
    validMoves.forEach((validMove) => {
      let newPath = JSON.parse(JSON.stringify(path));
      currentIndex++;
      newPath.push(validMove);
      visited.push(validMove.id);
      this.checkNeighbours(
        this.getNeighbours(validMove.x, validMove.y),
        newPath,
        visited,
        currentIndex
      );
    });
  }

  constructMaze() {
    let gridSize = this.state.maze[0].length;
    for (let i = 0; i < gridSize; i++) {
      this.maze[i] = [];
      for (let j = 0; j < gridSize; j++) {
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
  }
  componentDidMount() {
    this.constructMaze();
    this.initSolve();
  }

  render() {
    let style = {
      width: `${this.state.maze[0].length * 100}px`
    };
    let parsedBestPath = this.bestPath.map( (cell) => cell.id )
    console.log('this.bestPath', parsedBestPath)
    let maze = this.maze.map((row, columnIndex) => {
      return row.map((cell, rowIndex) => {
        const isActive = parsedBestPath.indexOf(cell.id) < 0 ? false : true
        return (
          <Cell key={uniqueId()} index={cell.id} active={isActive} value={cell.state} x={rowIndex} y={columnIndex} />
        );
      });
    });
    return (
      <div style={style} className="maze">
        {maze}
      </div>
    );
  }
}

export default Maze;
