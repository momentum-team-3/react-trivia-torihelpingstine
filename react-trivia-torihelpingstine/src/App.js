/* globals fetch */
import React from 'react'
import './App.css'
import TriviaQuiz from './components/TriviaQuiz'

// TODO Look at classnames library and try it out

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedCategory: null,
      categories: []
    }
  }

  componentDidMount () {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.trivia_categories })
      })
  }

  render () {
    const categories = this.state.categories
    let body
    if (this.state.selectedCategory !== null) {
      body = (
        <div>
          <TriviaQuiz
            category={this.state.selectedCategory}
          />
          <p>
            <button onClick={() => this.setState({ selectedCategory: null })}>
            Back to categories
            </button>
          </p>
        </div>
      )
    } else {
      body = (
        <div>
          <h1>Trivia</h1>
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <button onClick={() => this.setState({ selectedCategory: category })}>{category.name}</button>
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
