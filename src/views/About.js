import React from "react";
import { Link } from "react-router-dom";

class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>Maze Solver</h1>
        <p>
          The idea for this came about when I watching a Computerphile video on
          path-finding algorithms on YouTube. After watching it, I thought I'd
          try to code up a naive approach to finding a path out of a given maze.
          Currently you can choose from a few example mazes and see their
          solution.
        </p>
        <p>Future ideas</p>
        <ul>
          <li>Add a way to have the user add their own maze design. </li>
          <li>Only display the most optimum path out of a maze.</li>
        </ul>
        <Link to={"/chooseMaze"}>Go to choose a maze</Link>
      </div>
    );
  }
}

export default About;
