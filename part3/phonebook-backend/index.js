require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const personService = require('./services/personService')

const app = express()
const PORT = process.env.PORT || 3001

morgan.token('body', (request) => {
  if (request.method !== 'POST' && request.method !== 'PUT') {
    return '-'
  }

  return JSON.stringify(request.body)
})

app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.static('public'))

app.get('/info', async (request, response, next) => {
  try {
    const persons = await personService.getAll()
    const timestamp = new Date()
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${timestamp}</p>`
    )
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await personService.getAll()
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await personService.getById(request.params.id)

    if (!person) {
      return response.status(404).json({ error: 'person not found' })
    }

    return response.json(person)
  } catch (error) {
    return next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const removed = await personService.remove(request.params.id)

    if (!removed) {
      return response.status(404).json({ error: 'person not found' })
    }

    return response.status(204).end()
  } catch (error) {
    return next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const createdPerson = await personService.create(request.body)
    response.status(201).json(createdPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const updatedPerson = await personService.update(request.params.id, request.body)

    if (!updatedPerson) {
      return response.status(404).json({ error: 'person not found' })
    }

    return response.json(updatedPerson)
  } catch (error) {
    return next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
})

app.use((error, request, response, next) => {
  void request
  void next

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  if (error.statusCode) {
    return response.status(error.statusCode).json({ error: error.message })
  }

  console.error(error.message)
  return response.status(500).json({ error: 'internal server error' })
})

app.listen(PORT, () => {
  console.log(`Phonebook server running on port ${PORT}`)
})
