import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GameArea from '../components/GameArea/GameArea';
import Header from '../components/Header/Header';

class Game extends Component {
  clickFeedback = () => {
    const { history } = this.props;
    return history.push('/feedback');
  }

  render() {
    return (
      <div>
        <Header />
        <GameArea newName={ this.clickFeedback } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
