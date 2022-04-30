import React from 'react';
import '../stylesheets/PlayerWon.css';

const PlayerWon = (props) => {
  return (
	<div className="PlayerWon">
	  <h3>You Won!</h3>
	  <p>Thou hast escaped the dungeon.</p>
	  <button className="btn btn-primary" onClick={props.clickHandler}>Play again</button>
	</div>
  );
}

export default PlayerWon;
