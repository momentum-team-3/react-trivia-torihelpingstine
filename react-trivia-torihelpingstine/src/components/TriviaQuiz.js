/* globals fetch */

import React from 'react'
import Question from './Question'

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
      displayQuestionEval = <p className='correctDisplay'> Previous answer was correct! </p>
    } else if (currentQuestionCorrect === false) {
      displayQuestionEval = <p className='wrongDisplay'> Previous answer was wrong, the correct answer was <a className='rightAnswer'> {questions[currentQuestionIdx - 1].correct_answer}</a></p>
    }

    if (isDone) {
      return (
        <div className='TriviaQuiz'>
          <h1>{category.name}</h1>
          <h2>Your final score is {score}/{questions.length}.</h2>
        </div>
      )
    }

    return (
      <div className='TriviaQuiz'>
        <h1>{category.name} </h1>
        <div> {displayQuestionEval} </div>
        <Question
          question={currentQuestion}
          onAnswer={(correct) => {
            if (correct) {
              this.setState({
                score: score + 1,
                currentQuestionIdx: currentQuestionIdx + 1,
                lastQuestionCorrect: true,
                currentQuestionCorrect: true

              })
            } else {
              this.setState({
                currentQuestionIdx: currentQuestionIdx + 1,
                currentQuestionCorrect: false
              })
            }
          }}
        />
        <h2> Score: {score}</h2>
      </div>
    )
  }
}

export default TriviaQuiz
