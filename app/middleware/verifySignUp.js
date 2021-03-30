const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


                      //==============================
                      //===   Check Email & nikcname =
                      //==============================
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Verify Username
  User.findOne({
    where: {
      nickname: req.body.nickname
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Nom d'utilisateur est déjà utilisé!"
      });
      return;
    }
    // Verify Email
    User.findOne({
      where: {
        mail: req.body.mail
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "L'email est déja utilisé!"
        });
        return;
      }
      next();
    });
  });
};

                      //==============================
                      //===   Check roles existed ====
                      //==============================
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Le rôle n'existe pas!"
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;