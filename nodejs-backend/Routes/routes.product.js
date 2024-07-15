const express = require("express");
const productRoutes = express.Router();
const product = require('../Controllers/controller.product');

// POST per aggiungere una lista di prodotti
productRoutes.post('/addproductperson', product.addProductPerson);

productRoutes.get('/filter/', product.findProducts);

productRoutes.get('/:person_id', product.findByQueryPersonProduct);
productRoutes.put('/updateproduct/:id', product.update);

productRoutes.get('/:id', product.findById);

//productRoutes.get('/person/:person_id', product.findByQuery);
//insert - using post to add a new product
productRoutes.post('/addproduct', product.create);


productRoutes.delete('/deleteproduct/:id', product.delete);

module.exports = productRoutes;