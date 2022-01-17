import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

  }

  handleClick({ target: { name } }) {
    const { history } = this.props;
    console.log(history);
    if (name === 'home') {
      history.push('/');
    }
  }

  render() {
    const infos = JSON.parse(localStorage.getItem('ranking'));
    const newInfos = infos.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Página de Ranking</h1>
        { newInfos.map((e, i) => (
          <div key={ i }>
            <img src={ e.picture } alt="player" />
            <span data-testid={ `player-name-${i}` }>
              { e.name }
            </span>
            <span data-testid={ `player-score-${i}` }>
              { e.score }
            </span>
          </div>)) }
        <button
          name="home"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
