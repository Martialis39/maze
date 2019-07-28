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
    console.log(this.props.mazeHeight / this.props.numberOfCellsInRow);
    let baseClass = "cell";

    let stateClass = null
    switch(this.value) {
      case(0):
        stateClass = "wall"
        break
      case(2):
        stateClass = 'start'
        break  
      case(3):
        stateClass = "end"
        break
      default:
        stateClass= "path"
        break
    }
    let trueClass = this.props.active ? "true" : "";
    let cellClasses = `${baseClass} ${stateClass} ${trueClass}`;
    let style = null;
    if (this.props.numberOfCellsInRow) {
      
      style = {
        width: `calc(100% / ${this.props.numberOfCellsInRow} - 2px)`,
        height: `calc(100% / ${this.props.numberOfCellsInRow} - 2px)`,
        
      };
    }
    return (
      <div
        style={style}
        className={cellClasses}
        onClick={this.handleClick}
        onMouseOver={this.handleHover}
      >
        <p>{this.props.index}</p>
      </div>
    );
  }
}

export default Cell;
