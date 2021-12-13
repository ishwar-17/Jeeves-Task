const db = require("../../models");
const Property = db.property;
const moment = require('moment');

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

// Retrieve all property from the database.
exports.findAll = (req, res) => {
    const locality = req.query.locality;
    const createdAt = req.query.createdAt;
    const id = req.query.id;
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
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 5
    }
    let condition = '';
    if(locality){
        condition = locality ? { locality: { $regex: new RegExp(locality), $options: "i" } } : {};
    }else{
        const today = moment().startOf('day');
        condition = createdAt ? { createdAt: { 
            $exists: true,
            $lte:today.toDate()
        }} : {};
    }
    Property.find(condition)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
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