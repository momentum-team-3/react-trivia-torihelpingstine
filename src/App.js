/* globals fetch */
import React from 'react'
import './App.css'
import TriviaQuiz from './components/TriviaQuiz'
import { randomLightColor } from './utils'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedCategory: null,
      categories: [],
      difficulty: 'any',
      questions: 10
    }
  }

  componentDidMount () {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.trivia_categories })
      })
  }

  clearSelectedCategory () {
    this.setState({ selectedCategory: null })
  }

  render () {
    const categories = this.state.categories
    let body
    if (this.state.selectedCategory !== null) {
      body = (
        <div>
          <TriviaQuiz
            questions={this.state.questions}
            difficulty={this.state.difficulty}
            category={this.state.selectedCategory}
          />
          <p>
            <button
              className='backCats'
              onClick={() => this.clearSelectedCategory()}
            >
            Back to categories
            </button>
          </p>
        </div>
      )
    } else {
      body = (
        <div>
          <h1>
            <u>Trivia Game!</u>
            <p> Choose a Category to Play</p>
          </h1>
          <div className="game-options">
            <div className="option">
              <label>Select difficulty:</label>
              <select
                onChange={(event) => { this.setState({ difficulty: event.target.value }) }} value={this.state.difficulty}
              >
                <option value='any'>Any difficulty</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
            <div className="option">
              Number of questions:
              <input type='number' min='5' max='40' onChange={(event) => { this.setState({ questions: event.target.value }) }} value={this.state.questions} />

            </div>
          </div>
          <ul className='category-list'>
            {categories.map(category => (
              <li key={category.id}>
                <button
                  style={{ backgroundColor: randomLightColor() }}
                  onClick={() => this.setState({ selectedCategory: category })}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className='App'>
        {body}
      </div>
    )
  }
}

export default App
