import React, { Component } from 'react';
import GameArea from '../components/GameArea/GameArea';
import Header from '../components/Header/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GameArea />
      </div>
    );
  }
}

export default Game;
