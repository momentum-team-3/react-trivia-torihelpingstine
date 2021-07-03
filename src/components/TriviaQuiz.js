/* globals fetch */

import React from 'react'
import Question from './Question'
import Confetti from 'react-confetti'

class TriviaQuiz extends React.Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      currentQuestionIdx: 0,
      score: 0,
      loading: true,
      currentQuestionCorrect: null
    }
  }

  componentDidMount () {
    let url = 'https://opentdb.com/api.php?amount=' + this.props.questions + '&category=' + this.props.category.id
    if (this.props.difficulty !== 'any') {
      url += '&difficulty=' + this.props.difficulty
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ questions: data.results, loading: false })
      })
  }

  render () {
    const { category } = this.props
    const { questions, currentQuestionIdx, score, loading, currentQuestionCorrect } = this.state
    const currentQuestion = questions[currentQuestionIdx]
    const isDone = currentQuestionIdx === questions.length

    if (loading) {
      return <h1>Loading...</h1>
    }
    let displayQuestionEval
    if (currentQuestionCorrect === true) {
      displayQuestionEval = <p className='correctDisplay'> Correct! </p>
    } else if (currentQuestionCorrect === false) {
      displayQuestionEval = <p className='wrongDisplay'> Wrong, the correct answer was <span className='rightAnswer'> {questions[currentQuestionIdx].correct_answer}</span></p>
    }

    if (isDone) {
      return (
        <div className='TriviaQuiz'>
          <Confetti />
          <h1>{category.name}</h1>
          <h2>Your final score is {score}/{questions.length}.</h2>
        </div>
      )
    }

    return (
      <div className='TriviaQuestion'>
        <h1>{category.name} </h1>
        <div> {displayQuestionEval} </div>
        <Question
          question={currentQuestion}
          onAnswer={(correct) => {
            if (this.state.answered) {
              return
            }
            if (correct) {
              this.setState({
                score: this.state.score + 1,
                answered: true,
                lastQuestionCorrect: true,
                currentQuestionCorrect: true
              })
            } else {
              this.setState({
                answered: true,
                currentQuestionCorrect: false
              })
            }
          }}
        />
        <h2> Score: {score}</h2>
        <div className='quiz-buttons'>
          <button
            disabled={!this.state.answered}
            className='next'
            onClick={() => {
              this.setState({
                currentQuestionIdx: currentQuestionIdx + 1,
                currentQuestionCorrect: null,
                answered: false
              })
            }}
          >
            Next Question
          </button>
          <button
            className='backCats'
            onClick={this.props.handleBackToCategories}>
              Back to Categories
          </button>
        </div>

      </div>
    )
  }
}

export default TriviaQuiz
