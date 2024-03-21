import { useState } from 'react'

const Person = (props) => {
  if (props.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <p>
        {props.name} {props.number}
      </p>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (!persons.find(isFound)) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  const isFound = (person) => {
    return person.name === newName
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      Filter by name:
      <input
        value={filter}
        onChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          Name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person filter={filter} name={person.name} number={person.number} key={person.name} />
        )}
      </div>
    </div>
  )

}

export default App