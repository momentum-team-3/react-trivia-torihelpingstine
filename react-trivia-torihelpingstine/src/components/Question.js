import React from 'react'
import { shuffleArray } from '../utils'

function Question ({ question, onAnswer }) {
  let answers = []
  answers.push(question.correct_answer)
  answers = answers.concat(question.incorrect_answers)
  answers = shuffleArray(answers)

  return (
    <div className="Question">
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
    
      <ul>
        {answers.map(answer => (
          <li key={answer}>
            <button 
              onClick={() => onAnswer(answer === question.correct_answer)}
              dangerouslySetInnerHTML={{ __html: answer }} />              
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Question