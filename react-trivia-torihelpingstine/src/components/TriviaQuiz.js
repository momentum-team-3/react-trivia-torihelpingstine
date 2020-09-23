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
    }
  }

  componentDidMount () {
    fetch('https://opentdb.com/api.php?amount=10&category=' + this.props.category.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ questions: data.results, loading: false })
      })
  }

  render () {
    const { category } = this.props
    const { questions, currentQuestionIdx, score, loading } = this.state
    const currentQuestion = questions[currentQuestionIdx]
    const isDone = currentQuestionIdx === questions.length

    if (loading) {
      return <h1>Loading...</h1>
    }

    if (isDone) {
      return (
        <div className='TriviaQuiz'>
          <h1>{category.name}</h1>
          <h2>Your final score was {score}/{questions.length}.</h2>
        </div>  
      )
    }

    return (
      <div className='TriviaQuiz'>
        <h1>{category.name}</h1>
        <h2>Score: {score}</h2>
        <Question 
          question={currentQuestion} 
          onAnswer={(correct) => {
            if (correct) {
              this.setState({
                score: score + 1,
                currentQuestionIdx: currentQuestionIdx + 1,
                lastQuestionCorrect: true
              })
            } else {
              this.setState({
                currentQuestionIdx: currentQuestionIdx + 1
              })
            }
          }}
        />  
      </div>
    )
  }
}

export default TriviaQuiz
