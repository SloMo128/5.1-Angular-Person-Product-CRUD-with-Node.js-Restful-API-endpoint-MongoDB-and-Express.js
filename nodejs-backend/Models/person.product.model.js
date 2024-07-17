const mongoose = require('mongoose');

const PersonProductSchema = mongoose.Schema({
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'person2' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product2' },
    
});

module.exports = mongoose.model('person_products', PersonProductSchema);