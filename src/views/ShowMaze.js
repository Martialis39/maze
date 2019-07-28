import React from "react";
import Cell from "./components/Cell";

class ShowMaze extends React.Component {
  constructor(props) {
    super(props);
    this.mazeHeight = 200;
    this.counter = 0;
    this.maze = this.props.maze
      ? Array(this.props.maze[0].length)
          .fill(null)
          .map((row, rowIndex) => {
            return Array(this.props.maze[0].length)
              .fill("empty cell")
              .map((cell, colIndex) => {
                return (
                  <Cell
                    key={this.counter++}
                    index={""}
                    value={this.props.maze[rowIndex][colIndex]}
                    x={rowIndex}
                    y={colIndex}
                    numberOfCellsInRow={this.props.maze[0].length}
                    mazeHeight={this.mazeHeight}
                  />
                );
              });
          })
      : null;
  }

  handleClick() {}

  render() {
    let style = {
      width: `${this.mazeHeight}px`,
      height: `${this.mazeHeight}px`
    };
    return (
      <div
        onClick={() => {
          this.props.handleClick(this.props.maze);
        }}
        style={style}
        className="maze"
      >
        {this.maze}
      </div>
    );
  }
}

export default ShowMaze;
