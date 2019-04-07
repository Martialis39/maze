import React from "react";
import Cell from "./components/Cell";
let uniqueId = require("lodash.uniqueid");

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: this.props.maze || [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 3],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [2, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      solved: false,

      mazeAsObject: Array(this.props.maze[0].length)
        .fill(null)
        .map((row, rowIndex) => {
          return Array(this.props.maze[0].length)
            .fill(null)
            .map((cell, colIndex) => {
              const cell_object = {
                x: colIndex,
                y: rowIndex,
                state: this.props.maze[rowIndex][colIndex],
                id: uniqueId()
              };
              cell = cell_object;
              return cell;
            });
        })
    };

    this.bestPath = [];
    this.initSolve = this.initSolve.bind(this);
    this.checkNeighbours = this.checkNeighbours.bind(this);
    this.getNeighbours = this.getNeighbours.bind(this);
    this.pathArray = [];
  }

  initSolve() {
    let maze = JSON.parse(JSON.stringify(this.state.mazeAsObject));
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
    this.checkNeighbours(
      this.getNeighbours(start.x, start.y),
      paths,
      visited,
      0
    );
    const solved = true;
    this.setState({
      solved
    });
    console.log("Result", this.pathArray);
    // Get path that ends with exit
    this.pathArray.forEach((path) => {
      if (path[path.length - 1].state == 3) {
        this.bestPath = path;
      }
    });
  }

  getNeighbours(x, y) {
    let maze = this.state.mazeAsObject;
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

  componentDidMount() {
    this.initSolve();
  }

  render() {
    if (this.state.solved) {
      let width = this.props.width
        ? this.props.width
        : this.state.maze[0].length * 100;
      let style = {
        width: `${width}px`
      };
      let parsedBestPath = this.bestPath.map((cell) => cell.id);
      if (this.state.mazeAsObject) {
        let maze = this.state.mazeAsObject.map((row, columnIndex) => {
          return row.map((cell, rowIndex) => {
            const isActive = parsedBestPath.indexOf(cell.id) < 0 ? false : true;
            return (
              <Cell
                key={uniqueId()}
                index={cell.id}
                active={isActive}
                value={cell.state}
                x={rowIndex}
                y={columnIndex}
              />
            );
          });
        });
        return (
          <div style={style} className="maze">
            {maze}
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

export default Maze;
