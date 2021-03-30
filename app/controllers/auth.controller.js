const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


            //=============================
            //===   Create user ===========
            //=============================
exports.signup = (req, res) => {
  User.create({
    nickname: req.body.nickname,
    mail: req.body.mail,
    password: bcrypt.hashSync(req.body.password,8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    available: req.body.available,
    description_user: req.body.description_user,
    picture: req.body.picture,
     type: req.body.type,
    technos_id: req.body.technos_id,
    instagram: req.body.instagram,
    facebook: req.body.facebook,
    github: req.body.github,
    linkedin: req.body.linkedin,
    link1: req.body.link1,
    link2: req.body.link2,
    link3: req.body.link3,
    html: req.body.html,
    css: req.body.css,
    javascript: req.body.javascript,
    php: req.body.php,
    react: req.body.react,
    node: req.body.node,
    python: req.body.python,
    symfony: req.body.symfony,
    wordpress: req.body.wordpress,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "L'utilisateur a été enregistré avec succès" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "L'utilisateur a été enregistré avec succès" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


                        //=============================
                        //===   Sign in user ==========
                        //=============================
exports.signin = (req, res) => {
  User.findOne({
    where: {
      mail: req.body.mail
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé!" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nickname: user.nickname,
          mail: user.mail,
          roles: authorities,
          accessToken: token,
          firstname: user.firstname,
          lastname: user.lastname,
          description_user: user.description_user,
          type: user.type,
          available: user.available,
          instagram: user.instagram,
          facebook: user.facebook,
          github: user.github,
          linkedin: user.linkedin,
          link1: user.link1,
          link2: user.link2,
          link3: user.link3,
          html: user.html,
          css: user.css,
          javascript: user.javascript,
          php: user.php,
          react: user.react,
          node: user.node,
          python: user.python,
          symfony: user.symfony,
          wordpress: user.wordpress,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};