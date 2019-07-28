import React from "react";
import ShowMaze from "./ShowMaze";
import Maze from "./Maze";

import { data } from "../data";
class ChooseMaze extends React.Component {
  constructor(props) {
    super();
    this.state = {
      maze: null
    };
  }

  chooseMaze = maze => {
    this.setState({
      maze
    });
  };
  render() {
    if (this.state.maze) {
      return (
        <>
          <Maze maze={this.state.maze} />
          <button
            style={{ display: "block", padding: "20px", margin: "20px auto" }}
            className="button"
            onClick={() => {
              this.chooseMaze(null);
            }}
          >
            Choose a different maze
          </button>
        </>
      );
    }
    return (
      !this.state.maze && (
        <>
          <div className="about">
            <h1>Click on a maze to see its solution. </h1>
            <p>Note that this site is not optimized for mobile.</p>

            <div>
              <div
                className="cell start"
                style={{
                  display: "inline-block",
                  height: "20px",
                  width: "20px",
                  marginRight: "10px"
                }}
              />
              indicates start
            </div>
            <div>
              <div
                className="cell end"
                style={{
                  display: "inline-block",
                  height: "20px",
                  width: "20px",
                  marginRight: "10px"
                }}
              />
              indicates end
            </div>
            <p>The paths that end in the wall are to be considered deadends.</p>
          </div>
          <div className="maze-container">
            {data.map(maze => (
              <ShowMaze
                maze={maze}
                handleClick={maze => {
                  this.chooseMaze(maze);
                }}
              />
            ))}
          </div>
        </>
      )
    );
  }
}

export default ChooseMaze;
