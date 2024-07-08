const Person = require('../Models/person.model');

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

// Retrieve all Person from the database.
exports.findAll = (req, res) => {
    Person.find()
        .then(person => {
            if (isEmpty(person)) {
                return res.status(404).send({
                    message: `Person not found`
                });
            }
            res.send(person);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving Person."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;  // Extract id from request parameters

    Person.findById(id)
        .then(person => {  // Use 'person' to refer to the found person
            if (isEmpty(person)) {
                return res.status(404).send({
                    message: `Person not found with id ${id}`
                });
            }
            res.send(person);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while retrieving the person."
            });
        });
};


exports.create = (req, res) => {
    Person.create(req.body)
        .then(person => {
            res.send(person);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating the Person."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Person.findByIdAndUpdate(id,req.body,{new:true})
    .then(person => {
        if (isEmpty(person)) {
            return res.status(404).send({
                message: `Person not found with id ${id}`
            });
        }
        res.send(req.body);
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating Person with id ${id}`
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
    .then(person => {
        if (isEmpty(person)) {
            return res.status(404).send({
                message: `Person not found with id ${id}`
            });
        }
        res.send({ message: `Person with id: ${id} was deleted successfully.` });
    })
    .catch(err => {
        res.status(500).send({
            message: `Error deleting Person with id ${id}`
        });
    });
};