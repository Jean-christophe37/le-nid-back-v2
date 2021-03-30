module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {

                //==============================
                //===   Create Users Model =====
                //==============================
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: Sequelize.STRING
    },
    mail: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },

    available: {
      type: Sequelize.BOOLEAN
    },
    description_user: {
      type: Sequelize.STRING(1500)
    },
    picture: {
      type: Sequelize.STRING(1500)
    },
    type: {
      type: Sequelize.INTEGER
    },
    instagram: {
      type : Sequelize.STRING
    },
    facebook: {
      type : Sequelize.STRING
    },
    github: {
      type : Sequelize.STRING
    },
    linkedin: {
      type : Sequelize.STRING
    },
    link1: {
      type : Sequelize.STRING(1500)
    },
    link2: {
      type : Sequelize.STRING(1500)
    },
    link3: {
      type : Sequelize.STRING(1500)
    },
    html: {
      type: Sequelize.BOOLEAN
    },
    css: {
      type: Sequelize.BOOLEAN
    },

    javascript: {
      type: Sequelize.BOOLEAN
    },

    php: {
      type: Sequelize.BOOLEAN
    },

    react: {
      type: Sequelize.BOOLEAN
    },

    node: {
      type: Sequelize.BOOLEAN
    },

    python: {
      type: Sequelize.BOOLEAN
    },

    symfony: {
      type: Sequelize.BOOLEAN
    },

    wordpress: {
      type: Sequelize.BOOLEAN
    },


  });

  return User;
};