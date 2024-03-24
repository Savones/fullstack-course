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