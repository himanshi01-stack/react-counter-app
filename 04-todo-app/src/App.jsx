import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="container">
      <h1>📝 My Todos</h1>
      
      <div className="progress">
        <p>{completedCount} of {todos.length} completed</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: todos.length ? `${(completedCount / todos.length) * 100}%` : '0%' }}></div>
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="input"
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>

      <div className="todos-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
