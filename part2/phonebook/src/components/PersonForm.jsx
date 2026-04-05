const PersonForm = ({ addPerson, newName, handleName, newNumber, handleNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm
