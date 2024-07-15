const Product = require('../Models/product.model');
const PersonProductModel = require("../Models/person.product.model");

function isEmpty(obj) {

    return JSON.stringify(obj) === JSON.stringify({});
}

exports.findAll = (req, res) => {
    Product.find()
        .then(product => {
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `Product not found`
                });
            }
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving product."
            });
        });
};

//PRENDE L'ID DELLA PERSONA E STAMPA I PRODOTTI
exports.findByQueryPersonProduct = (req, res) => {
    const person_id = req.params.person_id;

    PersonProductModel.find({ person_id: person_id })
        .then(productPerson => {
            if (productPerson.length === 0) {
                return res.status(404).json({
                    message: `Product with this product id ${person_id} not found `
                });
            }

            const productId = productPerson.map(pp => pp.product_id);

            Product.find({ _id: { $in: productId } })
                .then(product => {
                    if (product.length === 0) {
                        return res.status(404).json({
                            message: `Product with id not found `
                        });
                    }
                    res.send(product);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while retrieving Product."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving Product."
            });
        });
};

exports.addProductPerson = async (req, res) => {
    PersonProductModel.create(req.body)
        .then(pp => {
            res.send(pp)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating the Person."
            })
        })
};

//FIND PRODUCT BI ID PERSON
exports.findByQuery = (req, res) => {
    const person_id = req.params.person_id;

    Product.find({ product: person_id })
        .then(product => {
            if (product.length === 0) {
                return res.status(404).json({
                    message: `Product with this product id ${person_id} not found `
                });
            }
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving Product."
            });
        });
};

exports.findProducts = (req, res) => {
    var queryObj = {};

    if (req.query.search) {
        queryObj["$or"] = [
            { title: { $regex: new RegExp(req.query.search, "i") } },
            { description: { $regex: new RegExp(req.query.search, "i") } },
            { company: { $regex: new RegExp(req.query.search, "i") } }
        ];
    }
    Product.find(queryObj)
        .then(data => {
            if (data.length === 0) {
                res.status(400).json({
                    message: "Nessn prodotto tovato"
                });
            }
            else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving data",
                error: err.message
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;  // Extract id from request parameters

    Product.findById(id)
        .then(product => {  // Use 'product' to refer to the found product
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `Product not found with id ${id}`
                });
            }
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while retrieving the product."
            });
        });
};

exports.create = (req, res) => {
    Product.create(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating the product."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => {
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `product not found with id ${id}`
                });
            }
            res.send(req.body);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating product with id ${id}`
            });
        });
};

//ELIMINA IL PRODOTTO SOLO NELLA PERSON
exports.deleteInterazione = (req, res) => {
    const personId = req.params.person_id;
    const productId = req.params.product_id;
    // Trova l'associazione specificata     
    PersonProductModel.findOne({
        person_id: personId,
        product_id: productId
    }).then(association => {
        if (!association) {
            return res.status(404).json({
                message: `Associazione con person_id ${personId} e product_id ${productId} non trovata.`
            });
        }
        // Elimina l'associazione trovata         
        return PersonProductModel.findByIdAndDelete(association._id).
            then(() => {
                res.json({ message: `Associazione con person_id ${personId} e product_id ${productId} eliminata con successo.` });
            }).catch(err => {
                console.error(err.message || "Errore durante l'eliminazione dell'associazione.");
                res.status(500).send({ message: err.message || "Errore durante l'eliminazione dell'associazione." });
            });
    }).catch(err => {
        console.error(err.message || "Errore durante la ricerca dell'associazione.");
        res.status(500).send({
            message: err.message || "Errore durante la ricerca dell'associazione."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(product => {
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `product not found with id ${id}`
                });
            }
            res.send({ message: `product with id: ${id} was deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting product with id ${id}`
            });
        });
};