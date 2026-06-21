import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) return
    
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&timezone=auto`
      )
      const data = await response.json()
      
      // Mock weather data for demonstration
      const mockWeather = {
        city: cityName,
        temperature: Math.round(15 + Math.random() * 20),
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
        humidity: Math.round(30 + Math.random() * 70),
        windSpeed: Math.round(5 + Math.random() * 30),
        feelsLike: Math.round(12 + Math.random() * 20),
        uvIndex: Math.round(Math.random() * 11),
        visibility: Math.round(5 + Math.random() * 10)
      }
      
      setWeather(mockWeather)
    } catch (err) {
      setError('Failed to fetch weather. Please try again.')
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(e.target.value)
    }
  }

  const getWeatherEmoji = (condition) => {
    switch (condition) {
      case 'Sunny':
        return '☀️'
      case 'Cloudy':
        return '☁️'
      case 'Rainy':
        return '🌧️'
      case 'Snowy':
        return '❄️'
      default:
        return '🌤️'
    }
  }

  return (
    <div className="container">
      <h1>🌍 Weather App</h1>
      
      <div className="search-section">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleSearch}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button onClick={() => fetchWeather()} className="search-btn">
          Search
        </button>
      </div>

      {loading && <div className="loader">Loading...</div>}
      
      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-card">
          <div className="weather-header">
            <div className="city-info">
              <h2>{weather.city}</h2>
              <p className="condition">{weather.condition} {getWeatherEmoji(weather.condition)}</p>
            </div>
            <div className="temperature">
              <span className="temp">{weather.temperature}°C</span>
              <p className="feels-like">Feels like {weather.feelsLike}°C</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div>
                <p className="detail-label">Humidity</p>
                <p className="detail-value">{weather.humidity}%</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">💨</span>
              <div>
                <p className="detail-label">Wind Speed</p>
                <p className="detail-value">{weather.windSpeed} km/h</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">👁️</span>
              <div>
                <p className="detail-label">Visibility</p>
                <p className="detail-value">{weather.visibility} km</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">☀️</span>
              <div>
                <p className="detail-label">UV Index</p>
                <p className="detail-value">{weather.uvIndex}/10</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="placeholder">
          <p>Enter a city name to get started</p>
        </div>
      )}
    </div>
  )
}

export default App
