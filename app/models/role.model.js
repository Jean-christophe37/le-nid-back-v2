module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {

              //==============================
              //===   Create Roles Model =====
              //==============================
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };