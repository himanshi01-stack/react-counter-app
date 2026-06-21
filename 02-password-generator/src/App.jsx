import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('Password')
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
    setCopied(false)
  }, [length, numberAllowed, charAllowed])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>
      
      <div className="password-display">
        <input
          type="text"
          value={password}
          readOnly
          className="password-input"
        />
        <button onClick={copyToClipboard} className="copy-btn">
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>
            Length: <span className="length-value">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            Include Special Characters
          </label>
        </div>

        <button onClick={generatePassword} className="generate-btn">
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App
