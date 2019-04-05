import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Portfolio from "./views/Portoflio";
import Maze from "./views/Maze";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />{" "}
        <Route path="/about" component={About} />{" "}
        <Route path="/portfolio" component={Portfolio} />{" "}
        <Route path="/maze" component={Maze} />{" "}
      </div>{" "}
    </Router>
  );
}

export default App;