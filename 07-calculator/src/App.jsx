import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [newNumber, setNewNumber] = useState(true)
  const [history, setHistory] = useState([])

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num))
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperation = (op) => {
    const current = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(current)
    } else if (operation) {
      const result = calculate(previousValue, current, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current
      case '-': return prev - current
      case '*': return prev * current
      case '/': return prev / current
      case '%': return prev % current
      default: return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation)
      setHistory([...history, `${previousValue} ${operation} ${display} = ${result}`])
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
      setNewNumber(false)
    }
  }

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  return (
    <div className="container">
      <h1>🧮 Calculator</h1>
      
      <div className="calculator">
        <div className="display">{display}</div>

        <div className="buttons">
          <button onClick={handleClear} className="btn clear-btn">C</button>
          <button onClick={handleBackspace} className="btn delete-btn">⌫</button>
          <button onClick={() => handleOperation('%')} className="btn operator-btn">%</button>
          <button onClick={() => handleOperation('/')} className="btn operator-btn">÷</button>

          <button onClick={() => handleNumber(7)} className="btn">7</button>
          <button onClick={() => handleNumber(8)} className="btn">8</button>
          <button onClick={() => handleNumber(9)} className="btn">9</button>
          <button onClick={() => handleOperation('*')} className="btn operator-btn">×</button>

          <button onClick={() => handleNumber(4)} className="btn">4</button>
          <button onClick={() => handleNumber(5)} className="btn">5</button>
          <button onClick={() => handleNumber(6)} className="btn">6</button>
          <button onClick={() => handleOperation('-')} className="btn operator-btn">-</button>

          <button onClick={() => handleNumber(1)} className="btn">1</button>
          <button onClick={() => handleNumber(2)} className="btn">2</button>
          <button onClick={() => handleNumber(3)} className="btn">3</button>
          <button onClick={() => handleOperation('+')} className="btn operator-btn">+</button>

          <button onClick={() => handleNumber(0)} className="btn zero">0</button>
          <button onClick={handleDot} className="btn">.</button>
          <button onClick={handleEquals} className="btn equals-btn">=</button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">{item}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
