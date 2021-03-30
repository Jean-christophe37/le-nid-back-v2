module.exports = (sequelize, Sequelize) => {
    const Testimony = sequelize.define("testimony", {

                    //==============================
                    //===   Create Testimony Model =
                    //==============================
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
        title: {
            type: Sequelize.STRING
          },
          urlWebSite: {
            type: Sequelize.STRING(1500)
          },
          description: {
            type: Sequelize.STRING(1500)
          },
          nickname: {
            type: Sequelize.STRING(1500)
          },
             
    });
  
    return Testimony;
  };