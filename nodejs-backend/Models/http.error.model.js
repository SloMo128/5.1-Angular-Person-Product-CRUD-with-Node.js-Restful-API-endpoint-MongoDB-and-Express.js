const mongoose = require('mongoose');

const HttpErrorCode = mongoose.Schema({
  code: Number,
  message: String
});

module.exports = mongoose.model('httpcodemessages', HttpErrorCode);