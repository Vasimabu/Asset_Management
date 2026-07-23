'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id:{
          type:Sequelize.UUID,
          defaultValue:Sequelize.UUIDV4,
          primaryKey:true
        },
        asset_id:{
            type:Sequelize.STRING(30),
            unique:true
        },
        asset_name:{
            type:Sequelize.STRING,
            allowNull:false
        },
    
        serial_number:{
            type:Sequelize.STRING,
            unique:true
        },
    
        make:{
            type:Sequelize.STRING
        },
    
        model:{
            type:Sequelize.STRING
        },
    
        purchase_date:{
            type:Sequelize.DATEONLY
        },
    
        purchase_cost:{
            type:Sequelize.DECIMAL(12,2)
        },
    
        // category_id:{
        //     type:Sequelize.UUID
        // },
    
        // branch_id:{
        //     type:Sequelize.UUID
        // },
        category_id:{
            type: Sequelize.UUID,
            references:{
                model:"asset_categories",
                key:"id"
            },
            onUpdate:"CASCADE",
            onDelete:"RESTRICT"
        },

        branch_id:{
            type: Sequelize.UUID,
            references:{
                model:"branches",
                key:"id"
            },
            onUpdate:"CASCADE",
            onDelete:"RESTRICT"
        },
    
        status:{
            type:Sequelize.ENUM(
                "AVAILABLE",
                "ISSUED",
                "REPAIR",
                "SCRAPPED"
            ),
            defaultValue:"AVAILABLE"
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
    await queryInterface.dropTable('assets');
  }
};