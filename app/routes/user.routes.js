const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user",[authJwt.verifyToken],controller.userBoard);

  app.get("/api/test/mod",[authJwt.verifyToken, authJwt.isDeveloppeur],controller.moderatorBoard);

  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

  // Find User for Homepage
  router.get("/userHome/:type", controller.findUserHome);

  // Retrieve all User
  router.get("/", controller.findAll);

  // Retrieve all User type Dev
  router.get("/type/:type",controller.findAllPublished); 

  // Retrieve a single User with id
  router.get("/:id", controller.findOne);

  // Update a User with id
  router.patch("/:id", controller.update);

  // Delete a User with id
  router.delete("/:id", controller.delete);

  app.use('/user', router);
};
