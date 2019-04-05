import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.x = this.props.x;
    this.y = this.props.y;
    this.value = this.props.value;
  }

  render() {
    let baseClass = "cell";
    let stateClass = this.value == 0 ? "wall" : "path";
    let cellClasses = `${baseClass} ${stateClass}`;
    return (
      <div className={cellClasses}>
        <h1>
          {this.x}, {this.y}
        </h1>
      </div>
    );
  }
}

export default Cell;
