const CountryList = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) {
    return null
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
