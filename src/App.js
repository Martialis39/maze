import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChooseMaze from "./views/ChooseMaze";
import About from "./views/About";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={About} />
        <Route path="/chooseMaze" component={ChooseMaze} />
      </div>
    </Router>
  );
}

export default App;
