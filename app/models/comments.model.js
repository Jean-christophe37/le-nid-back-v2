module.exports = (sequelize, Sequelize) => {

              //==============================
              //===   Create Comments Model ==
              //==============================
    const Comments = sequelize.define("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
        
      comment: {
        type: Sequelize.STRING(1500)
      },
         
      title: {
        type: Sequelize.STRING(50)
      },
         
      nickname: {
        type: Sequelize.STRING(20)
      },
             
    });
  
    return Comments;
  };