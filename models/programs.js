const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
    _id: String,
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Program', programSchema);