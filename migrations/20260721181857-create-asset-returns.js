'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asset_returns', {
      id:{
              type:Sequelize.UUID,
              defaultValue:Sequelize.UUIDV4,
              primaryKey:true
          },
      
          issue_id:{
          type:Sequelize.UUID,
          references:{
              model:"asset_issues",
              key:"id"
          }
      },
      
          return_date:{
              type:Sequelize.DATEONLY
          },
      
          return_reason:{
              type:Sequelize.ENUM(
                  "UPGRADE",
                  "REPAIR",
                  "RESIGNATION",
                  "OTHER"
              )
          },
      
          remarks:Sequelize.TEXT,
              createdAt:{
              allowNull:false,
              type:Sequelize.DATE
          },

          updatedAt:{
              allowNull:false,
              type:Sequelize.DATE
          }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('asset_returns');
  }
};