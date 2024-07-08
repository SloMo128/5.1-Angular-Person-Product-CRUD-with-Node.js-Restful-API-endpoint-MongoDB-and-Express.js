const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  company: String,
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'person2' },
});

module.exports = mongoose.model('product2', ProductSchema);
