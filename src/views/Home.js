import React from "react";
import { Redirect, Link } from "react-router-dom";
import CreateMaze from "./CreateMaze";
import ShowMaze from "./components/ShowMaze";

import { data } from "../data";
class Home extends React.Component {
  render() {
    return (
      <div className="maze-container">
        {data.map((maze) => (
          <ShowMaze maze={maze} />
        ))}
        {/* <ShowMaze maze={smallMaze} /> */}
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
