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
    let trueClass = this.props.active ? 'true' : ''
    let cellClasses = `${baseClass} ${stateClass} ${trueClass}`;
    return (
      <div className={cellClasses}>
        <h1>
          {this.props.index}
        </h1>
      </div>
    );
  }
}

export default Cell;
