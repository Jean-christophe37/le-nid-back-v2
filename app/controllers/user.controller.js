
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

              //=============================
              //===   find all users ========
              //=============================
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const mail = req.query.mail;
    var condition = mail ? { mail: { [Op.like]: `%${mail}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Le contenu ne peut pas être vide!"
        });
      });
  };

              //=============================
              //===   find 1 user ===========
              //=============================
// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la création de l'utilisateur !"
        });
      });
  };

              //=============================
              //===   Update 1 user =========
              //=============================
// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur a bien été modifié!"
          });
        } else {
          res.send({
            message: `Impossible de mettre l'utilisateur à jour!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour!"
        });
      });
  };

            //=============================
            //===   Delete 1 user =========
            //=============================
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur a bien été supprimé!"
          });
        } else {
          res.send({
            message: `Impossible de supprimer l'utilisateur!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer l'utilisateur!"
        });
      });
  };

 
              //=============================
              //===   find user limit 4 =====
              //=============================
  exports. findUserHome= (req, res) => {
    const type = req.params.type;
    User.findAll({ where: {type : type } , limit: 4 })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
    };

              //=============================
              //===   find user by type =====
              //=============================
// Find all published User
exports.findAllPublished = (req, res) => {
  const type = req.params.type;
  User.findAll({ where: {type : type } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite pendant la récupération des données."
      });
    });
  };
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
