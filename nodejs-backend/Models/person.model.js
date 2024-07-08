const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
});

module.exports = mongoose.model('person2', PersonSchema);
