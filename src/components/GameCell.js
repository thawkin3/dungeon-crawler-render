import React from 'react';
import '../stylesheets/GameCell.css';

const GameCell = (props) => {
  return (
    <div
	  className={`GameCell ${props.spaceType} ${props.spaceType === 'open' && props.altColor ? 'alt' : ''}`}
	  id={props.theId}
    />
  );
}

export default GameCell;
