import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    const { history } = this.props;
    console.log(history);
    if (name === 'home') {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Página de Ranking</h1>
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
