import React from 'react';
import GameCell from './GameCell';
import '../stylesheets/InfoKey.css';

const InfoKey = (props) => {
  return (
    <div className="InfoKey">
      <div className="blockDescription">
    	<GameCell spaceType="player" id="key_player" />
    	<span>You</span>
      </div>
      <div className="blockDescription">
    	<GameCell spaceType="food" id="key_food" />
    	<span>Food</span>
      </div>
      <div className="blockDescription">
    	<GameCell spaceType="weapon" id="key_weapon" />
    	<span>Weapon Upgrade</span>
      </div>
      <div className="blockDescription">
    	<GameCell spaceType="enemy" id="key_enemy" />
    	<span>Enemy</span>
      </div>
      <div className="blockDescription">
    	<GameCell spaceType="boss" id="key_boss" />
    	<span>Dungeon Boss</span>
      </div>
      <div className="blockDescription">
    	<GameCell spaceType="wall" id="key_wall" />
    	<span>Wall</span>
      </div>
    </div>
  );
}

export default InfoKey;
