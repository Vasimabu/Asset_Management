'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asset_issues', {
      id:{
              type:Sequelize.UUID,
              defaultValue:Sequelize.UUIDV4,
              primaryKey:true
          },
      
          asset_id:{
            type:Sequelize.UUID,
            references:{
                model:"assets",
                key:"id"
            }
        },

        employee_id:{
            type:Sequelize.UUID,
            references:{
                model:"employees",
                key:"id"
            }
        },
      
          issue_date:{
              type:Sequelize.DATEONLY
          },
      
          expected_return_date:{
              type:Sequelize.DATEONLY
          },
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
    await queryInterface.dropTable('asset_issues');
  }
};