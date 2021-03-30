const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

          //=============================
          //=== Create posts ============
          //=============================
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide!"
      });
      return;
    }
    const post = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      progress: req.body.progress,
      picture: req.body.picture,
      validation: req.body.validation,
      done: req.body.done,
      nickname: req.body.nickname,
      name: req.body.name,
    };
    Post.create(post)
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
            //=== Find posts models =======
            //=============================
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Post.findAll({ where: condition })
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
          //=== Find 1 posts models =====
          //=============================
exports.findOne = (req, res) => {
    const nickname = req.params.nickname;
    Post.findOne({ where: { nickname: nickname} })
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
          //=== Update posts ============
          //=============================
// Update a post by the nickname in the request
exports.update = (req, res) => {
    const nickname = req.params.nickname;
    Post.update(req.body, {
      where: { nickname: nickname }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le post a bien été modifié!"
          });
        } else {
          res.send({
            message: `Impossible de mettre l'annonce à jour!`
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
          //=== Delete posts ============
          //=============================
// Delete a post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'annonce a bien été supprimé!"
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

              //=============================
              //=== find posts for homepage =
              //=============================
  exports.findPostHome = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
      Post.findAll({ where: condition, limit: 4 , order:[['id', 'DESC'],], })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la récupération des annonces."
          });
        });
    };


            //=============================
            //===   find posts ============
            //=============================
// Find all published posts by nickname
exports.findAllPublished = (req, res) => {
  const nickname = req.params.nickname;
    Post.findAll({ where: { nickname: nickname} })
      .then(data => {
        console.log(data);
        res.send({
          id: data.id,
          title: data.title,
          description: data.description,
          status: data.status,
          progress: data.progress,
          picture: data.picture,
          validation: data.validation,
          done: data.done,
          nickname: data.nickname,
          name: data.name,
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des annonces."
        });
      });
  };