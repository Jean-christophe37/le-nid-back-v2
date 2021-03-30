const db = require("../models");
const Testimony = db.testimony;
const Op = db.Sequelize.Op;

              //=============================
              //===   Create testimony ======
              //=============================
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nickname) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide!"
      });
      return;
    }
    // Create a testimony
    const testimony = {
        title:  req.body.title,
        urlWebSite: req.body.urlWebSite,
        description: req.body.description,
        nickname: req.body.nickname,
    };
    // Save testimony in the database
    Testimony.create(testimony)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création de l'annonce !"
        });
      });
  };

                //=============================
                //===   find all testimony ====
                //=============================
// Retrieve all testimony from the database.
exports.findAll = (req, res) => {
    Testimony.findAll({ limit:4 , order:[['id', 'DESC'],], })
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
                  //===   find 1 testimony ======
                  //=============================
// Find a single testimony with nickname
exports.findOne = (req, res) => {
    const nickname = req.params.nickname;
    Testimony.findOne({ where: { nickname: nickname} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur s'est produite."
        });
      });
  };

                    //=============================
                    //===   Update comment ========
                    //=============================
// Update a testimony by the nickaname in the request
exports.update = (req, res) => {
    const nickname = req.params.nickname;
    Testimony.update(req.body, {
      where: { nickname: nickname }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le témoignage a bien été modifié!"
          });
        } else {
          res.send({
            message: `Impossible de mettre le témoignage à jour!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur pour la mise à jour"
        });
      });
  };

                    //=============================
                    //===   delete testimony ======
                    //=============================
// Delete a testimony with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Testimony.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le témoignage a bien été modifié!"
          });
        } else {
          res.send({
            message: `Impossible de supprimer le témoignage!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer le témoignage!"
        });
      });
  };



