import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionsFromAPI } from '/home/guilherme/Documentos/Trybe/project/sd-016-b-project-trivia-react-redux/src/redux/actions/index.js';
// import { getQuestionsAPI, tokenFetch } from '/home/guilherme/Documentos/Trybe/project/sd-016-b-project-trivia-react-redux/src/services/index.js';

class GameArea extends Component {
  constructor() {
    super();

    this.state = {
      questionId: 0,
      correctAnswer: '',
      allAnswer: '',
      points: 0,
      disableBtn: false,
    };
  }

  async componentDidMount() {
    const { questionsFromAPI } = this.props;
    await questionsFromAPI(localStorage.getItem('token'));
    this.sortAnswer();
  }

  handleClick = async () => {
    // const { questionId, points } = this.state;
    // const countId = questionId + 1;
    // const countPoints = points + 1;
    // this.setState({
    //   questionId: countId,
    // });
    // if (name === 'correct') {
    //   this.setState({
    //     points: countPoints,
    //   });
    // }
    const wrong = document.getElementsByClassName('wrong');
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const correct = document.getElementsByClassName('correct')[0];
    correct.style.border = '3px solid rgb(6, 240, 15)';
  }

  timer = () => {
    let sec = 30;
    const timer = setInterval(() => {
      console.log(`00:${sec}`);
      sec -= 1;
      if (sec < 0) {
        this.setState({
          disableBtn: true,
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  sortAnswer = () => {
    const magicNumber = 0.5;
    const { questions } = this.props;
    const { questionId, allAnswer } = this.state;
    if (allAnswer === '') {
      const arrOfQuestions = [questions[questionId].incorrect_answers,
        questions[questionId].correct_answer].flat();
        // codigo de como dar um shufle no array tirado do site https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
      const shuffledArray = arrOfQuestions.sort(() => magicNumber - Math.random());
      this.setState({
        correctAnswer: questions[questionId].correct_answer,
        allAnswer: shuffledArray,
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
});
const mapDispatchToProps = (dispatch) => ({
  questionsFromAPI: (token) => dispatch(getQuestionsFromAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
