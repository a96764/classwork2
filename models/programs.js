const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  name: String,
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Program', programSchema);