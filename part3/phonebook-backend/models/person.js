const mongoose = require('mongoose')

if (process.env.MONGODB_URI) {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message)
    })
}

const phoneValidator = {
  validator: (value) => {
    if (value.length < 8) {
      return false
    }

    const match = value.match(/^(\d{2,3})-(\d+)$/)

    if (!match) {
      return false
    }

    return match[2].length >= 5
  },
  message: (props) =>
    `${props.value} is not a valid phone number. Use format XX-XXXXX or XXX-XXXXX with at least 8 characters.`
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    validate: phoneValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
