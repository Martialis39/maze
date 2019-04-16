import React from "react";
import { Redirect, Link } from "react-router-dom";
import CreateMaze from "./CreateMaze";
class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <CreateMaze />
        {/* <h1> Home </h1>{" "}
        <h2>
          <Link to="/about"> About </Link>{" "}
        </h2>{" "}
        <h2>
          <Link to="/portfolio"> Portfolio </Link>{" "}
        </h2>{" "}
        <h2>
          <Link to="/maze"> Maze </Link>{" "}
        </h2>{" "}
        <h2>
          <Link to="/create"> Create </Link>{" "}
        </h2>{" "} */}
      </div>
    );
  }
}

export default Home;
