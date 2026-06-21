import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('#667eea')
  const [inputColor, setInputColor] = useState('667eea')
  const [rgbColor, setRgbColor] = useState({ r: 102, g: 126, b: 234 })
  const [hslColor, setHslColor] = useState({ h: 226, s: 68, l: 66 })
  const [copied, setCopied] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5'
  }, [theme])

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('').toUpperCase()
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const handleColorChange = (hex) => {
    setColor(hex)
    setInputColor(hex.slice(1))
    const rgb = hexToRgb(hex)
    setRgbColor(rgb)
    setHslColor(rgbToHsl(rgb.r, rgb.g, rgb.b))
  }

  const handleHexInput = (e) => {
    let hex = e.target.value
    if (!hex.startsWith('#')) hex = '#' + hex
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      handleColorChange(hex)
      setInputColor(hex.slice(1))
    } else {
      setInputColor(e.target.value)
    }
  }

  const copyToClipboard = (text, format) => {
    navigator.clipboard.writeText(text)
    setCopied(format)
    setTimeout(() => setCopied(''), 2000)
  }

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
    handleColorChange(randomColor)
  }

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <h1>🎨 Color Picker</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="theme-btn">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="color-display" style={{ backgroundColor: color }}></div>

      <div className="input-section">
        <input type="color" value={color} onChange={(e) => handleColorChange(e.target.value)} className="color-input" />
        <input type="text" value={inputColor} onChange={handleHexInput} placeholder="HEX" className="hex-input" />
        <button onClick={generateRandomColor} className="random-btn">Random</button>
      </div>

      <div className="color-values">
        <div className="value-box">
          <label>HEX</label>
          <code>{color}</code>
          <button onClick={() => copyToClipboard(color, 'hex')} className={`copy-btn ${copied === 'hex' ? 'copied' : ''}`}>
            {copied === 'hex' ? '✓' : 'Copy'}
          </button>
        </div>

        <div className="value-box">
          <label>RGB</label>
          <code>rgb({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</code>
          <button onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, 'rgb')} className={`copy-btn ${copied === 'rgb' ? 'copied' : ''}`}>
            {copied === 'rgb' ? '✓' : 'Copy'}
          </button>
        </div>

        <div className="value-box">
          <label>HSL</label>
          <code>hsl({hslColor.h}, {hslColor.s}%, {hslColor.l}%)</code>
          <button onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`, 'hsl')} className={`copy-btn ${copied === 'hsl' ? 'copied' : ''}`}>
            {copied === 'hsl' ? '✓' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
