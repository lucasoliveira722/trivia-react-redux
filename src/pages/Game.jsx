import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameArea from '../components/GameArea/GameArea';
import Header from '../components/Header/Header';
// import { getQuestionsAPI } from '../services';
import { getQuestionsFromAPI } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    const { questionsFromAPI } = this.props;
    // console.log(localStorage.getItem('token'));
    questionsFromAPI(localStorage.getItem('token'));
  }

  render() {
    return (
      <div>
        <Header />
        <GameArea />
      </div>
    );
  }
}

Game.propTypes = {
  questionsFromAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionsFromAPI: (token) => dispatch(getQuestionsFromAPI(token)),
});

export default connect(null, mapDispatchToProps)(Game);
