import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  if (props.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <p>
        {props.name} {props.number}
      </p>
    )
  }
}

const Filter = (props) => {
  return (
    <>
      Filter by name:
      <input
        value={props.value}
        onChange={props.handleFilterChange}
      />
    </>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons.map(person =>
        <Person filter={filter} name={person.name} number={person.number} key={person.name} />
      )}
    </>
  );
};


const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name:
        <input
          value={props.valueName}
          onChange={props.onNameChange}
        />
      </div>
      <div>
        Number:
        <input
          value={props.valueNumber}
          onChange={props.onNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    if (!persons.find(isFound)) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  const isFound = (person) => {
    return person.name === newName
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} handleFilterChange={(event) => setFilter(event.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        valueNumber={newNumber}
        valueName={newName}
        onNumberChange={(event => setNewNumber(event.target.value))}
        onNameChange={(event => setNewName(event.target.value))}
      />

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )

}

export default App