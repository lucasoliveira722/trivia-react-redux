import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDataPlayers, getQuestionsFromAPI } from '../../redux/actions/index';

class GameArea extends Component {
  constructor() {
    super();
    this.state = {
      questionId: 0,
      count: 0,
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
    const { dispatch } = this.props;
    await dispatch(getQuestionsFromAPI(localStorage.getItem('token')));
    this.sortAnswer();
    this.timer();
  }

  changeBorder = () => {
    const wrong = document.getElementsByClassName('wrong');
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const correct = document.getElementById('correct');
    correct.style.border = '3px solid rgb(6, 240, 15)';
  }

  withoutBorder = () => {
    const wrong = document.getElementsByClassName('wrong');
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '1px solid black';
    }
    const correct = document.getElementById('correct');
    correct.style.border = '1px solid black';
  }

  changeQuestion = () => {
    const { questionId } = this.state;
    const magicNumber = 4;
    const newMagicNumber = 5;
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }), () => {
      const { count } = this.state;
      if (count === newMagicNumber) {
        this.sortAnswer();
      }
    });
    if (questionId < magicNumber) {
      this.setState((prevState) => ({
        questionId: prevState.questionId + 1,
      }), () => {
        this.sortAnswer();
      });
    }
  }

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
    const { email, name, dispatch } = this.props;
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
      dispatch(setDataPlayers(arr[0]));
    });
  }

  stopTimer = () => {
    this.setState({
      click: true,
    });
  }

  handleClick = ({ target }) => {
    if (target.name !== 'next') {
      this.changeBorder();
      this.stopTimer();
      if (target.name === 'correct') {
        this.calcPoints();
      }
    } else {
      this.setState({
        click: false,
      });
      this.changeQuestion();
      this.withoutBorder();
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
    const magicNumber2 = 5;
    const { questions, newName } = this.props;
    const { questionId, count } = this.state;
    console.log(questionId);
    if (count === magicNumber2) {
      return newName();
    }
    const difficult = questions[questionId].difficulty;
    const arrOfQuestions = [questions[questionId].incorrect_answers,
      questions[questionId].correct_answer].flat();
    const shuffledArray = arrOfQuestions.sort(() => magicNumber - Math.random());
    this.setState({
      correctAnswer: questions[questionId].correct_answer,
      allAnswer: shuffledArray,
      difficulty: difficult,
    });
  }

  render() {
    const { questions } = this.props;
    const { questionId, correctAnswer, allAnswer, disableBtn, click } = this.state;
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
                    id="correct"
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
            { click && (
              <button
                type="button"
                name="next"
                data-testid="btn-next"
                onClick={ this.handleClick }
              >
                next
              </button>) }
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

export default connect(mapStateToProps)(GameArea);
