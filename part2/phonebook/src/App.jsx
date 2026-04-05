import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} already exists, replace number?`)) {
        const updatedPerson = { ...existing, number: newNumber }

        personService
          .update(existing.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(p => 
              p.id !== existing.id ? p : returned
            ))
            setMessage(`Updated ${returned.name}`)
            setTimeout(() => setMessage(null), 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(`Information of ${existing.name} has already been removed from server`)
            setTimeout(() => setMessage(null), 3000)
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson).then(returned => {
      setPersons(persons.concat(returned))
      setMessage(`Added ${returned.name}`)
      setTimeout(() => setMessage(null), 3000)
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage(`Deleted person`)
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(() => {
        setMessage('Person already deleted from server')
        setTimeout(() => setMessage(null), 3000)
      })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filter={filter} handleFilter={(e) => setFilter(e.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumber={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
