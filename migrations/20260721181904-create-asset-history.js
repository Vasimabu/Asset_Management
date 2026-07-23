'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asset_history', {
      id:{
              type:Sequelize.UUID,
              defaultValue:Sequelize.UUIDV4,
              primaryKey:true
          },
      
        //   asset_id:{
        //       type:Sequelize.UUID
        //   },
        asset_id:{
            type:Sequelize.UUID,
            references:{
                model:"assets",
                key:"id"
            }
        },
      
        //   employee_id:{
        //       type:Sequelize.UUID,
        //       allowNull:true
        //   },

        employee_id:{
            type:Sequelize.UUID,
            allowNull:true,
            references:{
                model:"employees",
                key:"id"
            }
        },
      
          action:{
              type:Sequelize.ENUM(
                  "PURCHASED",
                  "STOCKED",
                  "ISSUED",
                  "RETURNED",
                  "REPAIR",
                  "SCRAPPED"
              )
          },
      
          action_date:{
              type:Sequelize.DATE,
              defaultValue:Sequelize.NOW
          },
      
          remarks:Sequelize.TEXT,
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
    await queryInterface.dropTable('asset_history');
  }
};