module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
  
    var router = require("express").Router();

                    //==============================
                    //===   Create Posts route =====
                    //==============================
  
    // Create a new Post
    router.post("/", posts.create);
  
    // Retrieve all Posts
    router.get("/", posts.findAll);
  
    // Retrieve 4 posts for home
    router.get("/postHome", posts.findPostHome);
  
    // Retrieve a single Post with nickname
    router.get("/postUserNickname/:nickname", posts.findOne);
  
    // Update a Post with nickname
    router.patch("/:nickname", posts.update);
  
    // Delete a Post with id
    router.delete("/:id", posts.delete);

    app.use('/post', router);
  };