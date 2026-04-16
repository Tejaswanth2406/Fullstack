const { randomUUID } = require('crypto')
const Person = require('../models/person')

const initialPersons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

let memoryPersons = [...initialPersons]

const hasDatabase = Boolean(process.env.MONGODB_URI)

const createHttpError = (message, statusCode) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

const validatePersonPayload = ({ name, number }, existingId = null) => {
  if (!name || !number) {
    throw createHttpError('name and number are required', 400)
  }

  const trimmedName = name.trim()
  const trimmedNumber = number.trim()

  if (trimmedName.length < 3) {
    throw createHttpError(
      'Person validation failed: name: Path `name` is shorter than the minimum allowed length (3).',
      400
    )
  }

  if (trimmedNumber.length < 8) {
    throw createHttpError('Person validation failed: number must be at least 8 characters long.', 400)
  }

  const phonePattern = /^\d{2,3}-\d+$/

  if (!phonePattern.test(trimmedNumber)) {
    throw createHttpError(
      'Person validation failed: number must be in the format XX-XXXXXXXX or XXX-XXXXXXXX.',
      400
    )
  }

  if (trimmedNumber.split('-')[1].length < 5) {
    throw createHttpError(
      'Person validation failed: number must include at least five digits after the hyphen.',
      400
    )
  }

  const duplicate = memoryPersons.find(
    (person) => person.name.toLowerCase() === trimmedName.toLowerCase() && person.id !== existingId
  )

  if (duplicate) {
    throw createHttpError('name must be unique', 400)
  }

  return { name: trimmedName, number: trimmedNumber }
}

const getAll = async () => {
  if (hasDatabase) {
    return Person.find({})
  }

  return memoryPersons
}

const getById = async (id) => {
  if (hasDatabase) {
    return Person.findById(id)
  }

  return memoryPersons.find((person) => person.id === id) || null
}

const remove = async (id) => {
  if (hasDatabase) {
    const removedPerson = await Person.findByIdAndDelete(id)
    return Boolean(removedPerson)
  }

  const personExists = memoryPersons.some((person) => person.id === id)
  memoryPersons = memoryPersons.filter((person) => person.id !== id)
  return personExists
}

const create = async ({ name, number }) => {
  if (hasDatabase) {
    const person = new Person({ name, number })
    return person.save()
  }

  const validPerson = validatePersonPayload({ name, number })
  const id = String(Math.floor(Math.random() * 1000000))

  const newPerson = {
    id: memoryPersons.some((person) => person.id === id) ? randomUUID() : id,
    ...validPerson
  }

  memoryPersons = memoryPersons.concat(newPerson)
  return newPerson
}

const update = async (id, { name, number }) => {
  if (hasDatabase) {
    return Person.findByIdAndUpdate(
      id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
  }

  const existingPerson = memoryPersons.find((person) => person.id === id)

  if (!existingPerson) {
    return null
  }

  const validPerson = validatePersonPayload(
    { name: name ?? existingPerson.name, number: number ?? existingPerson.number },
    id
  )

  const updatedPerson = { ...existingPerson, ...validPerson }
  memoryPersons = memoryPersons.map((person) => (person.id === id ? updatedPerson : person))
  return updatedPerson
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update
}
