const express = require("express");
const productRoutes = express.Router();
const product = require('../Controllers/controller.product');

// POST per aggiungere una lista di prodotti
productRoutes.post('/addproductperson', product.addProductPerson);

productRoutes.put('/updateproduct/:id', product.update);

productRoutes.get('/filter/', product.findProducts);

productRoutes.get('/person/:person_id', product.findByQueryPersonProduct);

productRoutes.get('/:id', product.findById);

//insert - using post to add a new product
productRoutes.delete('/deleteInter/:person_id/:product_id', product.deleteInterazione);

productRoutes.delete('/deleteproduct/:id', product.delete);

module.exports = productRoutes;