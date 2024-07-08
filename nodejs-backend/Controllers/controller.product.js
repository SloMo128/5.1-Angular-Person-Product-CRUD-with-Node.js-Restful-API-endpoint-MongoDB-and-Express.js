const Product = require('../Models/product.model');

function isEmpty(obj) {
    /*
      for (var prop in obj) {
          if (obj.hasOwnProperty(prop))
              return false;
      }
    */

    // Check if an Object is Empty with JSON.stringify()
    // This will return true if the object is empty, otherwise false
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

exports.findByQuery = (req, res) => {
    const product_id = req.params.product_id;

    Product.find({ product: product_id })
        .then(product => {
            if (product.length === 0) {
                return res.status(404).json({
                    message: `Product with this product id ${product_id} not found `
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
            if(data.length === 0){
                res.status(400).json({
                    message: "Nessn prodotto tovato"
                });
            }
            else
            {
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