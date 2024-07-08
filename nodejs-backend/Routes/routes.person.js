const express = require("express");
const personRoutes = express.Router();
const person = require('../Controllers/controllers.person');


//read - get all products from the json file
personRoutes.get('/listperson' , person.findAll);

personRoutes.get('/:id', person.findById);

//insert - using post to add a new product
personRoutes.post('/addperson', person.create);

personRoutes.put('/updateperson/:id', person.update);

personRoutes.delete('/deleteperson/:id', person.delete);

module.exports = personRoutes;