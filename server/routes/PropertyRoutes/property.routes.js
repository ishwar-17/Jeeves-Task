module.exports = app => {
    const propertys = require("../../controllers/PropertyControllers/property.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", propertys.create);
  
    // Retrieve all Tutorials
    router.get("/", propertys.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", propertys.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", propertys.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", propertys.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", propertys.delete);
  
    // Create a new Tutorial
    router.delete("/", propertys.deleteAll);
  
    app.use('/api/property', router);
};