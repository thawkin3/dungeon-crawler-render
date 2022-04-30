import React from 'react';
import '../stylesheets/StatsHeader.css';

const StatsHeader = ({ playerStats } = {}) => {
  return (
    <div className="StatsHeader">
      <div className="statContainer">
    	<span className="statTitle">Health: </span>
    	<span className="stat">{playerStats.health}</span>
	  </div>
	  <div className="statContainer">
    	<span className="statTitle">Weapon: </span>
    	<span className="stat">{playerStats.weapon}</span>
	  </div>
	  <div className="statContainer">
    	<span className="statTitle">Attack: </span>
    	<span className="stat">{playerStats.attack}</span>
	  </div>
	  <div className="statContainer">
    	<span className="statTitle">Level: </span>
    	<span className="stat">{playerStats.level}</span>
	  </div>
	  <div className="statContainer">
    	<span className="statTitle">XP to Next Level: </span>
    	<span className="stat">{playerStats.xpLeft}</span>
	  </div>
    </div>
  );
}

export default StatsHeader;
