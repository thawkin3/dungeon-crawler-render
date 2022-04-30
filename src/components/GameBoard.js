import React, { Component } from 'react';
import GameCell from './GameCell';
import '../stylesheets/GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
		super(props);

		this.createCellsInView = this.createCellsInView.bind(this);
	}

  componentDidMount(){
    this.gameBoard.focus();
  }
  
	createCellsInView() {
    let cellsArray = [];
    for (let i = Math.ceil(this.props.viewportCenter.y - this.props.visibleSizeHeight/2); i < Math.ceil(this.props.viewportCenter.y + this.props.visibleSizeHeight/2); i++) {
      for (let j = Math.ceil(this.props.viewportCenter.x - this.props.visibleSizeWidth/2); j < Math.ceil(this.props.viewportCenter.x + this.props.visibleSizeWidth/2); j++) {
        let cellValue = '';
        if (typeof this.props.cells[i] !== 'undefined' && typeof this.props.cells[i][j] !== 'undefined') {
          cellValue = this.props.cells[i][j];
        }
        cellsArray.push(
          <GameCell
            key={j + "_" + i}
            theId={"cell_" + j + "_" + i}
            altColor={(j - i) % 2 === 0}
            spaceType={i === this.props.viewportCenter.y && j === this.props.viewportCenter.x ? 'player' : cellValue}
          />
        );
      }
    }
    return cellsArray;
	}

  render() {
    return (
        <div
          id="GameBoard"
          className="GameBoard"
          tabIndex="-1"
          onKeyDown={this.props.moveViewportCenter}
          ref={(gameBoard) => { this.gameBoard = gameBoard; }}
        >
          { this.createCellsInView() }
        </div>
    );
  }
}

export default GameBoard;
