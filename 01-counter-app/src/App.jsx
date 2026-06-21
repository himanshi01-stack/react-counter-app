import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="container">
      <h1>Counter App</h1>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button onClick={decrement} className="btn btn-danger">
          Decrement
        </button>
        <button onClick={reset} className="btn btn-warning">
          Reset
        </button>
        <button onClick={increment} className="btn btn-success">
          Increment
        </button>
      </div>
    </div>
  )
}

export default App
