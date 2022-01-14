import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameArea extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions[0]);
    // const first = questions[0];
    // const { category, question, correct_answer } = first;
    // console.log(first);

    if (questions.length > 0) {
      return (
        <main>
          <h2 data-testid="question-category">
            { questions[0].category }
          </h2>
          <span data-testid="question-text">
            { questions[0].question }
          </span>
          <div data-testid="answer-options">
            <button type="button" data-testid="correct-answer">
              { questions[0].correct_answer }
            </button>
            <button type="button" data-testid={`wrong-answer`}>
              { questions[0].incorrect_answers[0] }
            </button>
            <button type="button" data-testid={`wrong-answer`}>
              { questions[0].incorrect_answers[1] }
            </button>
            <button type="button" data-testid={`wrong-answer`}>
              { questions[0].incorrect_answers[2] }
            </button>
          </div>
        </main>
      );
    }
    return <h1>Carregando...</h1>;
  }
}
const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(GameArea);
