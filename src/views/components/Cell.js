import React from "react";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.x = this.props.x;
    this.y = this.props.y;
    this.value = this.props.value;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.activate) {
      this.props.activate(this.x, this.y);
    }
  }

  handleHover = (event) => {
    console.log(event);
  };

  render() {
    let baseClass = "cell";
    let stateClass = this.value == 0 ? "wall" : "path";
    let trueClass = this.props.active ? "true" : "";
    let cellClasses = `${baseClass} ${stateClass} ${trueClass}`;
    return (
      <div
        className={cellClasses}
        onClick={this.handleClick}
        onMouseOver={this.handleHover}
      >
        <h1>{this.props.index}</h1>
      </div>
    );
  }
}

export default Cell;
