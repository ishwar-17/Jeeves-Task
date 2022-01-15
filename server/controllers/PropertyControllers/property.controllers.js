const db = require("../../models");
const Property = db.property;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.propertyName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    // Create a property
    const property = new Property({
        propertyName:req.body.propertyName,
        description: req.body.description,
        images: req.body.images,
        address: req.body.address,
        locality: req.body.locality,
        price:req.body.price,
        carpetArea: req.body.carpetArea
    });

    // Save property in the database
    property
        .save(property)
        .then(data => {
            res.send({
                message: 'New property created successfully....'
            });
        })
        .catch(err => {
            res.status(500).send({
                error:
                err.message || "Some error occurred while creating the Property."
            });
        });
};

// Query condition get the property details based req.query.
const queryCondition = (queryData) => {
    const { locality, createdAt }  = queryData;        
    let _startDate = new Date(createdAt);
    _startDate.setHours(0,0,0,0);
    let _endDtate = new Date(createdAt);
    _endDtate.setHours(23,59,59,0);
    if(!locality && !createdAt){
        return {};
    }
    if(locality && createdAt){
        return { $and:[{'locality': locality ? { $regex: new RegExp(locality), $options: "i" } : ""}, {'createdAt': createdAt ? {$gte:_startDate, $lte:_endDtate} : ''}]};
    }
    return { $or:[{'locality': locality ? { $regex: new RegExp(locality), $options: "i" } : ""}, {'createdAt': createdAt ? {$gte:_startDate, $lte:_endDtate} : ''}]};
}


// Retrieve all property from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    let condition = queryCondition(req.query);
    if(id){
        Property.findById(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving property."
                });
            });
        return;
    }
    Property.find(condition)
        .sort({ createdAt: 'asc' })
        .then(data => {
            res.send({
                property:data,
                totalCount: data.length
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving property."
            });
        });
};