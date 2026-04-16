require('dotenv').config()

const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
  console.log('Usage:')
  console.log('node mongo.js <password>')
  console.log('node mongo.js <password> "Name Here" <number>')
  process.exit(1)
}

const uri =
  process.env.MONGODB_URI ||
  `mongodb+srv://fullstack:${password}@cluster0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
