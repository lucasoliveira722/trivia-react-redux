import React, { Component } from 'react';
import GameArea from '../components/GameArea/GameArea';
import Header from '../components/Header/Header';
// import { getQuestionsAPI } from '../services';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GameArea />
      </div>
    );
  }
}
