module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
 
                      //==============================
                      //===   Create posts Model =====
                      //==============================
        title: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING(1000)
          },
              
          status: {
            type: Sequelize.BOOLEAN
          },
              
          progress: {
            type: Sequelize.INTEGER 
          },
              
          picture: {
            type: Sequelize.STRING
          },
          validation: {
            type: Sequelize.BOOLEAN
          },
              
          done: {
            type: Sequelize.BOOLEAN
          },
              
          nickname: {
            type: Sequelize.STRING
          },

          name: {
            type: Sequelize.STRING
          },
    });
  
    return Posts;
  };