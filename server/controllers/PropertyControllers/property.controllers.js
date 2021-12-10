const db = require("../../models");
const Property = db.property;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.propertyName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const property = new Property({
        propertyName:req.body.propertyName,
        description: req.body.description,
        images: req.body.images,
        address: req.body.address,
        locality: req.body.locality,
        price:req.body.price,
        carpetArea: req.body.carpetArea
    });

    // Save Tutorial in the database
    property
        .save(property)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Property."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const propertyName = req.query.propertyName;
    var condition = propertyName ? { propertyName: { $regex: new RegExp(title), $options: "i" } } : {};

    Property.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving property."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Property.findById({'_id': id})
        .then(data => {
            console.log(data);
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else 
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Property with id=" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    Property.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Property was not found!`
                });
            } else 
                res.send({ message: "Property was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Property with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Property.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Property with id=${id}. Maybe Property was not found!`
                });
            } else {
                res.send({
                    message: "Property was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Property with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Property.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all property."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Property.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving property."
            });
        });
};