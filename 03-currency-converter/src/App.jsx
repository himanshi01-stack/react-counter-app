import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [exchangeRate, setExchangeRate] = useState(null)
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [loading, setLoading] = useState(false)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK']

  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  const fetchExchangeRate = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      )
      const data = await response.json()
      const rate = data.rates[toCurrency]
      setExchangeRate(rate)
      setConvertedAmount((amount * rate).toFixed(2))
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
    }
    setLoading(false)
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    setAmount(value)
    if (exchangeRate) {
      setConvertedAmount((value * exchangeRate).toFixed(2))
    }
  }

  return (
    <div className="container">
      <h1>💱 Currency Converter</h1>
      
      <div className="converter-box">
        <div className="input-group">
          <label>From</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="amount-input"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="currency-select"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleSwap} className="swap-btn">
          ⇄
        </button>

        <div className="input-group">
          <label>To</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={convertedAmount || 0}
              readOnly
              placeholder="Converted amount"
              className="amount-input"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="currency-select"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {exchangeRate && (
        <div className="rate-info">
          <p>1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</p>
          {loading && <p className="loading">Updating...</p>}
        </div>
      )}
    </div>
  )
}

export default App
