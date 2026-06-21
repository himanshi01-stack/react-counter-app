import { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100
      const bmiValue = weight / (heightInMeters * heightInMeters)
      setBmi(bmiValue.toFixed(1))
      
      if (bmiValue < 18.5) {
        setCategory('Underweight')
      } else if (bmiValue < 25) {
        setCategory('Normal Weight')
      } else if (bmiValue < 30) {
        setCategory('Overweight')
      } else {
        setCategory('Obese')
      }
    }
  }

  const reset = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
  }

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight':
        return '#3498db'
      case 'Normal Weight':
        return '#2ecc71'
      case 'Overweight':
        return '#f39c12'
      case 'Obese':
        return '#e74c3c'
      default:
        return '#667eea'
    }
  }

  return (
    <div className="container">
      <h1>⚖️ BMI Calculator</h1>
      
      <div className="calculator-box">
        <div className="input-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            className="input"
          />
        </div>

        <div className="input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="input"
          />
        </div>

        <button onClick={calculateBMI} className="calculate-btn">Calculate BMI</button>
      </div>

      {bmi && (
        <div className="result" style={{ borderLeftColor: getCategoryColor() }}>
          <div className="bmi-value" style={{ color: getCategoryColor() }}>
            {bmi}
          </div>
          <div className="bmi-category" style={{ color: getCategoryColor() }}>
            {category}
          </div>
          
          <div className="bmi-info">
            <p className="info-text">BMI Categories:</p>
            <div className="categories">
              <div className="cat-item">
                <span className="cat-color" style={{ backgroundColor: '#3498db' }}></span>
                <span>Underweight: &lt; 18.5</span>
              </div>
              <div className="cat-item">
                <span className="cat-color" style={{ backgroundColor: '#2ecc71' }}></span>
                <span>Normal: 18.5 - 24.9</span>
              </div>
              <div className="cat-item">
                <span className="cat-color" style={{ backgroundColor: '#f39c12' }}></span>
                <span>Overweight: 25 - 29.9</span>
              </div>
              <div className="cat-item">
                <span className="cat-color" style={{ backgroundColor: '#e74c3c' }}></span>
                <span>Obese: ≥ 30</span>
              </div>
            </div>
          </div>

          <button onClick={reset} className="reset-btn">Reset</button>
        </div>
      )}
    </div>
  )
}

export default App
