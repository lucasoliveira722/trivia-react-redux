import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDataPlayers, getQuestionsFromAPI } from '../../redux/actions/index';

class GameArea extends Component {
  constructor() {
    super();

    this.state = {
      questionId: 0,
      correctAnswer: '',
      allAnswer: '',
      disableBtn: false,
      time: 30,
      difficulty: '',
      click: false,
      arr: [{
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      }],
    };
  }

  async componentDidMount() {
    const { questionsFromAPI } = this.props;
    await questionsFromAPI(localStorage.getItem('token'));
    this.sortAnswer();
  }

  changeBorder = () => {
    const wrong = document.getElementsByClassName('wrong');
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const correct = document.getElementsByClassName('correct')[0];
    correct.style.border = '3px solid rgb(6, 240, 15)';
  }

  // changeQuestion = () => {
  //   const { questionId } = this.state;
  //   const countId = questionId + 1;
  //   this.setState({
  //     questionId: countId,
  //   });
  // }

  calcPoints = () => {
    const { time, difficulty } = this.state;
    const magicNumber = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let dif;
    if (difficulty === 'hard') {
      dif = hard;
    }
    if (difficulty === 'medium') {
      dif = medium;
    }
    if (difficulty === 'easy') {
      dif = easy;
    }
    const points = magicNumber + (time * dif);
    this.setState({
      points,
    });
    const { email, name, setData } = this.props;
    this.setState((prevState) => ({
      arr: [{
        nome: name,
        assertions: prevState.arr[0].assertions + 1,
        score: prevState.arr[0].score + points,
        gravatarEmail: email,
      }],
    }), () => {
      const { arr } = this.state;
      localStorage.setItem('ranking', JSON.stringify(arr));
      setData(arr[0]);
    });
  }
  // commit

  stopTimer = () => {
    this.setState({
      click: true,
    });
  }

  handleClick = ({ target }) => {
    this.changeBorder();
    this.stopTimer();
    if (target.name === 'correct') {
      this.calcPoints();
    }
  }

  timer = () => {
    const magicNumber = 1000;
    const magicSec = 30;
    let sec = magicSec;
    const timer = setInterval(() => {
      const { click } = this.state;
      if (click === true) {
        clearInterval(timer);
      }
      this.setState({
        time: sec,
      });
      console.log(`00:${sec}`);
      sec -= 1;
      if (sec < 0) {
        this.setState({
          disableBtn: true,
        });
        clearInterval(timer);
      }
    }, magicNumber);
  }

  sortAnswer = () => {
    const magicNumber = 0.5;
    const { questions } = this.props;
    const { questionId, allAnswer } = this.state;
    if (allAnswer === '') {
      const difficult = questions[questionId].difficulty;
      const arrOfQuestions = [questions[questionId].incorrect_answers,
        questions[questionId].correct_answer].flat();
        // codigo de como dar um shufle no array tirado do site https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
      const shuffledArray = arrOfQuestions.sort(() => magicNumber - Math.random());
      this.setState({
        correctAnswer: questions[questionId].correct_answer,
        allAnswer: shuffledArray,
        difficulty: difficult,
      });
    }
    if (allAnswer !== '' && questionId === 0) {
      const arrOfQuestions = [questions[questionId + 1].incorrect_answers,
        questions[questionId + 1].correct_answer].flat();
      const shuffledArray = arrOfQuestions.sort(() => magicNumber - Math.random());
      this.setState({
        correctAnswer: questions[questionId].correct_answer,
        allAnswer: shuffledArray,
      });
    } else {
      const arrOfQuestions = [questions[questionId].incorrect_answers,
        questions[questionId].correct_answer].flat();
      const shuffledArray = arrOfQuestions.sort(() => magicNumber - Math.random());
      this.setState({
        correctAnswer: questions[questionId].correct_answer,
        allAnswer: shuffledArray,
      });
    }
    this.timer();
  }

  render() {
    const { questions } = this.props;
    const { questionId, correctAnswer, allAnswer, points, disableBtn } = this.state;
    if (questions.length > 0 && allAnswer.length > 0) {
      return (
        <main>
          <h2 data-testid="question-category">
            { questions[questionId].category }
          </h2>
          <span data-testid="question-text">
            { questions[questionId].question }
          </span>
          <div data-testid="answer-options">
            { allAnswer.map((e, i) => {
              if (correctAnswer === e) {
                return (
                  <button
                    className="correct"
                    key="correct"
                    name="correct"
                    type="button"
                    data-testid="correct-answer"
                    disabled={ disableBtn }
                    onClick={ this.handleClick }
                  >
                    { e }
                  </button>
                );
              }
              return (
                <button
                  className="wrong"
                  key={ i }
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  disabled={ disableBtn }
                  onClick={ this.handleClick }
                >
                  { e }
                </button>
              );
            }) }
            <span>{points}</span>
          </div>
        </main>
      );
    }
    return <h1>Carregando...</h1>;
  }
}

GameArea.propTypes = {
  questionsFromAPI: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});
const mapDispatchToProps = (dispatch) => ({
  questionsFromAPI: (token) => dispatch(getQuestionsFromAPI(token)),
  setData: (player) => dispatch(setDataPlayers(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
