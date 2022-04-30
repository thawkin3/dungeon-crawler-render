import React, { Component } from 'react';
import InstructionsPage from './components/InstructionsPage';
import StatsHeader from './components/StatsHeader';
import GameBoard from './components/GameBoard';
import InfoKey from './components/InfoKey';
import PlayerLost from './components/PlayerLost';
import PlayerWon from './components/PlayerWon';
import './stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // game data not needed in state
    this.boardWidth = 100;
    this.boardHeight = 100;
    this.visibleSizeWidth = 11;
    this.visibleSizeHeight = 11;
    this.weapons = ['stick', 'knitting needles', 'a herring', 'butterfly net'];

    this.state = {
      cells: [],
      enemyCoordinates: {},
      viewportCenter: {
        x: this.boardWidth/2,
        y: this.boardHeight/2
      },
      gameIsPlaying: false,
      playerLost: false,
      playerWon: false,
      playerStats: {},
      bossStats: {},
    };

    // bind your methods
    this.generateNewGame = this.generateNewGame.bind(this);
    this.pieceGenerator = this.pieceGenerator.bind(this);
    this.startGame = this.startGame.bind(this);
    this.startOver = this.startOver.bind(this);
    this.moveViewportCenter = this.moveViewportCenter.bind(this);
  }

  componentDidMount() {
    this.generateNewGame();
    document.addEventListener('click', this.documentClickEventToFocusOnBoard);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.playerLost || prevState.playerWon) && !this.state.playerLost && !this.state.playerWon) {
      this.generateNewGame();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickEventToFocusOnBoard);
  }

  documentClickEventToFocusOnBoard() {
    const board = document.getElementById('GameBoard');
    if (board) {
      board.focus();
    }
  }

  generateNewGame() {
    // set your viewport center
    let viewportCenter = {
      x: this.boardWidth / 2,
      y: this.boardHeight / 2,
    };

    // set your player stats
    let playerStats = {
      health: 100,
      weapon: this.weapons[0],
      attack: 10,
      level: 1,
      xpLeft: 40,
    };

    // set your boss stats
    let bossStats = {
      health: 300,
      attack: 80,
    };

    // build the walls and open spaces
    let cells = [];
    for (let i = 0; i < this.boardHeight; i++) {
      cells[i] = [];
      for (let j = 0; j < this.boardWidth; j++) {
        if (i === 0 || i === this.boardHeight - 1 || j === 0 || j === this.boardWidth - 1) {
          cells[i].push('wall');
        } else {
          cells[i].push('open');
        }
      }
    }

    // add food, weapon upgrades, enemies, and boss
    this.pieceGenerator('food', 20, cells);
    this.pieceGenerator('weapon', 3, cells);
    let enemyCoordinates = {};
    this.pieceGenerator('enemy', 10, cells, enemyCoordinates);
    this.pieceGenerator('boss', 1, cells);

    this.setState({
      viewportCenter: viewportCenter,
      playerStats: playerStats,
      bossStats: bossStats,
      cells: cells,
      enemyCoordinates: enemyCoordinates,
    });
  }

  // adds pieces to the board
  pieceGenerator(type, numberToPlace, cells, enemyTracker) {
    while (numberToPlace > 0) {
      let x = Math.floor(Math.random() * (this.boardWidth - 2)) + 1;
      let y = Math.floor(Math.random() * (this.boardHeight - 2)) + 1;
      if (cells[y][x] === 'open') {
        cells[y][x] = type;
        if (type === 'enemy') {
          enemyTracker[y] = enemyTracker[y] || {};
          enemyTracker[y][x] = {
            health: Math.floor(Math.random() * 50),
            attack: Math.floor(Math.random() * 50),
          }

        }
        numberToPlace--;
      }
    }
  }

  // starts the game
  startGame() {
    this.setState({
      gameIsPlaying: true,
    });
  }

  // restarts the game after winning or losing
  startOver() {
    this.setState({
      gameIsPlaying: true,
      playerWon: false,
      playerLost: false,
    });
  }

  // handles moving your piece (really just moving the viewport)
  moveViewportCenter(e) {
    let vector = '';
    switch (e.keyCode) {
      case 37:    // left
        vector = { x: -1, y: 0 };
        break;
      case 38:    // up
        vector = { x: 0, y: -1 };
        break;
      case 39:    // right
        vector = { x: 1, y: 0 };
        break;
      case 40:    // down
        vector = { x: 0, y: 1 };
        break;
      default:
        vector = '';
    }

    // if any arrow key was pressed, handle the movement
    if (vector) {
      let newXPosition = this.state.viewportCenter.x + vector.x;
      let newYPosition = this.state.viewportCenter.y + vector.y;

      switch (this.state.cells[newYPosition][newXPosition]) {
        case 'wall':
          // do nothing
          break;
        case 'open':
          this.setState(prevState => ({
            viewportCenter: {
              x: prevState.viewportCenter.x + vector.x,
              y: prevState.viewportCenter.y + vector.y,
            },
          }));
          break;
        case 'food':
          this.setState(prevState => {
            let newCells = [];
            for (let i = 0; i < prevState.cells.length; i++) {
              newCells.push(prevState.cells[i].slice(0));
            }
            newCells[newYPosition][newXPosition] = 'open';

            return {
              viewportCenter: {
                x: prevState.viewportCenter.x + vector.x,
                y: prevState.viewportCenter.y + vector.y,
              },
              playerStats: {
                ...prevState.playerStats,
                health: prevState.playerStats.health + 20,
              },
              cells: newCells,
            }
          });
          break;
        case 'weapon':
          this.setState(prevState => {
            let newCells = [];
            for (let i = 0; i < prevState.cells.length; i++) {
              newCells.push(prevState.cells[i].slice(0));
            }
            newCells[newYPosition][newXPosition] = 'open';

            return {
              viewportCenter: {
                x: prevState.viewportCenter.x + vector.x,
                y: prevState.viewportCenter.y + vector.y,
              },
              playerStats: {
                ...prevState.playerStats,
                attack: prevState.playerStats.attack + 20,
                weapon: this.weapons[this.weapons.indexOf(prevState.playerStats.weapon) + 1],
              },
              cells: newCells,
            }
          });
          break;
        case 'enemy':
          this.setState(prevState => {
            let enemyDied = false;
            let newEnemyCoordinates = {};
            newEnemyCoordinates[newYPosition] = { ...prevState.enemyCoordinates[newYPosition] };
            newEnemyCoordinates[newYPosition][newXPosition] = { ...prevState.enemyCoordinates[newYPosition][newXPosition] };
            newEnemyCoordinates[newYPosition][newXPosition].health -= prevState.playerStats.attack;
            if (newEnemyCoordinates[newYPosition][newXPosition].health <= 0 || isNaN(newEnemyCoordinates[newYPosition][newXPosition].health)) {
              enemyDied = true;
            }

            let newCells = [];
            for (let i = 0; i < prevState.cells.length; i++) {
              newCells.push(prevState.cells[i].slice(0));
            }
            newCells[newYPosition][newXPosition] = 'open';

            let healthLeft = Math.max(0, prevState.playerStats.health - newEnemyCoordinates[newYPosition][newXPosition].attack);
            let xpLeft = enemyDied ? prevState.playerStats.xpLeft - 10 : prevState.playerStats.xpLeft;

            return {
              viewportCenter: {
                x: enemyDied ? prevState.viewportCenter.x + vector.x : prevState.viewportCenter.x,
                y: enemyDied ? prevState.viewportCenter.y + vector.y : prevState.viewportCenter.y,
              },
              playerStats: {
                ...prevState.playerStats,
                attack: xpLeft === 0 ? prevState.playerStats.attack + 20 : prevState.playerStats.attack,
                health: xpLeft === 0 ? healthLeft + 50 : healthLeft,
                xpLeft: xpLeft === 0 ? 40 : xpLeft,
                level: xpLeft === 0 ? prevState.playerStats.level + 1 : prevState.playerStats.level,
              },
              cells: enemyDied ? newCells : prevState.cells,
              enemyCoordinates: {
                ...prevState.enemyCoordinates,
                ...newEnemyCoordinates,
              },
              playerLost: healthLeft === 0,
              gameIsPlaying: !(healthLeft === 0),
            }
          });
          break;
        case 'boss':
          this.setState(prevState => {
            let bossDied = false;
            let bossHealth = prevState.bossStats.health;
            bossHealth -= prevState.playerStats.attack;
            if (bossHealth <= 0) {
              bossDied = true;
            }

            let healthLeft = Math.max(0, prevState.playerStats.health - prevState.bossStats.attack);

            return {
              playerStats: {
                ...prevState.playerStats,
                health: healthLeft,
              },
              bossStats: {
                health: bossHealth,
                attack: prevState.bossStats.attack,
              },
              playerLost: healthLeft === 0,
              playerWon: bossDied,
              gameIsPlaying: !(healthLeft === 0) && !bossDied,
            }
          });
          break;
        default:
          // do nothing
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header className="App-header">
                <h1 className="App-title">Dungeon Crawler</h1>
              </header>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { this.state.gameIsPlaying && (
                <div>
                  <StatsHeader playerStats={this.state.playerStats} />
                  <GameBoard
                    cells={this.state.cells} 
                    boardWidth={this.boardWidth} 
                    boardHeight={this.boardHeight}
                    visibleSizeWidth={this.visibleSizeWidth}
                    visibleSizeHeight={this.visibleSizeHeight}
                    viewportCenter={this.state.viewportCenter}
                    moveViewportCenter={this.moveViewportCenter}
                  />
                  <InfoKey />
                </div>
              )}
              { this.state.playerLost && <PlayerLost clickHandler={this.startOver} /> }
              { this.state.playerWon && !this.state.playerLost && <PlayerWon clickHandler={this.startOver} /> }
              { !this.state.gameIsPlaying && !this.state.playerLost && !this.state.playerWon && <InstructionsPage clickHandler={this.startGame} /> }
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <footer className="App-footer">
                <p>Created by Tyler Hawkins</p>
                <p>Check out the rest of my portfolio <a href="http://tylerhawkins.info">here</a></p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
