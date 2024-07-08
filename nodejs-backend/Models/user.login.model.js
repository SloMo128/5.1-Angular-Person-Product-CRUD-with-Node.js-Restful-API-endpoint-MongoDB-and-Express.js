const mongoose = require('mongoose');

const UserLoginSchema = mongoose.Schema({
  userName: String,
  password: String,
  profile_code: String,
  admin: Boolean
});

module.exports = mongoose.model('userlogins', UserLoginSchema);