module.exports = app => {
    const comments = require("../controllers/comments.controller.js");
  
    var router = require("express").Router();

                //==============================
                //===   Create Comments route ==
                //==============================
  
    // Create a new comments
    router.post("/", comments.create);
  
    // Retrieve all comments
    router.get("/", comments.findAll);
  

    // Retrieve a single comments with title
    router.get("/commentsTitle/:title", comments.find);
  
    // Update a Comments with nickname
    router.patch("/:nickname", comments.update);
  
    // Delete a Comment with id
    router.delete("/:id", comments.delete);
  
    app.use('/comments', router);
  };