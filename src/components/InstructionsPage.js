import React from 'react';
import '../stylesheets/InstructionsPage.css';

const InstructionsPage = (props) => {
  return (
	<div className="InstructionsPage">
	  <h3>How to play</h3>
	  <p>You are trapped in a dungeon, armed with only a stick. Find food to increase your health, pick up new weapons to increase your attack power, and defeat enemies to gain experience and level up. Defeat the main boss to escape the dungeon!</p>
	  <p>To fight an enemy, run into him. You will do damage to him, and he will do damage to you. You may have to run into him multiple times in order to defeat him. Once you've depleted all his health, he'll disappear and you'll gain some experience points. Be careful that you don't run out of health first though, or it's game over!</p>
	  <button className="btn btn-primary" onClick={props.clickHandler}>New game</button>
	</div>
  );
}

export default InstructionsPage;
