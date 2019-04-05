import React from "react";
import { Redirect, Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      routes: [
        {
          keyCode: 37,
          key: "left_arrow",
          route: "About"
        },
        {
          keyCode: 38,
          key: "up_arrow",
          route: "Portfolio"
        },
        {
          keyCode: 39,
          key: "right_arrow",
          route: "Portfolio"
        }
      ],
      reroute: null
    };
  }

  render() {
    if (this.state.reroute === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <h1> Home </h1>{" "}
        <h2>
          <Link to="/about"> About </Link>{" "}
        </h2>{" "}
        <h2>
          <Link to="/portfolio"> Portfolio </Link>{" "}
        </h2>{" "}
        <h2>
          <Link to="/maze"> Maze </Link>{" "}
        </h2>{" "}
      </div>
    );
  }
}

export default Home;
