import React from 'react';
import '../stylesheets/PlayerLost.css';

const PlayerLost = (props) => {
  return (
	<div className="PlayerLost">
	  <h3>You Lost!</h3>
	  <p>Thou hast died in the dungeon.</p>
	  <button className="btn btn-primary" onClick={props.clickHandler}>Play again</button>
	</div>
  );
}

export default PlayerLost;
