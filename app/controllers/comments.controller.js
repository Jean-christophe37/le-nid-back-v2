const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;

              //=============================
              //===   Create comment ========
              //=============================
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nickname) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide !"
      });
      return;
    }
    // Create a comments model
    const comments = {
        title:  req.body.title,
        comment: req.body.comment,
        nickname: req.body.nickname,
    };
    // Save Tutorial in the database
    Comments.create(comments)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création du commentaire. "
        });
      });
  };

                //=============================
                //===   find All comments  ====
                //=============================
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.params.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Comments.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des données."
        });
      });
  };

                  //=============================
                  //===   find 1 comment ========
                  //=============================
// Find a single comments with title
exports.find = (req, res) => {
    const title = req.params.title;
    Comments.findAll({ where: { title: title} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur s'est produite"
        });
      });
  };

                    //=============================
                    //===   Update comment ========
                    //=============================
// Update a comment by the nickname in the request
exports.update = (req, res) => {
    const nickname = req.params.nickname;
    Comments.update(req.body, {
      where: { nickname: nickname }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'annonce a bien été modifié!"
          });
        } else {
          res.send({
            message: `Impossible de mettre mise à jour!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur de mise à jour pour" + nickname
        });
      });
  };

                      //=============================
                      //===   Delete comment ========
                      //=============================
// Delete a comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Comments.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'annonce a été supprimé avec succès!"
          });
        } else {
          res.send({
            message: `Impossible de supprimer l'annonce!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer l'annonce!" 
        });
      });
  };



