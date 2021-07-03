import React from 'react'
import { randomLightColor, shuffleArray } from '../utils'

class Question extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (this.props.question === nextProps.question) {
      return false
    }
    return true
  }

  render () {
    const { question, onAnswer } = this.props
    let answers = []
    answers.push(question.correct_answer)
    answers = answers.concat(question.incorrect_answers)
    answers = shuffleArray(answers)
  
    return (
      <div className="Question">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
        <ul className='answer-list'>
          {answers.map(answer => (
            <li key={answer}>
              <button
                style={{ backgroundColor: randomLightColor() }}
                onClick={() => onAnswer(answer === question.correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


export default Question