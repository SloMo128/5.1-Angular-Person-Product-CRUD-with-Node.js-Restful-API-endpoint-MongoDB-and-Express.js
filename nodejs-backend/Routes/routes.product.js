const express = require("express");
const productRoutes = express.Router();
const product = require('../Controllers/controller.product');

productRoutes.get('/filter/', product.findProducts);

productRoutes.get('/:person_id', product.findByQueryPersonProduct);

//productRoutes.get('/person/:person_id', product.findByQuery);

productRoutes.get('/:id', product.findById);

//insert - using post to add a new product
productRoutes.post('/addproduct', product.create);

productRoutes.put('/updateproduct/:id', product.update);

productRoutes.delete('/deleteproduct/:id', product.delete);

module.exports = productRoutes;