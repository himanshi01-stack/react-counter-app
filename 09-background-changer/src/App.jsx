import { useState } from 'react'
import './App.css'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ff7f50')
  const [textColor, setTextColor] = useState('white')
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderWidth, setBorderWidth] = useState(3)

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
    setBackgroundColor(randomColor)
  }

  const setPresetColor = (color) => {
    setBackgroundColor(color)
  }

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]

  const presetColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

  return (
    <div className="app-container" style={{ background: backgroundColor, transition: 'background 0.3s ease' }}>
      <div className="controls-panel">
        <h1 style={{ color: textColor }}>🎨 Background Changer</h1>

        <div className="control-section">
          <label>Background Color</label>
          <div className="color-picker-group">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="color-input"
            />
            <button onClick={generateRandomColor} className="btn random-btn">
              Random
            </button>
          </div>
        </div>

        <div className="control-section">
          <label>Preset Colors</label>
          <div className="preset-colors">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setPresetColor(color)}
                className="preset-btn"
                style={{
                  backgroundColor: color,
                  border: backgroundColor === color ? '3px solid white' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div className="control-section">
          <label>Gradients</label>
          <div className="gradients">
            {gradients.map((gradient, index) => (
              <button
                key={index}
                onClick={() => setBackgroundColor(gradient)}
                className="gradient-btn"
                style={{
                  background: gradient,
                  border: backgroundColor === gradient ? '3px solid white' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div className="control-section">
          <label>Text Color</label>
          <div className="text-color-options">
            {['white', 'black', '#333', '#666'].map((color) => (
              <button
                key={color}
                onClick={() => setTextColor(color)}
                className={`text-btn ${textColor === color ? 'active' : ''}`}
                style={{
                  color: color,
                  borderColor: textColor === color ? color : 'transparent',
                }}
              >
                Text
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <label>Border Style</label>
          <div className="border-options">
            {['solid', 'dashed', 'dotted', 'double'].map((style) => (
              <button
                key={style}
                onClick={() => setBorderStyle(style)}
                className={`border-btn ${borderStyle === style ? 'active' : ''}`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <label>Border Width: {borderWidth}px</label>
          <input
            type="range"
            min="0"
            max="10"
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div
          className="preview-box"
          style={{
            border: `${borderWidth}px ${borderStyle} rgba(255,255,255,0.5)`,
            color: textColor
          }}
        >
          <p>Preview</p>
          <code>Background: {backgroundColor}</code>
        </div>
      </div>
    </div>
  )
}

export default App
