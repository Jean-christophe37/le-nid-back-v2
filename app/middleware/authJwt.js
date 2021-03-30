const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;


              //=============================
              //===   verify token ==========
              //=============================
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Aucun token fourni!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Non autorisé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

                //=============================
                //===   Verify isAdmin ========
                //=============================
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

                //=============================
                //===   Verify isDevelopper ===
                //=============================
isDeveloppeur = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "developpeur") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require developpeur Role!"
      });
    });
  });
};

                  //=============================
                  //===   Verify isDev & admin ==
                  //=============================
isDeveloppeurOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "developpeur") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require developpeur or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDeveloppeur: isDeveloppeur,
  isDeveloppeurOrAdmin: isDeveloppeurOrAdmin
};
module.exports = authJwt;