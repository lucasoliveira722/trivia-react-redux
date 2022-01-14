import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameArea extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions[0]);
    // const first = questions[0];
    // const { category, question, correct_answer } = first;
    // console.log(first);
    return (
      <main>
        Olha o game aí
        <h2 data-testid="question-category">
          {/* { category } */}
        </h2>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(GameArea);
