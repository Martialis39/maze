import React from "react";
import Cell from "./components/Cell";
import Maze from "./Maze";
let uniqueId = require("lodash.uniqueid");

class CreateMaze extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createEmptyMaze = this.createEmptyMaze.bind(this);
    this.submitMaze = this.submitMaze.bind(this);
    this.getNeighbours = this.getNeighbours.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.activate = this.activate.bind(this);
    this.state = {
      value: 0,
      submit: false,
      maze: []
    };
    this.flowIteration = 0;
    this.flow = [
      {
        text: "Choose a start",
        state: 2
      },
      {
        text: "Create an end",
        state: 3
      },
      {
        text: "Choose a path",
        state: 1
      }
    ];
  }

  submitMaze() {
    const submit = "showSolution";
    const maze = this.state.maze;

    this.setState({
      submit,
      maze
    });
  }

  activate(x, y) {
    const maze = this.state.maze;
    let emptyMaze = this.createEmptyMaze();
    let cellIsOnTheEdge = this.validateInput(x, y, emptyMaze) !== 4;

    if (this.flowIteration == 0) {
      debugger;
      if (cellIsOnTheEdge) {
        maze[y][x] = 2;
        this.setState({ maze });
        this.flowIteration++;
        return;
      }
    } else if (this.flowIteration == 1) {
      debugger;
      if (cellIsOnTheEdge) {
        maze[y][x] = 3;
        this.setState({ maze });
        this.flowIteration++;
        return;
      }
    } else {
      maze[y][x] = maze[y][x] == 1 ? 0 : 1;
    }
    this.setState({ maze });
  }

  validateInput(x, y) {
    let dummyMaze = Array(this.state.value)
      .fill(null)
      .map((row, rowIndex) => {
        return Array(this.state.value)
          .fill(null)
          .map((cell, colIndex) => {
            return {
              x: colIndex,
              y: rowIndex
            };
          });
      });
    debugger;
    const neighbours = this.getNeighbours(x, y, dummyMaze);
    return neighbours.length;
  }

  getNeighbours(x, y, _maze) {
    let maze = _maze;
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

  createEmptyMaze() {
    let cells = [];
    for (let i = 0; i < this.state.value; i++) {
      for (let j = 0; j < this.state.value; j++) {
        const element = (
          <Cell
            key={uniqueId()}
            activate={this.activate}
            index={""}
            active={false}
            value={this.state.maze[i][j]}
            x={j}
            y={i}
          />
        );
        cells.push(element);
      }
    }
    return cells;
  }

  handleChange(event) {
    const value = Number(event.target.value);
    this.setState({ value });
  }
  handleSubmit(event) {
    const maze = Array(this.state.value)
      .fill(null)
      .map((row) => {
        return Array(this.state.value)
          .fill(null)
          .map((cell) => 0);
      });
    const submit = "inputMaze";
    this.setState({ submit, maze });
  }
  render() {
    switch (this.state.submit) {
      case "showSolution":
        return (
          <div>
            <Maze maze={this.state.maze} width={this.state.value * 50} />
          </div>
        );
      case "inputMaze":
        const style = { width: `${this.state.value * 50}px` };
        let cells = this.createEmptyMaze();
        return (
          <div>
            <h2>{this.flow[this.flowIteration].text}</h2>
            <input onClick={this.submitMaze} type="submit" value="Submit" />
            <div style={style} className="maze">
              {cells}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h1>Create Maze</h1>
            <p>Create the maze</p>
            <div className="c-form">
              <label>
                Enter grid size (n x n):
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <input onClick={this.handleSubmit} type="submit" value="Submit" />
            </div>
          </div>
        );
    }
  }
}

export default CreateMaze;
