module.exports = app => {
    const propertys = require("../../controllers/PropertyControllers/property.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new property
    router.post("/create", propertys.create);
  
    // Retrieve all property
    router.get("/allproperty", propertys.findAll);

    router.get("/allproperty/:id", propertys.findAll);
  
    app.use('/api/property', router);
};