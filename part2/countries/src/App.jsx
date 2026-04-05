import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (filtered.length === 1) {
      const capital = filtered[0].capital[0]
      const api_key = import.meta.env.VITE_API_KEY
      
      if (api_key) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
          .then(response => {
            setWeather(response.data)
          })
          .catch(error => {
            console.error('Error fetching weather:', error)
          })
      }
    }
  }, [filtered.length]) // Use length to avoid re-fetching if filtered array changes but not the count

  return (
    <div>
      find countries: 
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      <div>
        {filtered.length > 10 && <p>Too many matches, specify another filter</p>}

        {filtered.length <= 10 && filtered.length > 1 &&
          filtered.map(country => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => setSearch(country.name.common)}>
                show
              </button>
            </div>
          ))
        }

        {filtered.length === 1 && (
          <div>
            <h2>{filtered[0].name.common}</h2>
            <p>Capital: {filtered[0].capital[0]}</p>
            <p>Area: {filtered[0].area}</p>

            <h3>Languages</h3>
            <ul>
              {Object.values(filtered[0].languages).map(lang => 
                <li key={lang}>{lang}</li>
              )}
            </ul>

            <img 
              src={filtered[0].flags.png} 
              alt={`flag of ${filtered[0].name.common}`} 
              width="150"
            />

            {weather && (
              <div>
                <h3>Weather in {filtered[0].capital[0]}</h3>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                  alt="weather icon" 
                />
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
