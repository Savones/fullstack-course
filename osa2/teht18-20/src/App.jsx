import { useState, useEffect } from 'react'
import countryService from './services/countryService'

const Filter = (props) => {
  return (
    <>
      Find countries:
      <input
        value={props.value}
        onChange={props.handleFilterChange}
      />
    </>
  )
}

const CountryNames = (props) => {
  if (props.filtered > 10) {
    return (
      <div>
        Too many matches, specify the filter
      </div>
    )
  } else if (props.filtered != 1) {
    return (
      <div>
        {props.names.map(name =>
          <CountryName filter={props.filter} name={name} key={name} />
        )}
      </div>
    )
  } else {
    return (
      <div>
        {props.names.map(name =>
          <CountryInfo countryInfo={props.countryInfo} filter={props.filter} name={name} key={name} />
        )}
      </div>
    )
  }
}

const CountryInfo = (props) => {
  if (props.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <>
        <h1>{props.countryInfo[0]}</h1>
        <p>Capital: {props.countryInfo[1]}</p>
        <p>Area: {props.countryInfo[2]}</p>
        <p>Languages: {props.countryInfo[4]}</p>
        {props.countryInfo[3]}
      </>
    )
  }
}

const CountryName = (props) => {
  if (props.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <p>
        {props.name}
      </p>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState(0)
  const [countryInfo, setCountryInfo] = useState([])

  const hook = () => {
    countryService
      .getAll()
      .then(returnedCountries => {
        const newCountries = returnedCountries.map(c => c.name.common)
        setCountries(newCountries)
        setFiltered(newCountries.length)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setFilter(newFilter)
    const filteredCount = countries.filter(name => name.toLowerCase().includes(newFilter)).length
    setFiltered(filteredCount)
    if (filteredCount == 1) {
      countryService
        .getInfo(countries.filter(name => name.toLowerCase().includes(newFilter)))
        .then(responseData => {
          setCountryInfo([
            responseData.name.common,
            responseData.capital,
            responseData.area,
            responseData.flag,
            Object.values(responseData.languages).join(", ")
          ])
        })
    }
  }


  return (
    <>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <CountryNames countryInfo={countryInfo} filtered={filtered} filter={filter} names={countries} />
    </>
  )
}

export default App
