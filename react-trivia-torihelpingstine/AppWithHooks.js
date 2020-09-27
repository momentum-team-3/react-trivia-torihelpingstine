/* globals fetch */
import React, { useState, useEffect } from 'react'
import './App.css'
import TriviaQuiz from './components/TriviaQuiz'
import { randomLightColor } from './utils'

function AppWithHooks () {
  // const stuff = useState(null)
  // const selectedCategory = stuff[0]
  // const setSelectedCategory = stuff[1]
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.trivia_categories)
      })
  }, [])

  let body
  if (selectedCategory !== null) {
    body = (
      <div>
        <TriviaQuiz
          category={selectedCategory}
        />
        <p>
          <button onClick={() => setSelectedCategory(null)}>
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
        <ul className='category-list'>
          {categories.map(category => (
            <li key={category.id}>
              <button 
                style={{ backgroundColor: randomLightColor() }}
                onClick={() => setSelectedCategory(category)}
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

export default AppWithHooks
