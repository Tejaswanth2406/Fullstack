const personsElement = document.getElementById('persons')
const notificationElement = document.getElementById('notification')
const formElement = document.getElementById('person-form')
const filterElement = document.getElementById('filter')
const nameElement = document.getElementById('name')
const numberElement = document.getElementById('number')

let persons = []
let filterValue = ''

const showNotification = (message, type = 'success') => {
  notificationElement.textContent = message
  notificationElement.className = `notification ${type}`

  window.clearTimeout(showNotification.timeoutId)
  showNotification.timeoutId = window.setTimeout(() => {
    notificationElement.className = 'notification hidden'
  }, 5000)
}

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data
}

const renderPersons = () => {
  const normalizedFilter = filterValue.trim().toLowerCase()
  const visiblePersons = persons.filter((person) =>
    person.name.toLowerCase().includes(normalizedFilter)
  )

  personsElement.innerHTML = ''

  visiblePersons.forEach((person) => {
    const item = document.createElement('li')
    item.className = 'person'
    item.innerHTML = `
      <div>
        <strong>${person.name}</strong>
        <span>${person.number}</span>
      </div>
      <div class="person-actions">
        <button class="secondary" data-id="${person.id}" data-action="edit">update</button>
        <button class="secondary" data-id="${person.id}" data-action="delete">delete</button>
      </div>
    `
    personsElement.appendChild(item)
  })
}

const loadPersons = async () => {
  persons = await request('/api/persons')
  renderPersons()
}

formElement.addEventListener('submit', async (event) => {
  event.preventDefault()

  const name = nameElement.value.trim()
  const number = numberElement.value.trim()
  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )

  try {
    if (existingPerson) {
      const updated = await request(`/api/persons/${existingPerson.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, number })
      })
      persons = persons.map((person) => (person.id === updated.id ? updated : person))
      showNotification(`Updated ${updated.name}`)
    } else {
      const created = await request('/api/persons', {
        method: 'POST',
        body: JSON.stringify({ name, number })
      })
      persons = persons.concat(created)
      showNotification(`Added ${created.name}`)
    }

    formElement.reset()
    renderPersons()
  } catch (error) {
    showNotification(error.message, 'error')
  }
})

filterElement.addEventListener('input', (event) => {
  filterValue = event.target.value
  renderPersons()
})

personsElement.addEventListener('click', async (event) => {
  const button = event.target.closest('button')

  if (!button) {
    return
  }

  const { id, action } = button.dataset
  const targetPerson = persons.find((person) => person.id === id)

  if (!targetPerson) {
    return
  }

  if (action === 'edit') {
    nameElement.value = targetPerson.name
    numberElement.value = targetPerson.number
    numberElement.focus()
    return
  }

  if (action === 'delete') {
    try {
      await request(`/api/persons/${id}`, { method: 'DELETE' })
      persons = persons.filter((person) => person.id !== id)
      renderPersons()
      showNotification(`Deleted ${targetPerson.name}`)
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }
})

loadPersons().catch((error) => {
  showNotification(error.message, 'error')
})
