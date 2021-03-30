module.exports = app => {
    const testimony = require("../controllers/testimony.controller.js");
  
    var router = require("express").Router();
  

                      //==============================
                      //===  Create Testimony Route ==
                      //==============================
    // Create a new Testimony
    router.post("/", testimony.create);
  
    // Retrieve all Testimony
    router.get("/", testimony.findAll);
  
    // Retrieve a single Testimony with nickname
    router.get("/testimonyNickname/:nickname", testimony.findOne);
  
    // Update a Testimony with nickname
    router.patch("/:nickname", testimony.update);
  
    // Delete a Testimony with id
    router.delete("/:id", testimony.delete);
  
    app.use('/testimony', router);
  };