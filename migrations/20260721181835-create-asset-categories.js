'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asset_categories', {
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },

    category_name:{
        type:Sequelize.STRING,
        allowNull:false
    },

    // description:Sequelize.TEXT,
    description: {
    type: Sequelize.TEXT
},
    createdAt: {
    allowNull: false,
    type: Sequelize.DATE
},
updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
}
    
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('asset_categories');
  }
};